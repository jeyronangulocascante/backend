# How to deploy to DEV ENVIRONMENT in AWS
Have you ever wanted to deploy something to AWS and test your changes there? Now you just need to follow this tutorial:

##### Steps:

+ First you have to find the file located in: `{repositoryFolder}/scripts/` named `dev_deploy.sh` if you open it, at line 4 you will find the following text:
`# GITHUB_OAUTH_TOKEN='YOUR TOKEN HERE'` then uncomment it.
+ Now go to [GitHub -> Settings -> Developer Settings -> Personal Access Token](https://github.com/settings/tokens) -> Click on **Generate new token** -> Name it and add permissions to it.
+ Once the token is generated, copy it and replace line at `dev_deploy.sh` (be aware because it cannot be obtained later and you will have to generate another)
+ Now with your token placed, run the script with the following parameters as `$./dev_deploy.sh [branch] [Env]` 
**Example**: `$./dev_deploy.sh develop dev` .
*Always remember to have your branch updated.
+ Go to [GitHub -> Actions](https://github.com/0mn1-Tech/omni-pay/actions) and there you can check the deploy status as: **dev-deploy-event** .
+ Once that process end, you can go to [API Gateway Stages in AWS](https://console.aws.amazon.com/apigateway/home?region=us-east-1#/apis/ycoi1yrqz8/stages) and check your endpoints.