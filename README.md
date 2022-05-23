# meeter-mobile
This is a react-native application. It's purpose is to allow individuals to manage meetings. This includes some of the following features.

- schedule meetings
- identify small groups during those meetings

## Architecture
The architecture used is summarized as follows
- authentication is handled in AWS Cognito, with integration via AWS Amplify
- primary data exchange is via HTTP REST commands
-- AWS Gateway for endpoints
-- AWS Lambda functions for business logic
-- AWS Dynamo DB for data storage

## Advanced Features
The long term goal is to create a self-sustaining application that allows meeting owners to manage data about the meetings, manage additional users with varying permissions and capabilities. Some of the key features are as follows
- multi-tenant - backend to support variety of meeting hosts
-- have the ability to join other tenants, switch between other tenants
- manage support personnel, with varying roles and permissions
- configure data elements that are managed for each meeting.