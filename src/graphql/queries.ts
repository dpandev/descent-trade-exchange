/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      displayName
      networth
      image
      trades {
        items {
          id
          coinId
          coinSymbol
          amount
          price
          date
          image
          userID
          expires_at
          createdAt
          updatedAt
          owner
          __typename
        }
        nextToken
        __typename
      }
      portfolio {
        items {
          id
          amount
          coinId
          userID
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
      watchlist
      owner
      __typename
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
        displayName
        networth
        image
        trades {
          nextToken
          __typename
        }
        portfolio {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        watchlist
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
      amount
      coinId
      userID
      user {
        id
        displayName
        networth
        image
        trades {
          nextToken
          __typename
        }
        portfolio {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        watchlist
        owner
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listPortfolioCoins = /* GraphQL */ `
  query ListPortfolioCoins(
    $filter: ModelPortfolioCoinFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPortfolioCoins(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        amount
        coinId
        userID
        user {
          id
          displayName
          networth
          image
          createdAt
          updatedAt
          watchlist
          owner
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
        userID
        user {
          id
          displayName
          networth
          image
          createdAt
          updatedAt
          watchlist
          owner
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
export const getTrade = /* GraphQL */ `
  query GetTrade($id: ID!) {
    getTrade(id: $id) {
      id
      coinId
      coinSymbol
      amount
      price
      date
      image
      userID
      user {
        id
        displayName
        networth
        image
        trades {
          nextToken
          __typename
        }
        portfolio {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        watchlist
        owner
        __typename
      }
      expires_at
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listTrades = /* GraphQL */ `
  query ListTrades(
    $filter: ModelTradeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrades(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        coinId
        coinSymbol
        amount
        price
        date
        image
        userID
        user {
          id
          displayName
          networth
          image
          createdAt
          updatedAt
          watchlist
          owner
          __typename
        }
        expires_at
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
export const tradesByUserID = /* GraphQL */ `
  query TradesByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTradeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    tradesByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        coinId
        coinSymbol
        amount
        price
        date
        image
        userID
        user {
          id
          displayName
          networth
          image
          createdAt
          updatedAt
          watchlist
          owner
          __typename
        }
        expires_at
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
export const getArticle = /* GraphQL */ `
  query GetArticle($id: ID!) {
    getArticle(id: $id) {
      id
      coinSymbol
      title
      url
      domain
      publishedAt
      image
      expires_at
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listArticles = /* GraphQL */ `
  query ListArticles(
    $filter: ModelArticleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listArticles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        coinSymbol
        title
        url
        domain
        publishedAt
        image
        expires_at
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
