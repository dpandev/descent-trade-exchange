
/* Amplify Params - DO NOT EDIT
	API_DESCENTGQL_COINTABLE_ARN
	API_DESCENTGQL_COINTABLE_NAME
	API_DESCENTGQL_GRAPHQLAPIENDPOINTOUTPUT
	API_DESCENTGQL_GRAPHQLAPIIDOUTPUT
	API_DESCENTGQL_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { default as fetch, Request } from 'node-fetch';

const GRAPHQL_API_KEY = process.env.API_DESCENTGQL_GRAPHQLAPIKEYOUTPUT;
const GRAPHQL_ENDPOINT = process.env.API_DESCENTGQL_GRAPHQLAPIENDPOINTOUTPUT;

export const listCoins = /* GraphQL */ `
  query ListCoins(
    $filter: ModelCoinFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCoins(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        currentPrice
      }
      nextToken
    }
  }
`;

export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
      }
      nextToken
    }
  }
`;

export const portfolioCoinsByUserID = /* GraphQL */ `
  query PortfolioCoinsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelPortfolioCoinFilterInput
    $limit: Int
    $nextToken: String
  ) {
    portfolioCoinsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        amount
        coinId
      }
      nextToken
    }
  }
`;

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

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

 export const handler = async (event) => {

  const coinsRequest = new Request(GRAPHQL_ENDPOINT, setOptions(listCoins, {}));
  const usersRequest = new Request(GRAPHQL_ENDPOINT, setOptions(listUsers, {}));

  let statusCode = 200;
  let body;
  let response;

  try {
    const coinResponse = await fetch(coinsRequest);
    const coinArray = await coinResponse.json();
    
    const usersResponse = await fetch(usersRequest);
    const usersArray = await usersResponse.json();

    /*  Send gql queries to get portfolios for each user and calculate total value, return user id and networth */
    const sumUpNetworths = async (userArr, coinArr) => {
      let itemArray = [];
      for await (const user of userArr) {
        const portfolioRequest = new Request(GRAPHQL_ENDPOINT, setOptions(portfolioCoinsByUserID, {userID: user.id}));
        const portfolioResponse = await fetch(portfolioRequest);
        const portfolios = await portfolioResponse.json();
        const portfolioArray = portfolios.data.portfolioCoinsByUserID.items;
        let sumNetworth = 0;
        for (const portfolio of portfolioArray) {
          let coin = coinArr.find(x => x.id === portfolio.coinId);
          sumNetworth += (coin.currentPrice * portfolio.amount);
        }
        itemArray.push({
          id: user.id,
          networth: sumNetworth
        });
      }
      return itemArray;
    }

    const inputs = await sumUpNetworths(usersArray.data.listUsers.items, coinArray.data.listCoins.items);

    /*  Create gql batch mutation to send */
    const variableDefinitions = inputs
      .map((_input, index) => `$input${index}: UpdateUserInput!`)
      .join(', ');
    const selectionSet = inputs
      .map((_input, index) => `
        entityUpdate${index}: updateUser(input: $input${index}) {
          id
        }
      `)
      .join(' ');
    const query = `
      mutation (${variableDefinitions}) {
        ${selectionSet}
      }
    `;
    const variables = inputs.reduce((acc, input, index) => {
      acc[`input${index}`] = input
      return acc
    }, {});

    const updateUserNetworths = new Request(GRAPHQL_ENDPOINT, setOptions(query, variables));

    response = await fetch(updateUserNetworths);
    body = await response.json();
    if (body.errors) statusCode = 400;
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

  return {
    statusCode,
    body: JSON.stringify(body)
  };
};