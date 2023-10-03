/* tslint:disable */
/* eslint-disable */

export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      displayName
      networth
      image
      trades {
        id
        coinId
        amount
        price
        date
      }
      portfolio {
        id
        amount
        coinId
      }
      followers
      following
      createdAt
      updatedAt
      watchlist
    }
  }
`;

export const exchangeCoins = /* GraphQL */ `
  mutation updateUser(
    $input: UpdateUserInput!
    $coinId: ID!
    $isBuy: Boolean!
    $amount: Number!
    $usdPortfolioCoinId: ID!
    $coinPortfolioCoinId: ID!
  ) {
    updateUser($input: UpdateUserInput!, $coinId: ID!, $isBuy: Boolean!, $amount: Number!, $usdPortfolioCoinId: ID!, $coinPortfolioCoinId: ID!) {
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
        image
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