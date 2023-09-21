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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createPortfolioCoin = /* GraphQL */ `
  mutation CreatePortfolioCoin(
    $input: CreatePortfolioCoinInput!
    $condition: ModelPortfolioCoinConditionInput
  ) {
    createPortfolioCoin(input: $input, condition: $condition) {
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
export const updatePortfolioCoin = /* GraphQL */ `
  mutation UpdatePortfolioCoin(
    $input: UpdatePortfolioCoinInput!
    $condition: ModelPortfolioCoinConditionInput
  ) {
    updatePortfolioCoin(input: $input, condition: $condition) {
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
export const deletePortfolioCoin = /* GraphQL */ `
  mutation DeletePortfolioCoin(
    $input: DeletePortfolioCoinInput!
    $condition: ModelPortfolioCoinConditionInput
  ) {
    deletePortfolioCoin(input: $input, condition: $condition) {
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
      userWatchlistId
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
      userWatchlistId
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
      userWatchlistId
      __typename
    }
  }
`;
export const createTrade = /* GraphQL */ `
  mutation CreateTrade(
    $input: CreateTradeInput!
    $condition: ModelTradeConditionInput
  ) {
    createTrade(input: $input, condition: $condition) {
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
export const updateTrade = /* GraphQL */ `
  mutation UpdateTrade(
    $input: UpdateTradeInput!
    $condition: ModelTradeConditionInput
  ) {
    updateTrade(input: $input, condition: $condition) {
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
export const deleteTrade = /* GraphQL */ `
  mutation DeleteTrade(
    $input: DeleteTradeInput!
    $condition: ModelTradeConditionInput
  ) {
    deleteTrade(input: $input, condition: $condition) {
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
