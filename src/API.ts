/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  email: string,
  username: string,
  networth: number,
  image?: string | null,
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  username?: ModelStringInput | null,
  networth?: ModelFloatInput | null,
  image?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type User = {
  __typename: "User",
  id: string,
  email: string,
  username: string,
  networth: number,
  image?: string | null,
  trades?: ModelTradeConnection | null,
  watchlist?: ModelCoinConnection | null,
  portfolio?: ModelPortfolioCoinConnection | null,
  follows?: ModelUserConnection | null,
  following?: ModelUserConnection | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type ModelTradeConnection = {
  __typename: "ModelTradeConnection",
  items:  Array<Trade | null >,
  nextToken?: string | null,
};

export type Trade = {
  __typename: "Trade",
  id: string,
  user?: User | null,
  coin?: Coin | null,
  amount: number,
  price: number,
  createdAt: string,
  updatedAt: string,
  userTradesId?: string | null,
  tradeCoinId?: string | null,
  owner?: string | null,
};

export type Coin = {
  __typename: "Coin",
  id: string,
  cgId: string,
  name: string,
  symbol: string,
  image?: string | null,
  currentPrice: number,
  valueChange1H: number,
  valueChange24H: number,
  valueChange7D: number,
  priceHistory?: string | null,
  createdAt: string,
  updatedAt: string,
  userWatchlistId?: string | null,
};

export type ModelCoinConnection = {
  __typename: "ModelCoinConnection",
  items:  Array<Coin | null >,
  nextToken?: string | null,
};

export type ModelPortfolioCoinConnection = {
  __typename: "ModelPortfolioCoinConnection",
  items:  Array<PortfolioCoin | null >,
  nextToken?: string | null,
};

export type PortfolioCoin = {
  __typename: "PortfolioCoin",
  id: string,
  coinId?: Coin | null,
  amount: number,
  user?: User | null,
  createdAt: string,
  updatedAt: string,
  userPortfolioId?: string | null,
  owner?: string | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type UpdateUserInput = {
  id: string,
  email?: string | null,
  username?: string | null,
  networth?: number | null,
  image?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreatePortfolioCoinInput = {
  id?: string | null,
  amount: number,
  userPortfolioId?: string | null,
};

export type ModelPortfolioCoinConditionInput = {
  amount?: ModelFloatInput | null,
  and?: Array< ModelPortfolioCoinConditionInput | null > | null,
  or?: Array< ModelPortfolioCoinConditionInput | null > | null,
  not?: ModelPortfolioCoinConditionInput | null,
  userPortfolioId?: ModelIDInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdatePortfolioCoinInput = {
  id: string,
  amount?: number | null,
  userPortfolioId?: string | null,
};

export type DeletePortfolioCoinInput = {
  id: string,
};

export type CreateCoinInput = {
  id?: string | null,
  cgId: string,
  name: string,
  symbol: string,
  image?: string | null,
  currentPrice: number,
  valueChange1H: number,
  valueChange24H: number,
  valueChange7D: number,
  priceHistory?: string | null,
  userWatchlistId?: string | null,
};

export type ModelCoinConditionInput = {
  cgId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  symbol?: ModelStringInput | null,
  image?: ModelStringInput | null,
  currentPrice?: ModelFloatInput | null,
  valueChange1H?: ModelFloatInput | null,
  valueChange24H?: ModelFloatInput | null,
  valueChange7D?: ModelFloatInput | null,
  priceHistory?: ModelStringInput | null,
  and?: Array< ModelCoinConditionInput | null > | null,
  or?: Array< ModelCoinConditionInput | null > | null,
  not?: ModelCoinConditionInput | null,
  userWatchlistId?: ModelIDInput | null,
};

export type UpdateCoinInput = {
  id: string,
  cgId?: string | null,
  name?: string | null,
  symbol?: string | null,
  image?: string | null,
  currentPrice?: number | null,
  valueChange1H?: number | null,
  valueChange24H?: number | null,
  valueChange7D?: number | null,
  priceHistory?: string | null,
  userWatchlistId?: string | null,
};

export type DeleteCoinInput = {
  id: string,
};

export type CreateTradeInput = {
  id?: string | null,
  amount: number,
  price: number,
  userTradesId?: string | null,
  tradeCoinId?: string | null,
};

export type ModelTradeConditionInput = {
  amount?: ModelFloatInput | null,
  price?: ModelFloatInput | null,
  and?: Array< ModelTradeConditionInput | null > | null,
  or?: Array< ModelTradeConditionInput | null > | null,
  not?: ModelTradeConditionInput | null,
  userTradesId?: ModelIDInput | null,
  tradeCoinId?: ModelIDInput | null,
};

export type UpdateTradeInput = {
  id: string,
  amount?: number | null,
  price?: number | null,
  userTradesId?: string | null,
  tradeCoinId?: string | null,
};

export type DeleteTradeInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  email?: ModelStringInput | null,
  username?: ModelStringInput | null,
  networth?: ModelFloatInput | null,
  image?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelPortfolioCoinFilterInput = {
  id?: ModelIDInput | null,
  amount?: ModelFloatInput | null,
  and?: Array< ModelPortfolioCoinFilterInput | null > | null,
  or?: Array< ModelPortfolioCoinFilterInput | null > | null,
  not?: ModelPortfolioCoinFilterInput | null,
  userPortfolioId?: ModelIDInput | null,
};

export type ModelCoinFilterInput = {
  id?: ModelIDInput | null,
  cgId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  symbol?: ModelStringInput | null,
  image?: ModelStringInput | null,
  currentPrice?: ModelFloatInput | null,
  valueChange1H?: ModelFloatInput | null,
  valueChange24H?: ModelFloatInput | null,
  valueChange7D?: ModelFloatInput | null,
  priceHistory?: ModelStringInput | null,
  and?: Array< ModelCoinFilterInput | null > | null,
  or?: Array< ModelCoinFilterInput | null > | null,
  not?: ModelCoinFilterInput | null,
  userWatchlistId?: ModelIDInput | null,
};

export type ModelTradeFilterInput = {
  id?: ModelIDInput | null,
  amount?: ModelFloatInput | null,
  price?: ModelFloatInput | null,
  and?: Array< ModelTradeFilterInput | null > | null,
  or?: Array< ModelTradeFilterInput | null > | null,
  not?: ModelTradeFilterInput | null,
  userTradesId?: ModelIDInput | null,
  tradeCoinId?: ModelIDInput | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  email?: ModelSubscriptionStringInput | null,
  username?: ModelSubscriptionStringInput | null,
  networth?: ModelSubscriptionFloatInput | null,
  image?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionPortfolioCoinFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  amount?: ModelSubscriptionFloatInput | null,
  and?: Array< ModelSubscriptionPortfolioCoinFilterInput | null > | null,
  or?: Array< ModelSubscriptionPortfolioCoinFilterInput | null > | null,
};

export type ModelSubscriptionCoinFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  cgId?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  symbol?: ModelSubscriptionStringInput | null,
  image?: ModelSubscriptionStringInput | null,
  currentPrice?: ModelSubscriptionFloatInput | null,
  valueChange1H?: ModelSubscriptionFloatInput | null,
  valueChange24H?: ModelSubscriptionFloatInput | null,
  valueChange7D?: ModelSubscriptionFloatInput | null,
  priceHistory?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCoinFilterInput | null > | null,
  or?: Array< ModelSubscriptionCoinFilterInput | null > | null,
};

export type ModelSubscriptionTradeFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  amount?: ModelSubscriptionFloatInput | null,
  price?: ModelSubscriptionFloatInput | null,
  and?: Array< ModelSubscriptionTradeFilterInput | null > | null,
  or?: Array< ModelSubscriptionTradeFilterInput | null > | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    email: string,
    username: string,
    networth: number,
    image?: string | null,
    trades?:  {
      __typename: "ModelTradeConnection",
      items:  Array< {
        __typename: "Trade",
        id: string,
        amount: number,
        price: number,
        createdAt: string,
        updatedAt: string,
        userTradesId?: string | null,
        tradeCoinId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    watchlist?:  {
      __typename: "ModelCoinConnection",
      items:  Array< {
        __typename: "Coin",
        id: string,
        cgId: string,
        name: string,
        symbol: string,
        image?: string | null,
        currentPrice: number,
        valueChange1H: number,
        valueChange24H: number,
        valueChange7D: number,
        priceHistory?: string | null,
        createdAt: string,
        updatedAt: string,
        userWatchlistId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    portfolio?:  {
      __typename: "ModelPortfolioCoinConnection",
      items:  Array< {
        __typename: "PortfolioCoin",
        id: string,
        amount: number,
        createdAt: string,
        updatedAt: string,
        userPortfolioId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    follows?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        email: string,
        username: string,
        networth: number,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    following?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        email: string,
        username: string,
        networth: number,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    username: string,
    networth: number,
    image?: string | null,
    trades?:  {
      __typename: "ModelTradeConnection",
      items:  Array< {
        __typename: "Trade",
        id: string,
        amount: number,
        price: number,
        createdAt: string,
        updatedAt: string,
        userTradesId?: string | null,
        tradeCoinId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    watchlist?:  {
      __typename: "ModelCoinConnection",
      items:  Array< {
        __typename: "Coin",
        id: string,
        cgId: string,
        name: string,
        symbol: string,
        image?: string | null,
        currentPrice: number,
        valueChange1H: number,
        valueChange24H: number,
        valueChange7D: number,
        priceHistory?: string | null,
        createdAt: string,
        updatedAt: string,
        userWatchlistId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    portfolio?:  {
      __typename: "ModelPortfolioCoinConnection",
      items:  Array< {
        __typename: "PortfolioCoin",
        id: string,
        amount: number,
        createdAt: string,
        updatedAt: string,
        userPortfolioId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    follows?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        email: string,
        username: string,
        networth: number,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    following?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        email: string,
        username: string,
        networth: number,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    username: string,
    networth: number,
    image?: string | null,
    trades?:  {
      __typename: "ModelTradeConnection",
      items:  Array< {
        __typename: "Trade",
        id: string,
        amount: number,
        price: number,
        createdAt: string,
        updatedAt: string,
        userTradesId?: string | null,
        tradeCoinId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    watchlist?:  {
      __typename: "ModelCoinConnection",
      items:  Array< {
        __typename: "Coin",
        id: string,
        cgId: string,
        name: string,
        symbol: string,
        image?: string | null,
        currentPrice: number,
        valueChange1H: number,
        valueChange24H: number,
        valueChange7D: number,
        priceHistory?: string | null,
        createdAt: string,
        updatedAt: string,
        userWatchlistId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    portfolio?:  {
      __typename: "ModelPortfolioCoinConnection",
      items:  Array< {
        __typename: "PortfolioCoin",
        id: string,
        amount: number,
        createdAt: string,
        updatedAt: string,
        userPortfolioId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    follows?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        email: string,
        username: string,
        networth: number,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    following?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        email: string,
        username: string,
        networth: number,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreatePortfolioCoinMutationVariables = {
  input: CreatePortfolioCoinInput,
  condition?: ModelPortfolioCoinConditionInput | null,
};

export type CreatePortfolioCoinMutation = {
  createPortfolioCoin?:  {
    __typename: "PortfolioCoin",
    id: string,
    coinId?:  {
      __typename: "Coin",
      id: string,
      cgId: string,
      name: string,
      symbol: string,
      image?: string | null,
      currentPrice: number,
      valueChange1H: number,
      valueChange24H: number,
      valueChange7D: number,
      priceHistory?: string | null,
      createdAt: string,
      updatedAt: string,
      userWatchlistId?: string | null,
    } | null,
    amount: number,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      networth: number,
      image?: string | null,
      trades?:  {
        __typename: "ModelTradeConnection",
        nextToken?: string | null,
      } | null,
      watchlist?:  {
        __typename: "ModelCoinConnection",
        nextToken?: string | null,
      } | null,
      portfolio?:  {
        __typename: "ModelPortfolioCoinConnection",
        nextToken?: string | null,
      } | null,
      follows?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      following?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userPortfolioId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdatePortfolioCoinMutationVariables = {
  input: UpdatePortfolioCoinInput,
  condition?: ModelPortfolioCoinConditionInput | null,
};

export type UpdatePortfolioCoinMutation = {
  updatePortfolioCoin?:  {
    __typename: "PortfolioCoin",
    id: string,
    coinId?:  {
      __typename: "Coin",
      id: string,
      cgId: string,
      name: string,
      symbol: string,
      image?: string | null,
      currentPrice: number,
      valueChange1H: number,
      valueChange24H: number,
      valueChange7D: number,
      priceHistory?: string | null,
      createdAt: string,
      updatedAt: string,
      userWatchlistId?: string | null,
    } | null,
    amount: number,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      networth: number,
      image?: string | null,
      trades?:  {
        __typename: "ModelTradeConnection",
        nextToken?: string | null,
      } | null,
      watchlist?:  {
        __typename: "ModelCoinConnection",
        nextToken?: string | null,
      } | null,
      portfolio?:  {
        __typename: "ModelPortfolioCoinConnection",
        nextToken?: string | null,
      } | null,
      follows?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      following?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userPortfolioId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeletePortfolioCoinMutationVariables = {
  input: DeletePortfolioCoinInput,
  condition?: ModelPortfolioCoinConditionInput | null,
};

export type DeletePortfolioCoinMutation = {
  deletePortfolioCoin?:  {
    __typename: "PortfolioCoin",
    id: string,
    coinId?:  {
      __typename: "Coin",
      id: string,
      cgId: string,
      name: string,
      symbol: string,
      image?: string | null,
      currentPrice: number,
      valueChange1H: number,
      valueChange24H: number,
      valueChange7D: number,
      priceHistory?: string | null,
      createdAt: string,
      updatedAt: string,
      userWatchlistId?: string | null,
    } | null,
    amount: number,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      networth: number,
      image?: string | null,
      trades?:  {
        __typename: "ModelTradeConnection",
        nextToken?: string | null,
      } | null,
      watchlist?:  {
        __typename: "ModelCoinConnection",
        nextToken?: string | null,
      } | null,
      portfolio?:  {
        __typename: "ModelPortfolioCoinConnection",
        nextToken?: string | null,
      } | null,
      follows?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      following?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userPortfolioId?: string | null,
    owner?: string | null,
  } | null,
};

export type CreateCoinMutationVariables = {
  input: CreateCoinInput,
  condition?: ModelCoinConditionInput | null,
};

export type CreateCoinMutation = {
  createCoin?:  {
    __typename: "Coin",
    id: string,
    cgId: string,
    name: string,
    symbol: string,
    image?: string | null,
    currentPrice: number,
    valueChange1H: number,
    valueChange24H: number,
    valueChange7D: number,
    priceHistory?: string | null,
    createdAt: string,
    updatedAt: string,
    userWatchlistId?: string | null,
  } | null,
};

export type UpdateCoinMutationVariables = {
  input: UpdateCoinInput,
  condition?: ModelCoinConditionInput | null,
};

export type UpdateCoinMutation = {
  updateCoin?:  {
    __typename: "Coin",
    id: string,
    cgId: string,
    name: string,
    symbol: string,
    image?: string | null,
    currentPrice: number,
    valueChange1H: number,
    valueChange24H: number,
    valueChange7D: number,
    priceHistory?: string | null,
    createdAt: string,
    updatedAt: string,
    userWatchlistId?: string | null,
  } | null,
};

export type DeleteCoinMutationVariables = {
  input: DeleteCoinInput,
  condition?: ModelCoinConditionInput | null,
};

export type DeleteCoinMutation = {
  deleteCoin?:  {
    __typename: "Coin",
    id: string,
    cgId: string,
    name: string,
    symbol: string,
    image?: string | null,
    currentPrice: number,
    valueChange1H: number,
    valueChange24H: number,
    valueChange7D: number,
    priceHistory?: string | null,
    createdAt: string,
    updatedAt: string,
    userWatchlistId?: string | null,
  } | null,
};

export type CreateTradeMutationVariables = {
  input: CreateTradeInput,
  condition?: ModelTradeConditionInput | null,
};

export type CreateTradeMutation = {
  createTrade?:  {
    __typename: "Trade",
    id: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      networth: number,
      image?: string | null,
      trades?:  {
        __typename: "ModelTradeConnection",
        nextToken?: string | null,
      } | null,
      watchlist?:  {
        __typename: "ModelCoinConnection",
        nextToken?: string | null,
      } | null,
      portfolio?:  {
        __typename: "ModelPortfolioCoinConnection",
        nextToken?: string | null,
      } | null,
      follows?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      following?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    coin?:  {
      __typename: "Coin",
      id: string,
      cgId: string,
      name: string,
      symbol: string,
      image?: string | null,
      currentPrice: number,
      valueChange1H: number,
      valueChange24H: number,
      valueChange7D: number,
      priceHistory?: string | null,
      createdAt: string,
      updatedAt: string,
      userWatchlistId?: string | null,
    } | null,
    amount: number,
    price: number,
    createdAt: string,
    updatedAt: string,
    userTradesId?: string | null,
    tradeCoinId?: string | null,
    owner?: string | null,
  } | null,
};

export type UpdateTradeMutationVariables = {
  input: UpdateTradeInput,
  condition?: ModelTradeConditionInput | null,
};

export type UpdateTradeMutation = {
  updateTrade?:  {
    __typename: "Trade",
    id: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      networth: number,
      image?: string | null,
      trades?:  {
        __typename: "ModelTradeConnection",
        nextToken?: string | null,
      } | null,
      watchlist?:  {
        __typename: "ModelCoinConnection",
        nextToken?: string | null,
      } | null,
      portfolio?:  {
        __typename: "ModelPortfolioCoinConnection",
        nextToken?: string | null,
      } | null,
      follows?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      following?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    coin?:  {
      __typename: "Coin",
      id: string,
      cgId: string,
      name: string,
      symbol: string,
      image?: string | null,
      currentPrice: number,
      valueChange1H: number,
      valueChange24H: number,
      valueChange7D: number,
      priceHistory?: string | null,
      createdAt: string,
      updatedAt: string,
      userWatchlistId?: string | null,
    } | null,
    amount: number,
    price: number,
    createdAt: string,
    updatedAt: string,
    userTradesId?: string | null,
    tradeCoinId?: string | null,
    owner?: string | null,
  } | null,
};

export type DeleteTradeMutationVariables = {
  input: DeleteTradeInput,
  condition?: ModelTradeConditionInput | null,
};

export type DeleteTradeMutation = {
  deleteTrade?:  {
    __typename: "Trade",
    id: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      networth: number,
      image?: string | null,
      trades?:  {
        __typename: "ModelTradeConnection",
        nextToken?: string | null,
      } | null,
      watchlist?:  {
        __typename: "ModelCoinConnection",
        nextToken?: string | null,
      } | null,
      portfolio?:  {
        __typename: "ModelPortfolioCoinConnection",
        nextToken?: string | null,
      } | null,
      follows?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      following?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    coin?:  {
      __typename: "Coin",
      id: string,
      cgId: string,
      name: string,
      symbol: string,
      image?: string | null,
      currentPrice: number,
      valueChange1H: number,
      valueChange24H: number,
      valueChange7D: number,
      priceHistory?: string | null,
      createdAt: string,
      updatedAt: string,
      userWatchlistId?: string | null,
    } | null,
    amount: number,
    price: number,
    createdAt: string,
    updatedAt: string,
    userTradesId?: string | null,
    tradeCoinId?: string | null,
    owner?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    email: string,
    username: string,
    networth: number,
    image?: string | null,
    trades?:  {
      __typename: "ModelTradeConnection",
      items:  Array< {
        __typename: "Trade",
        id: string,
        amount: number,
        price: number,
        createdAt: string,
        updatedAt: string,
        userTradesId?: string | null,
        tradeCoinId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    watchlist?:  {
      __typename: "ModelCoinConnection",
      items:  Array< {
        __typename: "Coin",
        id: string,
        cgId: string,
        name: string,
        symbol: string,
        image?: string | null,
        currentPrice: number,
        valueChange1H: number,
        valueChange24H: number,
        valueChange7D: number,
        priceHistory?: string | null,
        createdAt: string,
        updatedAt: string,
        userWatchlistId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    portfolio?:  {
      __typename: "ModelPortfolioCoinConnection",
      items:  Array< {
        __typename: "PortfolioCoin",
        id: string,
        amount: number,
        createdAt: string,
        updatedAt: string,
        userPortfolioId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    follows?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        email: string,
        username: string,
        networth: number,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    following?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        email: string,
        username: string,
        networth: number,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  id?: string | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      networth: number,
      image?: string | null,
      trades?:  {
        __typename: "ModelTradeConnection",
        nextToken?: string | null,
      } | null,
      watchlist?:  {
        __typename: "ModelCoinConnection",
        nextToken?: string | null,
      } | null,
      portfolio?:  {
        __typename: "ModelPortfolioCoinConnection",
        nextToken?: string | null,
      } | null,
      follows?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      following?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPortfolioCoinQueryVariables = {
  id: string,
};

export type GetPortfolioCoinQuery = {
  getPortfolioCoin?:  {
    __typename: "PortfolioCoin",
    id: string,
    coinId?:  {
      __typename: "Coin",
      id: string,
      cgId: string,
      name: string,
      symbol: string,
      image?: string | null,
      currentPrice: number,
      valueChange1H: number,
      valueChange24H: number,
      valueChange7D: number,
      priceHistory?: string | null,
      createdAt: string,
      updatedAt: string,
      userWatchlistId?: string | null,
    } | null,
    amount: number,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      networth: number,
      image?: string | null,
      trades?:  {
        __typename: "ModelTradeConnection",
        nextToken?: string | null,
      } | null,
      watchlist?:  {
        __typename: "ModelCoinConnection",
        nextToken?: string | null,
      } | null,
      portfolio?:  {
        __typename: "ModelPortfolioCoinConnection",
        nextToken?: string | null,
      } | null,
      follows?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      following?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userPortfolioId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListPortfolioCoinsQueryVariables = {
  id?: string | null,
  filter?: ModelPortfolioCoinFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListPortfolioCoinsQuery = {
  listPortfolioCoins?:  {
    __typename: "ModelPortfolioCoinConnection",
    items:  Array< {
      __typename: "PortfolioCoin",
      id: string,
      coinId?:  {
        __typename: "Coin",
        id: string,
        cgId: string,
        name: string,
        symbol: string,
        image?: string | null,
        currentPrice: number,
        valueChange1H: number,
        valueChange24H: number,
        valueChange7D: number,
        priceHistory?: string | null,
        createdAt: string,
        updatedAt: string,
        userWatchlistId?: string | null,
      } | null,
      amount: number,
      user?:  {
        __typename: "User",
        id: string,
        email: string,
        username: string,
        networth: number,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      userPortfolioId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCoinQueryVariables = {
  id: string,
};

export type GetCoinQuery = {
  getCoin?:  {
    __typename: "Coin",
    id: string,
    cgId: string,
    name: string,
    symbol: string,
    image?: string | null,
    currentPrice: number,
    valueChange1H: number,
    valueChange24H: number,
    valueChange7D: number,
    priceHistory?: string | null,
    createdAt: string,
    updatedAt: string,
    userWatchlistId?: string | null,
  } | null,
};

export type ListCoinsQueryVariables = {
  id?: string | null,
  filter?: ModelCoinFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCoinsQuery = {
  listCoins?:  {
    __typename: "ModelCoinConnection",
    items:  Array< {
      __typename: "Coin",
      id: string,
      cgId: string,
      name: string,
      symbol: string,
      image?: string | null,
      currentPrice: number,
      valueChange1H: number,
      valueChange24H: number,
      valueChange7D: number,
      priceHistory?: string | null,
      createdAt: string,
      updatedAt: string,
      userWatchlistId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTradeQueryVariables = {
  id: string,
};

export type GetTradeQuery = {
  getTrade?:  {
    __typename: "Trade",
    id: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      networth: number,
      image?: string | null,
      trades?:  {
        __typename: "ModelTradeConnection",
        nextToken?: string | null,
      } | null,
      watchlist?:  {
        __typename: "ModelCoinConnection",
        nextToken?: string | null,
      } | null,
      portfolio?:  {
        __typename: "ModelPortfolioCoinConnection",
        nextToken?: string | null,
      } | null,
      follows?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      following?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    coin?:  {
      __typename: "Coin",
      id: string,
      cgId: string,
      name: string,
      symbol: string,
      image?: string | null,
      currentPrice: number,
      valueChange1H: number,
      valueChange24H: number,
      valueChange7D: number,
      priceHistory?: string | null,
      createdAt: string,
      updatedAt: string,
      userWatchlistId?: string | null,
    } | null,
    amount: number,
    price: number,
    createdAt: string,
    updatedAt: string,
    userTradesId?: string | null,
    tradeCoinId?: string | null,
    owner?: string | null,
  } | null,
};

export type ListTradesQueryVariables = {
  id?: string | null,
  filter?: ModelTradeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListTradesQuery = {
  listTrades?:  {
    __typename: "ModelTradeConnection",
    items:  Array< {
      __typename: "Trade",
      id: string,
      user?:  {
        __typename: "User",
        id: string,
        email: string,
        username: string,
        networth: number,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null,
      coin?:  {
        __typename: "Coin",
        id: string,
        cgId: string,
        name: string,
        symbol: string,
        image?: string | null,
        currentPrice: number,
        valueChange1H: number,
        valueChange24H: number,
        valueChange7D: number,
        priceHistory?: string | null,
        createdAt: string,
        updatedAt: string,
        userWatchlistId?: string | null,
      } | null,
      amount: number,
      price: number,
      createdAt: string,
      updatedAt: string,
      userTradesId?: string | null,
      tradeCoinId?: string | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    username: string,
    networth: number,
    image?: string | null,
    trades?:  {
      __typename: "ModelTradeConnection",
      items:  Array< {
        __typename: "Trade",
        id: string,
        amount: number,
        price: number,
        createdAt: string,
        updatedAt: string,
        userTradesId?: string | null,
        tradeCoinId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    watchlist?:  {
      __typename: "ModelCoinConnection",
      items:  Array< {
        __typename: "Coin",
        id: string,
        cgId: string,
        name: string,
        symbol: string,
        image?: string | null,
        currentPrice: number,
        valueChange1H: number,
        valueChange24H: number,
        valueChange7D: number,
        priceHistory?: string | null,
        createdAt: string,
        updatedAt: string,
        userWatchlistId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    portfolio?:  {
      __typename: "ModelPortfolioCoinConnection",
      items:  Array< {
        __typename: "PortfolioCoin",
        id: string,
        amount: number,
        createdAt: string,
        updatedAt: string,
        userPortfolioId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    follows?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        email: string,
        username: string,
        networth: number,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    following?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        email: string,
        username: string,
        networth: number,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    username: string,
    networth: number,
    image?: string | null,
    trades?:  {
      __typename: "ModelTradeConnection",
      items:  Array< {
        __typename: "Trade",
        id: string,
        amount: number,
        price: number,
        createdAt: string,
        updatedAt: string,
        userTradesId?: string | null,
        tradeCoinId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    watchlist?:  {
      __typename: "ModelCoinConnection",
      items:  Array< {
        __typename: "Coin",
        id: string,
        cgId: string,
        name: string,
        symbol: string,
        image?: string | null,
        currentPrice: number,
        valueChange1H: number,
        valueChange24H: number,
        valueChange7D: number,
        priceHistory?: string | null,
        createdAt: string,
        updatedAt: string,
        userWatchlistId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    portfolio?:  {
      __typename: "ModelPortfolioCoinConnection",
      items:  Array< {
        __typename: "PortfolioCoin",
        id: string,
        amount: number,
        createdAt: string,
        updatedAt: string,
        userPortfolioId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    follows?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        email: string,
        username: string,
        networth: number,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    following?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        email: string,
        username: string,
        networth: number,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    username: string,
    networth: number,
    image?: string | null,
    trades?:  {
      __typename: "ModelTradeConnection",
      items:  Array< {
        __typename: "Trade",
        id: string,
        amount: number,
        price: number,
        createdAt: string,
        updatedAt: string,
        userTradesId?: string | null,
        tradeCoinId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    watchlist?:  {
      __typename: "ModelCoinConnection",
      items:  Array< {
        __typename: "Coin",
        id: string,
        cgId: string,
        name: string,
        symbol: string,
        image?: string | null,
        currentPrice: number,
        valueChange1H: number,
        valueChange24H: number,
        valueChange7D: number,
        priceHistory?: string | null,
        createdAt: string,
        updatedAt: string,
        userWatchlistId?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    portfolio?:  {
      __typename: "ModelPortfolioCoinConnection",
      items:  Array< {
        __typename: "PortfolioCoin",
        id: string,
        amount: number,
        createdAt: string,
        updatedAt: string,
        userPortfolioId?: string | null,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    follows?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        email: string,
        username: string,
        networth: number,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    following?:  {
      __typename: "ModelUserConnection",
      items:  Array< {
        __typename: "User",
        id: string,
        email: string,
        username: string,
        networth: number,
        image?: string | null,
        createdAt: string,
        updatedAt: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreatePortfolioCoinSubscriptionVariables = {
  filter?: ModelSubscriptionPortfolioCoinFilterInput | null,
  owner?: string | null,
};

export type OnCreatePortfolioCoinSubscription = {
  onCreatePortfolioCoin?:  {
    __typename: "PortfolioCoin",
    id: string,
    coinId?:  {
      __typename: "Coin",
      id: string,
      cgId: string,
      name: string,
      symbol: string,
      image?: string | null,
      currentPrice: number,
      valueChange1H: number,
      valueChange24H: number,
      valueChange7D: number,
      priceHistory?: string | null,
      createdAt: string,
      updatedAt: string,
      userWatchlistId?: string | null,
    } | null,
    amount: number,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      networth: number,
      image?: string | null,
      trades?:  {
        __typename: "ModelTradeConnection",
        nextToken?: string | null,
      } | null,
      watchlist?:  {
        __typename: "ModelCoinConnection",
        nextToken?: string | null,
      } | null,
      portfolio?:  {
        __typename: "ModelPortfolioCoinConnection",
        nextToken?: string | null,
      } | null,
      follows?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      following?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userPortfolioId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdatePortfolioCoinSubscriptionVariables = {
  filter?: ModelSubscriptionPortfolioCoinFilterInput | null,
  owner?: string | null,
};

export type OnUpdatePortfolioCoinSubscription = {
  onUpdatePortfolioCoin?:  {
    __typename: "PortfolioCoin",
    id: string,
    coinId?:  {
      __typename: "Coin",
      id: string,
      cgId: string,
      name: string,
      symbol: string,
      image?: string | null,
      currentPrice: number,
      valueChange1H: number,
      valueChange24H: number,
      valueChange7D: number,
      priceHistory?: string | null,
      createdAt: string,
      updatedAt: string,
      userWatchlistId?: string | null,
    } | null,
    amount: number,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      networth: number,
      image?: string | null,
      trades?:  {
        __typename: "ModelTradeConnection",
        nextToken?: string | null,
      } | null,
      watchlist?:  {
        __typename: "ModelCoinConnection",
        nextToken?: string | null,
      } | null,
      portfolio?:  {
        __typename: "ModelPortfolioCoinConnection",
        nextToken?: string | null,
      } | null,
      follows?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      following?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userPortfolioId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeletePortfolioCoinSubscriptionVariables = {
  filter?: ModelSubscriptionPortfolioCoinFilterInput | null,
  owner?: string | null,
};

export type OnDeletePortfolioCoinSubscription = {
  onDeletePortfolioCoin?:  {
    __typename: "PortfolioCoin",
    id: string,
    coinId?:  {
      __typename: "Coin",
      id: string,
      cgId: string,
      name: string,
      symbol: string,
      image?: string | null,
      currentPrice: number,
      valueChange1H: number,
      valueChange24H: number,
      valueChange7D: number,
      priceHistory?: string | null,
      createdAt: string,
      updatedAt: string,
      userWatchlistId?: string | null,
    } | null,
    amount: number,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      networth: number,
      image?: string | null,
      trades?:  {
        __typename: "ModelTradeConnection",
        nextToken?: string | null,
      } | null,
      watchlist?:  {
        __typename: "ModelCoinConnection",
        nextToken?: string | null,
      } | null,
      portfolio?:  {
        __typename: "ModelPortfolioCoinConnection",
        nextToken?: string | null,
      } | null,
      follows?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      following?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    userPortfolioId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnCreateCoinSubscriptionVariables = {
  filter?: ModelSubscriptionCoinFilterInput | null,
};

export type OnCreateCoinSubscription = {
  onCreateCoin?:  {
    __typename: "Coin",
    id: string,
    cgId: string,
    name: string,
    symbol: string,
    image?: string | null,
    currentPrice: number,
    valueChange1H: number,
    valueChange24H: number,
    valueChange7D: number,
    priceHistory?: string | null,
    createdAt: string,
    updatedAt: string,
    userWatchlistId?: string | null,
  } | null,
};

export type OnUpdateCoinSubscriptionVariables = {
  filter?: ModelSubscriptionCoinFilterInput | null,
};

export type OnUpdateCoinSubscription = {
  onUpdateCoin?:  {
    __typename: "Coin",
    id: string,
    cgId: string,
    name: string,
    symbol: string,
    image?: string | null,
    currentPrice: number,
    valueChange1H: number,
    valueChange24H: number,
    valueChange7D: number,
    priceHistory?: string | null,
    createdAt: string,
    updatedAt: string,
    userWatchlistId?: string | null,
  } | null,
};

export type OnDeleteCoinSubscriptionVariables = {
  filter?: ModelSubscriptionCoinFilterInput | null,
};

export type OnDeleteCoinSubscription = {
  onDeleteCoin?:  {
    __typename: "Coin",
    id: string,
    cgId: string,
    name: string,
    symbol: string,
    image?: string | null,
    currentPrice: number,
    valueChange1H: number,
    valueChange24H: number,
    valueChange7D: number,
    priceHistory?: string | null,
    createdAt: string,
    updatedAt: string,
    userWatchlistId?: string | null,
  } | null,
};

export type OnCreateTradeSubscriptionVariables = {
  filter?: ModelSubscriptionTradeFilterInput | null,
  owner?: string | null,
};

export type OnCreateTradeSubscription = {
  onCreateTrade?:  {
    __typename: "Trade",
    id: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      networth: number,
      image?: string | null,
      trades?:  {
        __typename: "ModelTradeConnection",
        nextToken?: string | null,
      } | null,
      watchlist?:  {
        __typename: "ModelCoinConnection",
        nextToken?: string | null,
      } | null,
      portfolio?:  {
        __typename: "ModelPortfolioCoinConnection",
        nextToken?: string | null,
      } | null,
      follows?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      following?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    coin?:  {
      __typename: "Coin",
      id: string,
      cgId: string,
      name: string,
      symbol: string,
      image?: string | null,
      currentPrice: number,
      valueChange1H: number,
      valueChange24H: number,
      valueChange7D: number,
      priceHistory?: string | null,
      createdAt: string,
      updatedAt: string,
      userWatchlistId?: string | null,
    } | null,
    amount: number,
    price: number,
    createdAt: string,
    updatedAt: string,
    userTradesId?: string | null,
    tradeCoinId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnUpdateTradeSubscriptionVariables = {
  filter?: ModelSubscriptionTradeFilterInput | null,
  owner?: string | null,
};

export type OnUpdateTradeSubscription = {
  onUpdateTrade?:  {
    __typename: "Trade",
    id: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      networth: number,
      image?: string | null,
      trades?:  {
        __typename: "ModelTradeConnection",
        nextToken?: string | null,
      } | null,
      watchlist?:  {
        __typename: "ModelCoinConnection",
        nextToken?: string | null,
      } | null,
      portfolio?:  {
        __typename: "ModelPortfolioCoinConnection",
        nextToken?: string | null,
      } | null,
      follows?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      following?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    coin?:  {
      __typename: "Coin",
      id: string,
      cgId: string,
      name: string,
      symbol: string,
      image?: string | null,
      currentPrice: number,
      valueChange1H: number,
      valueChange24H: number,
      valueChange7D: number,
      priceHistory?: string | null,
      createdAt: string,
      updatedAt: string,
      userWatchlistId?: string | null,
    } | null,
    amount: number,
    price: number,
    createdAt: string,
    updatedAt: string,
    userTradesId?: string | null,
    tradeCoinId?: string | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteTradeSubscriptionVariables = {
  filter?: ModelSubscriptionTradeFilterInput | null,
  owner?: string | null,
};

export type OnDeleteTradeSubscription = {
  onDeleteTrade?:  {
    __typename: "Trade",
    id: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      username: string,
      networth: number,
      image?: string | null,
      trades?:  {
        __typename: "ModelTradeConnection",
        nextToken?: string | null,
      } | null,
      watchlist?:  {
        __typename: "ModelCoinConnection",
        nextToken?: string | null,
      } | null,
      portfolio?:  {
        __typename: "ModelPortfolioCoinConnection",
        nextToken?: string | null,
      } | null,
      follows?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      following?:  {
        __typename: "ModelUserConnection",
        nextToken?: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null,
    coin?:  {
      __typename: "Coin",
      id: string,
      cgId: string,
      name: string,
      symbol: string,
      image?: string | null,
      currentPrice: number,
      valueChange1H: number,
      valueChange24H: number,
      valueChange7D: number,
      priceHistory?: string | null,
      createdAt: string,
      updatedAt: string,
      userWatchlistId?: string | null,
    } | null,
    amount: number,
    price: number,
    createdAt: string,
    updatedAt: string,
    userTradesId?: string | null,
    tradeCoinId?: string | null,
    owner?: string | null,
  } | null,
};
