
export const exchangeCoins = /* GraphQL */ `
  mutation ExchangeCoinsUpdate($inputOne: UpdatePortfolioCoinInput!, $inputTwo: CreateTradeInput!, $inputThree: UpdatePortfolioCoinInput!) {
    updateCoin: updatePortfolioCoin(input: $inputOne) {
      id
      amount
    }
    createTrade(input: $inputTwo) {
      id
    }
    updateUSD: updatePortfolioCoin(input: $inputThree) {
      id
      amount
    }
  }
`;

export const exchangeCoinsNew = /* GraphQL */ `
  mutation ExchangeCoinsNew($inputOne: CreatePortfolioCoinInput!, $inputTwo: CreateTradeInput!, $inputThree: UpdatePortfolioCoinInput!) {
    createPortfolioCoin(input: $inputOne) {
      id
      amount
    }
    createTrade(input: $inputTwo) {
      id
    }
    updatePortfolioCoin(input: $inputThree) {
      id
      amount
    }
  }
`;
