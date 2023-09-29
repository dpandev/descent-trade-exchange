/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const dbClient = new DynamoDBClient({});

exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger
  if (!event.request.userAttributes.sub) {
    console.log("Error: No user was written to DynamoDB")
    context.done(null, event);
    return;
  }

  // Save the new user to DynamoDB
  const date = new Date();

  const tradeItem = {
    id: { S: `${event.request.userAttributes.sub}-${date.getTime()}` },
    coinId: { S: process.env.USD_COIN_ID },
    amount: { N: '250000.0' },
    price: { N: '1.0' },
    date: { S: date.toISOString() },
  }
  const portfolioCoinItem = {
    id: { S: `${event.request.userAttributes.sub}-usd` },
    coinID: { S: process.env.USD_COIN_ID },
    amount: { N: '250000.0' },
    owner: { S: event.request.userAttributes.sub }
  }
  console.log('tradeItem:', tradeItem)
  console.log('portCoin:', portfolioCoinItem)

  let userItem = {
    id: { S: event.request.userAttributes.sub },
    image: { S: process.env.DEFAULT_PROFILE_IMG },
    email: { S: event.request.userAttributes.email },
    displayName: { S: event.request.userAttributes.sub.substring(0,6) },
    networth: { N: "250000.0" },
    // watchlist: { SS: [] },
    // following: { SS: [] },
    // followers: { SS: [] },
    createdAt: { S: date.toISOString() },
    updatedAt: { S: date.toISOString() },
    // portfolio: { PortfolioCoin: [portfolioCoinItem] },
    // trades: { Trade: [tradeItem] }
  }

  if (event.request.userAttributes.picture) {
    userItem.image = { S: event.request.userAttributes.picture };
  }

  const userParams = {
    TableName: process.env.USER_TABLE,
    Item: userItem,
  }
  console.log("userParams", userParams)
  const command = new PutItemCommand(userParams);
  console.log('command',command)
  await dbClient.send(command);
  console.log("Success1")

  context.done(null, event);
};
