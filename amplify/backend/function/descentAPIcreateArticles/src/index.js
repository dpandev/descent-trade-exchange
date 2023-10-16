
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

const NEWS_API_KEY = process.env.NEWS_SOURCE_API_KEY;
const NEWS_API_URL = 'https://cryptopanic.com/api/v1/posts/?auth_token=' + NEWS_API_KEY + '&public=true';

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

 export const handler = async (event) => {
  
  const newsDataResponse = await fetch(NEWS_API_URL);
  const newsData = await newsDataResponse.json();

  const expirydate = Math.round(Date.now() / 1000);

  let DEFAULT_IMG = process.env.DEFAULT_IMG;
  const Items = newsData.results.map(entry => ({
    id: entry.id,
    coinSymbol: entry?.currencies ? entry.currencies[0].code : ' ',
    title: entry.title,
    url: entry.url,
    domain: entry.domain,
    publishedAt: entry.published_at,
    image: DEFAULT_IMG,
    expires_at: expirydate,
  }));

  const inputs = Items;
  const variableDefinitions = inputs
    .map((_input, index) => `$input${index}: CreateArticleInput!`)
    .join(', ');
  const selectionSet = inputs
    .map((_input, index) => `
      entityCreate${index}: createArticle(input: $input${index}) {
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

  const endpoint = new URL(GRAPHQL_ENDPOINT);

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
  const request = new Request(endpoint, setOptions(query, variables));

  let statusCode = 200;
  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();
    if (body.errors) statusCode = 400;
    console.log('response:', response)
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
    //  Uncomment below to enable CORS requests
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Headers": "*"
    // }, 
    body: JSON.stringify(body)
  };
};