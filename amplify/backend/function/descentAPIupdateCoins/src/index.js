
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

const coinApiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2Cbitcoin-cash%2Cethereum%2Cetherium-classic%2Cdigibyte%2Cdogecoin%2Cmonero%2Cxrp%2Ccardano%2Csolana%2Ctron%2Caragon%2Cdai%2Cpolkadot%2Cpolygon%2Clitecoin%2Cchainlink%2Cstellar%2Cavalanche%2Ccosmos%2Ccronos%2Cneo%2Cvechain%2Cfilecoin%2Ctheta-token%2Czcash%2Capecoin%2Cmina%2Cconflux-token%2Ciota%2Cdash%2Cgala%2Csui%2Cklay-token%2Ckava%2Crender-token%2Cdecentraland%2Ceos%2Cblockstack%2Cimmutable-x%2Calgorand%2Caave%2Cthe-graph%2Coptimism%2Carbitrum%2Cnear%2Cquant-network%2Cmaker%2Cmantle%2Clido-dao%2Captos%2Chedera-hashgraph%2Cokb%2Cshiba-inu%2Cbinancecoin%2Cwrapped-bitcoin%2Cleo-token%2Caxie-infinity%2Celrond-erd-2%2Cbitget-token%2Cfantom%2Cbitcoin-cash-sv%2Cpaxos-standard%2Cpax-gold%2Cflow%2Crocket-pool%2Cdydx%2Ccompound-governance-token%2C1inch%2Cterra-luna%2Cbitcoin-gold%2Chelium%2Cdecred%2Cbasic-attention-coin%2Cgnosis%2Cyearn.finance%2Cwaves%2Ciexec-rlc%2Corbs%2Ctether-gold%2Cfrax-share%2Cchiliz&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en&precision=full';

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

 export const handler = async (event) => {
  
  const coinDataResponse = await fetch(coinApiUrl);
  const coinData = await coinDataResponse.json();

  const Items = coinData.map(entry => ({
    id: entry.id,
    cgId: entry.id,
    name: entry.name,
    currentPrice: entry.current_price.toString(),
    image: entry.image,
    symbol: entry.symbol,
    valueChange1H: entry.price_change_percentage_1h_in_currency.toString(),
    valueChange24H: entry.price_change_percentage_24h_in_currency.toString(),
    valueChange7D: entry.price_change_percentage_7d_in_currency.toString(),
    priceHistory: JSON.stringify(entry.sparkline_in_7d.price),
  }));

  const inputs = Items;
  const variableDefinitions = inputs
    .map((_input, index) => `$input${index}: UpdateCoinInput!`)
    .join(', ');
  const selectionSet = inputs
    .map((_input, index) => `
      entityUpdate${index}: updateCoin(input: $input${index}) {
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