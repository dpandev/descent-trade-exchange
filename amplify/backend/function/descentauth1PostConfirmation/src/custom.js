/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const { default: fetch, Request } = require("node-fetch");

exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger
  if (!event.request.userAttributes.sub) {
    console.log("Error: No user was written to DynamoDB")
    context.done(null, event);
    return;
  }

  const date = new Date();

  const GRAPHQL_ENDPOINT = process.env.API_DESCENT_GRAPHQLENDPOINTOUTPUT;
  const GRAPHQL_API_KEY = process.env.API_DECENT_GRAPHQLKEYOUTPUT
  
  const query = /* GraphQL */ `
    mutation CreateUser(
      $input: CreateUserInput!
      $condition: ModelUserConditionInput
    ) {
      createUser(input: $input, condition: $condition) {
        id
        displayName
        email
        networth
        image
        trades {
          id
          coinId
          amount
          price
          date
          __typename
        }
        portfolio {
          id
          amount
          coinId
          __typename
        }
        followers
        following
        createdAt
        updatedAt
        watchlist
        __typename
      }
    }
  `;

  let variables = {
    input: {
      id: event.request.userAttributes.sub,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
      displayName: event.request.userAttributes.sub.substring(0,6),
      email: event.request.userAttributes.email,
      image: process.env.DEFAULT_PROFILE_IMG,
      networth: 250000,
      portfolio: {
        id: `${event.request.userAttributes.sub}-usd`,
        coinId: process.env.USD_COIN_ID, 
        amount: 250000, 
      },
      trades: {
        id: `${event.request.userAttributes.sub}-trade1`,
        amount: 250000,
        coinId: process.env.USD_COIN_ID,
        date: date.toISOString(),
        price: 1,
      },
      watchlist: "0",
      followers: "",
      following: "",
    }
  }

  if (event.request.userAttributes.picture) {
    variables.input.image = event.request.userAttributes.picture;
  }

  /** @type {import('node-fetch').RequestInit} */
  const options = {
    method: 'POST',
    headers: {
      'x-api-key': GRAPHQL_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, variables })
  };

  const request = new Request(GRAPHQL_ENDPOINT, options);

  let statusCode = 200;
  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();
    if (body.errors) statusCode = 400;
    console.log()
  } catch (error) {
    statusCode = 400;
    body = {
      errors: [
        {
          status: response.status,
          message: error.message,
          stack: error.stack
        }
      ]
    };
  }

  console.log(statusCode, JSON.stringify(body));

  context.done(null, event);
};
