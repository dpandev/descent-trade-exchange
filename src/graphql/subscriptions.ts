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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
export const onCreatePortfolioCoin = /* GraphQL */ `
  subscription OnCreatePortfolioCoin(
    $filter: ModelSubscriptionPortfolioCoinFilterInput
    $owner: String
  ) {
    onCreatePortfolioCoin(filter: $filter, owner: $owner) {
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
export const onUpdatePortfolioCoin = /* GraphQL */ `
  subscription OnUpdatePortfolioCoin(
    $filter: ModelSubscriptionPortfolioCoinFilterInput
    $owner: String
  ) {
    onUpdatePortfolioCoin(filter: $filter, owner: $owner) {
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
export const onDeletePortfolioCoin = /* GraphQL */ `
  subscription OnDeletePortfolioCoin(
    $filter: ModelSubscriptionPortfolioCoinFilterInput
    $owner: String
  ) {
    onDeletePortfolioCoin(filter: $filter, owner: $owner) {
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
  subscription OnCreateTrade(
    $filter: ModelSubscriptionTradeFilterInput
    $owner: String
  ) {
    onCreateTrade(filter: $filter, owner: $owner) {
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
export const onUpdateTrade = /* GraphQL */ `
  subscription OnUpdateTrade(
    $filter: ModelSubscriptionTradeFilterInput
    $owner: String
  ) {
    onUpdateTrade(filter: $filter, owner: $owner) {
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
export const onDeleteTrade = /* GraphQL */ `
  subscription OnDeleteTrade(
    $filter: ModelSubscriptionTradeFilterInput
    $owner: String
  ) {
    onDeleteTrade(filter: $filter, owner: $owner) {
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
export const onCreateArticle = /* GraphQL */ `
  subscription OnCreateArticle($filter: ModelSubscriptionArticleFilterInput) {
    onCreateArticle(filter: $filter) {
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
export const onUpdateArticle = /* GraphQL */ `
  subscription OnUpdateArticle($filter: ModelSubscriptionArticleFilterInput) {
    onUpdateArticle(filter: $filter) {
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
export const onDeleteArticle = /* GraphQL */ `
  subscription OnDeleteArticle($filter: ModelSubscriptionArticleFilterInput) {
    onDeleteArticle(filter: $filter) {
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
