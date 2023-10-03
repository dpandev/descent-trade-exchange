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
  const GRAPHQL_API_KEY = process.env.API_DECENT_GRAPHQLKEYOUTPUT;
  
  const createNewUserQuery = /* GraphQL */ `
    mutation CreateUser(
      $input: CreateUserInput!
      $condition: ModelUserConditionInput
    ) {
      createUser(input: $input, condition: $condition) {
        id
      }
    }
  `;
  const createNewPortfolioQuery = /* GraphQL */ `
    mutation CreatePortfolioCoin(
      $input: CreatePortfolioCoinInput!
      $condition: ModelPortfolioCoinConditionInput
    ) {
      createPortfolioCoin(input: $input, condition: $condition) {
        id
      }
    }
  `;
  const createNewTradeQuery = /* GraphQL */ `
    mutation CreateTrade(
      $input: CreateTradeInput!
      $condition: ModelTradeConditionInput
    ) {
      createTrade(input: $input, condition: $condition) {
        id
      }
    }
  `;

  let variables = {
    userInput: {
      input: {
        id: event.request.userAttributes.sub,
        createdAt: date.toISOString(),
        updatedAt: date.toISOString(),
        displayName: event.request.userAttributes.sub.substring(0,6),
        email: event.request.userAttributes.email,
        image: process.env.DEFAULT_PROFILE_IMG,
        networth: 250000,
        watchlist: process.env.USD_COIN_ID,
        followers: "",
        following: "",
      }
    },
    portfolioInput: {
      input: {
        id: `${event.request.userAttributes.sub}-${process.env.USD_COIN_SYMBOL}`,
        coinId: process.env.USD_COIN_ID, 
        amount: 250000,
        userID: event.request.userAttributes.sub,
      }
    },
    tradeInput: {
      input: {
        amount: 250000,
        coinSymbol: process.env.USD_COIN_SYMBOL,
        coinId: process.env.USD_COIN_ID,
        date: date.toISOString(),
        price: 1,
        userID: event.request.userAttributes.sub,
        image: process.env.USD_COIN_IMAGE,
      }
    }
  }

  if (event.request.userAttributes.picture) {
    variables.userInput.image = event.request.userAttributes.picture;
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

  const request = new Request(GRAPHQL_ENDPOINT, setOptions(createNewUserQuery, variables.userInput));
  const request2 = new Request(GRAPHQL_ENDPOINT, setOptions(createNewPortfolioQuery, variables.portfolioInput));
  const request3 = new Request(GRAPHQL_ENDPOINT, setOptions(createNewTradeQuery, variables.tradeInput));

  try {
    response = await fetch(request)
      .then(await fetch(request2).then(res => console.log('req2', res)))
      .then(await fetch(request3).then(res => console.log('req3', res)))
      .then(res => console.log(res))
      .catch(error => console.log('error', error))
  } catch (error) {
    console.log(error)
  }

  context.done(null, event);
};
