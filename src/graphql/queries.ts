/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
        coinID
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $id: ID
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
          coinID
          __typename
        }
        followers
        following
        createdAt
        updatedAt
        watchlist
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCoin = /* GraphQL */ `
  query GetCoin($id: ID!) {
    getCoin(id: $id) {
      id
      cgId
      name
      symbol
      image
      currentPrice
      valueChange1H
      valueChange24H
      valueChange7D
      priceHistory
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCoins = /* GraphQL */ `
  query ListCoins(
    $filter: ModelCoinFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCoins(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cgId
        name
        symbol
        image
        currentPrice
        valueChange1H
        valueChange24H
        valueChange7D
        priceHistory
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
