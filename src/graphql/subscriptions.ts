/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      watchlist
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      watchlist
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      watchlist
      __typename
    }
  }
`;
export const onCreatePortfolioCoin = /* GraphQL */ `
  subscription OnCreatePortfolioCoin(
    $filter: ModelSubscriptionPortfolioCoinFilterInput
  ) {
    onCreatePortfolioCoin(filter: $filter) {
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
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePortfolioCoin = /* GraphQL */ `
  subscription OnUpdatePortfolioCoin(
    $filter: ModelSubscriptionPortfolioCoinFilterInput
  ) {
    onUpdatePortfolioCoin(filter: $filter) {
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
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeletePortfolioCoin = /* GraphQL */ `
  subscription OnDeletePortfolioCoin(
    $filter: ModelSubscriptionPortfolioCoinFilterInput
  ) {
    onDeletePortfolioCoin(filter: $filter) {
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
        __typename
      }
      createdAt
      updatedAt
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
      __typename
    }
  }
`;
export const onCreateTrade = /* GraphQL */ `
  subscription OnCreateTrade($filter: ModelSubscriptionTradeFilterInput) {
    onCreateTrade(filter: $filter) {
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
        __typename
      }
      expires_at
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTrade = /* GraphQL */ `
  subscription OnUpdateTrade($filter: ModelSubscriptionTradeFilterInput) {
    onUpdateTrade(filter: $filter) {
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
        __typename
      }
      expires_at
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTrade = /* GraphQL */ `
  subscription OnDeleteTrade($filter: ModelSubscriptionTradeFilterInput) {
    onDeleteTrade(filter: $filter) {
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
        __typename
      }
      expires_at
      createdAt
      updatedAt
      __typename
    }
  }
`;
