const { readdirSync, readFileSync, writeFileSync } = require('fs');
const ini = require('ini');
const path = require('path');
const { homedir } = require('os');
const AWS = require('aws-sdk');

const readConfig = (profile) => {
  const content = ini.decode(readFileSync(path.resolve(homedir(), './.aws/config'), 'utf-8'));

  if (profile.includes('.')) {
    const [name, key] = profile.split('.');
    return content[`profile ${name}`][key];
  }

  return content[`profile ${profile}`];
};

const readCredentials = () => {
  const content = ini.decode(readFileSync(path.resolve(homedir(), './.aws/credentials'), 'utf-8'));
  if ('default' in content) {
    return content['default'];
  }

  return {};
};

const writeCredentials = (credentials) => {
  return writeFileSync(path.resolve(homedir(), './.aws/credentials'), ini.encode(credentials, { section: 'default' }));
};

const getAccessData = () => {
  return readdirSync(path.resolve(homedir(), './.aws/sso/cache')).reduce((token, file) => {
    if (file.includes('json')) {
      const content = JSON.parse(readFileSync(path.resolve(homedir(), './.aws/sso/cache', file), 'utf-8'));
      if (content.accessToken) {
        return content;
      }

      return token;
    }
  });
};

const myArgs = {};
process.argv.slice(2).forEach((arg) => {
  const [key, value] = arg.split('=');

  myArgs[key] = value;
});

const profile = myArgs.profile || process.env.AWS_PROFILE;

if (!profile) {
  console.error('The profile argument is required and was not defined [profile={profile-name}]');
  process.exit(1);
}

const { aws_expiration, aws_profile } = readCredentials();
if (aws_profile === profile && Math.floor((+aws_expiration - new Date().getTime()) / 1000) > 0) {
  console.log('Current session is still valid');
  return;
}

const accessData = getAccessData();

if (accessData === '') {
  console.error(`Please login to SSO (aws sso login --profile ${profile})`);
  process.exit(1);
}

const { sso_role_name, sso_account_id, sso_region } = readConfig(profile);

new AWS.SSO({
  region: sso_region,
})
  .getRoleCredentials({
    accessToken: accessData.accessToken,
    roleName: sso_role_name,
    accountId: sso_account_id,
  })
  .promise()
  .then((result) => {
    return {
      aws_access_key_id: result.roleCredentials.accessKeyId,
      aws_secret_access_key: result.roleCredentials.secretAccessKey,
      aws_session_token: result.roleCredentials.sessionToken,
      aws_expiration: result.roleCredentials.expiration,
      aws_profile: profile,
    };
  })
  .then((credentials) => {
    writeCredentials(credentials);
  })
  .catch((error) => {
    console.error(`${error.message}. Please login again [aws sso login --profile ${profile}]`);
    process.exit(1);
  });
