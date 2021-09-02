#!/bin/bash
# ------------------------------------------------------------------
# -- AWS User Pool Authenticator
# --
# -- Requires:
# --    aws-cli
# --
# -- @author Pablo Viquez <pviquez@pabloviquez.com>
# ------------------------------------------------------------------

SELF_SCRIPT_PATH="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "${SELF_SCRIPT_PATH}" || exit
source ./common/bash-common.sh

SUPERAPPCLIENTID_PROD="qpfjb3mkmi689ajbsdm2rpdg4"
SUPERAPPCLIENTID_DEV="54dgtrpcbafbh94at24i03s573"
AGENTS_POOL_CLIENT_ID_DEV="1vogbtv0k9rbsnjcopjjj74qh9"
SUPERAPPCLIENT_STAGE=${SUPERAPPCLIENTID_DEV}
CURRENT_STAGE="DEV"
AWSREGION="us-east-1"
USER_USR=""
USER_PWD=""
INCLUDE_ID_TOKEN="false"
while getopts u:p:s:i OPTIONPARAM
do
    case "${OPTIONPARAM}" in
        u)
            USER_USR="${OPTARG}"
            ;;
        p)
            USER_PWD="${OPTARG}"
            ;;
        s)
            if [ "${OPTARG}" = "prod" ]; then
              CURRENT_STAGE="PROD"
              SUPERAPPCLIENT_STAGE=${SUPERAPPCLIENTID_PROD}
            else
              if [ "${OPTARG}" = "agents_dev" ]; then
                CURRENT_STAGE="AGENTS DEV"
                SUPERAPPCLIENT_STAGE=${AGENTS_POOL_CLIENT_ID_DEV}
              fi
            fi
            ;;
        i)
            INCLUDE_ID_TOKEN="true"
            ;;
        *)
          ;;
    esac
done

aws_print_logo

echo "${COLOR_WHITE}AWS Cognito User Pool Authentication Tool${COLOR_NORMAL}"
echo ""
if [ -z "${USER_USR}" ] || [ -z "${USER_PWD}" ]; then
    echo "Please enter the username and password to retrieve the access token:"
else
    echo "Authenticating user (in pool ${CURRENT_STAGE}) with credentials from the command line."
fi
echo ""

if [ -z "${USER_USR}" ]; then
    get_input_data "Username: " USER_USR
fi

if [ -z "${USER_PWD}" ]; then
    get_input_password "Password: " USER_PWD
fi

AWSCOGNITO_RESPONSE=$(aws cognito-idp initiate-auth \
  --auth-flow USER_PASSWORD_AUTH  \
  --output json \
  --region ${AWSREGION} \
  --client-id ${SUPERAPPCLIENT_STAGE} \
  --auth-parameters USERNAME="${USER_USR}",PASSWORD="${USER_PWD}" 2>&1)

if [[ ! "${AWSCOGNITO_RESPONSE}" =~ "AuthenticationResult"  ]]; then
    echo "An error occurred while trying to authenticate the user."
    echo "AWS Error: ${COLOR_RED}${AWSCOGNITO_RESPONSE}${COLOR_NORMAL}"
    exit
fi

USRTOKEN=$(echo "${AWSCOGNITO_RESPONSE}" |jq -r '.AuthenticationResult.AccessToken')
IDTOKEN=$(echo "${AWSCOGNITO_RESPONSE}" |jq -r '.AuthenticationResult.IdToken')

if [[ ! "${AWSCOGNITO_RESPONSE}" =~ "AuthenticationResult"  ]]; then
    echo "An error occurred while trying to authenticate the user."
    echo "AWS Error: ${COLOR_RED}${AWSCOGNITO_RESPONSE}${COLOR_NORMAL}"
    exit
fi


if [ "${INCLUDE_ID_TOKEN}" = "false" ]; then
    echo ""
    echo "Your access token is: ${COLOR_GREEN} ${USRTOKEN} ${COLOR_NORMAL}"
    echo ""

    echo "${USRTOKEN}" |pbcopy
else
    echo ""
    echo "Your access token is: ${COLOR_GREEN} ${USRTOKEN} ${COLOR_NORMAL}"
    echo ""
    echo ""
    echo "Your ID token is: ${COLOR_GREEN} ${IDTOKEN} ${COLOR_NORMAL}"
    echo ""

    echo "{ \"token\": \"${USRTOKEN}\", \"IdToken\": \"${IDTOKEN}\"}" |pbcopy
fi

echo "${COLOR_WHITE}Notes:${COLOR_NORMAL}"
echo "${COLOR_BLUE}    - The token was copied automatically into your clipboard.${COLOR_NORMAL}"
echo "${COLOR_NORMAL}"
