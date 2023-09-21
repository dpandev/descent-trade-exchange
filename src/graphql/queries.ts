/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      username
      networth
      image
      trades {
        items {
          id
          amount
          price
          createdAt
          updatedAt
          userTradesId
          tradeCoinId
          owner
          __typename
        }
        nextToken
        __typename
      }
      watchlist {
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
          userWatchlistId
          __typename
        }
        nextToken
        __typename
      }
      portfolio {
        items {
          id
          amount
          createdAt
          updatedAt
          userPortfolioId
          owner
          __typename
        }
        nextToken
        __typename
      }
      follows {
        items {
          id
          email
          username
          networth
          image
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      following {
        items {
          id
          email
          username
          networth
          image
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
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
        email
        username
        networth
        image
        trades {
          nextToken
          __typename
        }
        watchlist {
          nextToken
          __typename
        }
        portfolio {
          nextToken
          __typename
        }
        follows {
          nextToken
          __typename
        }
        following {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getPortfolioCoin = /* GraphQL */ `
  query GetPortfolioCoin($id: ID!) {
    getPortfolioCoin(id: $id) {
      id
      coinId {
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
        userWatchlistId
        __typename
      }
      amount
      user {
        id
        email
        username
        networth
        image
        trades {
          nextToken
          __typename
        }
        watchlist {
          nextToken
          __typename
        }
        portfolio {
          nextToken
          __typename
        }
        follows {
          nextToken
          __typename
        }
        following {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      createdAt
      updatedAt
      userPortfolioId
      owner
      __typename
    }
  }
`;
export const listPortfolioCoins = /* GraphQL */ `
  query ListPortfolioCoins(
    $id: ID
    $filter: ModelPortfolioCoinFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listPortfolioCoins(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        coinId {
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
          userWatchlistId
          __typename
        }
        amount
        user {
          id
          email
          username
          networth
          image
          createdAt
          updatedAt
          owner
          __typename
        }
        createdAt
        updatedAt
        userPortfolioId
        owner
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
      userWatchlistId
      __typename
    }
  }
`;
export const listCoins = /* GraphQL */ `
  query ListCoins(
    $id: ID
    $filter: ModelCoinFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCoins(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
        userWatchlistId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTrade = /* GraphQL */ `
  query GetTrade($id: ID!) {
    getTrade(id: $id) {
      id
      user {
        id
        email
        username
        networth
        image
        trades {
          nextToken
          __typename
        }
        watchlist {
          nextToken
          __typename
        }
        portfolio {
          nextToken
          __typename
        }
        follows {
          nextToken
          __typename
        }
        following {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        owner
        __typename
      }
      coin {
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
        userWatchlistId
        __typename
      }
      amount
      price
      createdAt
      updatedAt
      userTradesId
      tradeCoinId
      owner
      __typename
    }
  }
`;
export const listTrades = /* GraphQL */ `
  query ListTrades(
    $id: ID
    $filter: ModelTradeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTrades(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        user {
          id
          email
          username
          networth
          image
          createdAt
          updatedAt
          owner
          __typename
        }
        coin {
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
          userWatchlistId
          __typename
        }
        amount
        price
        createdAt
        updatedAt
        userTradesId
        tradeCoinId
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
