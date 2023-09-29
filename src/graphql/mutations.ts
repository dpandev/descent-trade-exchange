/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
        coinId
        __typename
      }
      followers
      following
      createdAt
      updatedAt
      watchlist
      owner
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
        coinId
        __typename
      }
      followers
      following
      createdAt
      updatedAt
      watchlist
      owner
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
        coinId
        __typename
      }
      followers
      following
      createdAt
      updatedAt
      watchlist
      owner
      __typename
    }
  }
`;
export const createCoin = /* GraphQL */ `
  mutation CreateCoin(
    $input: CreateCoinInput!
    $condition: ModelCoinConditionInput
  ) {
    createCoin(input: $input, condition: $condition) {
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
export const updateCoin = /* GraphQL */ `
  mutation UpdateCoin(
    $input: UpdateCoinInput!
    $condition: ModelCoinConditionInput
  ) {
    updateCoin(input: $input, condition: $condition) {
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
export const deleteCoin = /* GraphQL */ `
  mutation DeleteCoin(
    $input: DeleteCoinInput!
    $condition: ModelCoinConditionInput
  ) {
    deleteCoin(input: $input, condition: $condition) {
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
