const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-2b' }); // Replace 'your-region' with the AWS region where your DynamoDB table is located
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: 'performanceInfo',
  KeyConditionExpression: 'Title = :title',
  ExpressionAttributeValues: {
    ':title': 'Queen Margaret'
  }
};
dynamoDB.query(params, (err, data) => {
  if (err) {
    console.error('Error querying DynamoDB:', err);
  } else {
    console.log('Query succeeded:', data.Items);
    // Process the query results
  }
});