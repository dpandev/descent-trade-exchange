/* tslint:disable */
/* eslint-disable */


export const getUserInfo = /* GraphQL */ `
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
      }
      portfolio {
        id
        amount
        coinId
      }
      followers
      following
      createdAt
      watchlist
    }
  }
`;

export const getUserProfile = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
      followers
      following
      createdAt
    }
  }
`;

export const getUserPortfolio = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      portfolio {
        id
        amount
        coinId
      }
    }
  }
`;

export const getUserWatchlist = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      watchlist
    }
  }
`;

export const getUserFollowing = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      following
    }
  }
`;

export const getUserTrades = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      trades {
        id
        coinId
        amount
        price
        date
      }
    }
  }
`;

export const listUsersProfiles = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        displayName
        networth
        image
        trades(limit: 5) {
          items {
            id
            coinId
            amount
            price
            date
          }
        }
        followers
        createdAt
      }
      nextToken
    }
  }
`;

export const getCoinDetails = /* GraphQL */ `
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
      updatedAt
    }
  }
`;

export const listCoinsDetails = /* GraphQL */ `
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
        updatedAt
      }
      nextToken
    }
  }
`;
