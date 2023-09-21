/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
export const onCreatePortfolioCoin = /* GraphQL */ `
  subscription OnCreatePortfolioCoin(
    $filter: ModelSubscriptionPortfolioCoinFilterInput
    $owner: String
  ) {
    onCreatePortfolioCoin(filter: $filter, owner: $owner) {
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
export const onUpdatePortfolioCoin = /* GraphQL */ `
  subscription OnUpdatePortfolioCoin(
    $filter: ModelSubscriptionPortfolioCoinFilterInput
    $owner: String
  ) {
    onUpdatePortfolioCoin(filter: $filter, owner: $owner) {
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
export const onDeletePortfolioCoin = /* GraphQL */ `
  subscription OnDeletePortfolioCoin(
    $filter: ModelSubscriptionPortfolioCoinFilterInput
    $owner: String
  ) {
    onDeletePortfolioCoin(filter: $filter, owner: $owner) {
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
export const onCreateCoin = /* GraphQL */ `
  subscription OnCreateCoin($filter: ModelSubscriptionCoinFilterInput) {
    onCreateCoin(filter: $filter) {
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
export const onUpdateCoin = /* GraphQL */ `
  subscription OnUpdateCoin($filter: ModelSubscriptionCoinFilterInput) {
    onUpdateCoin(filter: $filter) {
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
export const onDeleteCoin = /* GraphQL */ `
  subscription OnDeleteCoin($filter: ModelSubscriptionCoinFilterInput) {
    onDeleteCoin(filter: $filter) {
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
export const onCreateTrade = /* GraphQL */ `
  subscription OnCreateTrade(
    $filter: ModelSubscriptionTradeFilterInput
    $owner: String
  ) {
    onCreateTrade(filter: $filter, owner: $owner) {
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
export const onUpdateTrade = /* GraphQL */ `
  subscription OnUpdateTrade(
    $filter: ModelSubscriptionTradeFilterInput
    $owner: String
  ) {
    onUpdateTrade(filter: $filter, owner: $owner) {
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
export const onDeleteTrade = /* GraphQL */ `
  subscription OnDeleteTrade(
    $filter: ModelSubscriptionTradeFilterInput
    $owner: String
  ) {
    onDeleteTrade(filter: $filter, owner: $owner) {
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
