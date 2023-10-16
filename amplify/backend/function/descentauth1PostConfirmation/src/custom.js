/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { default: fetch, Request } = require("node-fetch");

exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger
  if (!event.request.userAttributes.sub) {
    console.log("Error: No new user was created!")
    context.done(null, event);
    return;
  }

  console.log('event', event);
  console.log('context', context);

  const expirydate = Math.round(Date.now() / 1000);
  const date = new Date();

  const GRAPHQL_ENDPOINT = process.env.API_DESCENT_GRAPHQLENDPOINTOUTPUT;
  const GRAPHQL_API_KEY = process.env.API_DECENT_GRAPHQLKEYOUTPUT;
  
  const createNewUserQuery = /* GraphQL */ `
    mutation CreateNewUser(
      $inputOne: CreateUserInput!
      $inputTwo: CreatePortfolioCoinInput!
      $inputThree: CreateTradeInput!
    ) {
      createUser(input: $inputOne) {
        id
      }
      createPortfolioCoin(input: $inputTwo) {
        id
      }
      createTrade(input: $inputThree) {
        id
      }
    }
  `;

  let variables = {
    inputOne: {
      id: event.request.userAttributes.sub,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
      displayName: `User_${event.request.userAttributes.sub.substring(0,7)}`,
      image: process.env.DEFAULT_PROFILE_IMG,
      networth: 250000,
      watchlist: process.env.USD_COIN_ID,
    },
    inputTwo: {
      id: `${event.request.userAttributes.sub}-${process.env.USD_COIN_ID}`,
      coinId: process.env.USD_COIN_ID, 
      amount: 250000,
      userID: event.request.userAttributes.sub,
    },
    inputThree: {
      amount: 250000,
      coinSymbol: process.env.USD_COIN_SYMBOL,
      coinId: process.env.USD_COIN_ID,
      date: date.toISOString(),
      price: 1,
      userID: event.request.userAttributes.sub,
      image: process.env.USD_COIN_IMAGE,
      expires_at: expirydate + (7 * 24 * 60 * 60),
    }
  }

  if (event.request.userAttributes.picture) {
    variables.inputOne.image = event.request.userAttributes.picture;
  }

  if (event.request.userAttributes['custom:displayName']) {
    variables.inputOne.displayName = event.request.userAttributes['custom:displayName'];
  }

  const setOptions = (query, variables) => {
    return {
      method: 'POST',
      headers: {
        'x-api-key': GRAPHQL_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, variables })
    }
  }

  const request = new Request(GRAPHQL_ENDPOINT, setOptions(createNewUserQuery, variables));

  let statusCode = 200;
  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();
    if (body.errors) statusCode = 400;
    console.log(response)
  } catch (error) {
    console.log(error);
    statusCode = 500;
    body = {
      errors: [
        {
          message: error.message
        }
      ]
    };
  }

  context.done(null, event);
};
