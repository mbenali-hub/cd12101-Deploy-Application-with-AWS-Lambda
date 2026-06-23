# Serverless TODO App

## Important Note for Reviewers

This application works correctly when the Udacity Cloud Lab session is active. The AWS resources (Lambda functions, DynamoDB table, S3 bucket) are deployed and running properly.

However, Udacity Cloud Lab sessions have a limited duration and will automatically pause after a period of inactivity. If you encounter any errors, it may be because the Cloud Lab session has expired.

## How to Test

1. Make sure the Udacity Cloud Lab session is active
2. Install dependencies: `cd starter/client && npm install`
3. Start the frontend: `npm start`
4. Open http://localhost:3000
5. Log in and test creating, updating, deleting TODO items and uploading images

## API Endpoint
https://tp0omodmw4.execute-api.us-east-1.amazonaws.com/dev

## Auth0 Configuration
The .env file in starter/client/ contains the Auth0 configuration needed to run the frontend.
