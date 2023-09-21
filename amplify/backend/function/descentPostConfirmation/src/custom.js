/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
// exports.handler = async (event, context) => {
//   // insert code to be executed by your lambda trigger
//   return event;
// };

const aws = require('aws-sdk');
const ddb = new aws.DynamoDB();

exports.handler = async (event, context) => {
  if (!event.request.userAttributes.sub) {
    console.log("Error: No user was written to DynamoDB")
    context.done(null, event);
    return;
  }

  // Save the new user to DynamoDB
  const date = new Date();

  const Item = {
    'id': { S: event.request.userAttributes.sub },
    '__typename': { S: 'User' },
    'email': { S: event.request.userAttributes.email },
    'networth': { N: 250000 },
    'trades': { L: [
      {
        "id": { S: '1' },
        "coin": { S: 'usd-coin-id-here' },
        "price": { N: 'usd-coin-price-here' },
        "amount": { N: 250000 }
      }
    ] },
    "watchlist": { L: [] },
    "portfolio": { L: [
      {
        "id": { S: 'usd-coin-id-here' },
        "amount": { N: 250000 }
      }
    ] },
    "following": { L: [] },
    "followers": { L: [] },
    'createdAt': { S: date.toISOString() },
    'updatedAt': { S: date.toISOString() },
  }

  if (event.request.userAttributes.picture) {
    Item.image = { S: event.request.userAttributes.picture };
  }

  if (event.request.userAttributes.name) {
    Item.name = { S: event.request.userAttributes.name };
  }

  const params = {
    Item,
    TableName: process.env.USERTABLE,
  }

  try {
    await ddb.putItem(params).promise();
    console.log("Success");
  } catch (e) {
    console.log("Error", e);
  }

  context.done(null, event);
}