/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
