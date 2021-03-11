# aws-devops-exercise_restful_hit_counter


Goals:

1. A restful API available to the public using AWS Lambda, AWS API Gateway and AWS DynamoDB
2. The API will record every request to a URL path to a datastore
3. The base path will show how many requests for each path


Example:

curl https://xxxxxxxxxx.execute-api.us-west-2.amazonaws.com/prod/request1
curl https://xxxxxxxxxx.execute-api.us-west-2.amazonaws.com/prod/request1/foo
curl https://xxxxxxxxxx.execute-api.us-west-2.amazonaws.com/prod/request1/foo/bar

Requirements:

1. Code must be checked into a fork of this project.
2. no AWS keys are secrets must be exposed in the codebase
3. Program in the language of your choosing
4. working API should be available when complete


All resources provisioned in AWS will be within the Free Tier.


For hints:

DO NOT HESITATE to reach out to me, collaboration and communication is part of the exercise
AWS Cloud Development Kit will make your life easier
