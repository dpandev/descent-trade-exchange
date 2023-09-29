/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  displayName?: string | null,
  email: string,
  networth: number,
  image?: string | null,
  trades?: Array< TradeInput | null > | null,
  portfolio?: Array< PortfolioCoinInput | null > | null,
  followers?: Array< string | null > | null,
  following?: Array< string | null > | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  watchlist?: Array< string | null > | null,
};

export type TradeInput = {
  id: string,
  coinId: string,
  amount: number,
  price: number,
  date: string,
};

export type PortfolioCoinInput = {
  id: string,
  amount: number,
  coinId: string,
};

export type ModelUserConditionInput = {
  displayName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  networth?: ModelFloatInput | null,
  image?: ModelStringInput | null,
  followers?: ModelStringInput | null,
  following?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  watchlist?: ModelStringInput | null,
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
  displayName?: string | null,
  email: string,
  networth: number,
  image?: string | null,
  trades?:  Array<Trade | null > | null,
  portfolio?:  Array<PortfolioCoin | null > | null,
  followers?: Array< string | null > | null,
  following?: Array< string | null > | null,
  createdAt: string,
  updatedAt: string,
  watchlist?: Array< string | null > | null,
  owner?: string | null,
};

export type Trade = {
  __typename: "Trade",
  id: string,
  coinId: string,
  amount: number,
  price: number,
  date: string,
};

export type PortfolioCoin = {
  __typename: "PortfolioCoin",
  id: string,
  amount: number,
  coinId: string,
};

export type UpdateUserInput = {
  id: string,
  displayName?: string | null,
  email?: string | null,
  networth?: number | null,
  image?: string | null,
  trades?: Array< TradeInput | null > | null,
  portfolio?: Array< PortfolioCoinInput | null > | null,
  followers?: Array< string | null > | null,
  following?: Array< string | null > | null,
  createdAt?: string | null,
  updatedAt?: string | null,
  watchlist?: Array< string | null > | null,
};

export type DeleteUserInput = {
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
};

export type DeleteCoinInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  displayName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  networth?: ModelFloatInput | null,
  image?: ModelStringInput | null,
  followers?: ModelStringInput | null,
  following?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  watchlist?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
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

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
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
};

export type ModelCoinConnection = {
  __typename: "ModelCoinConnection",
  items:  Array<Coin | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  displayName?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  networth?: ModelSubscriptionFloatInput | null,
  image?: ModelSubscriptionStringInput | null,
  followers?: ModelSubscriptionStringInput | null,
  following?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  watchlist?: ModelSubscriptionStringInput | null,
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

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    displayName?: string | null,
    email: string,
    networth: number,
    image?: string | null,
    trades?:  Array< {
      __typename: "Trade",
      id: string,
      coinId: string,
      amount: number,
      price: number,
      date: string,
    } | null > | null,
    portfolio?:  Array< {
      __typename: "PortfolioCoin",
      id: string,
      amount: number,
      coinId: string,
    } | null > | null,
    followers?: Array< string | null > | null,
    following?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    watchlist?: Array< string | null > | null,
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
    displayName?: string | null,
    email: string,
    networth: number,
    image?: string | null,
    trades?:  Array< {
      __typename: "Trade",
      id: string,
      coinId: string,
      amount: number,
      price: number,
      date: string,
    } | null > | null,
    portfolio?:  Array< {
      __typename: "PortfolioCoin",
      id: string,
      amount: number,
      coinId: string,
    } | null > | null,
    followers?: Array< string | null > | null,
    following?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    watchlist?: Array< string | null > | null,
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
    displayName?: string | null,
    email: string,
    networth: number,
    image?: string | null,
    trades?:  Array< {
      __typename: "Trade",
      id: string,
      coinId: string,
      amount: number,
      price: number,
      date: string,
    } | null > | null,
    portfolio?:  Array< {
      __typename: "PortfolioCoin",
      id: string,
      amount: number,
      coinId: string,
    } | null > | null,
    followers?: Array< string | null > | null,
    following?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    watchlist?: Array< string | null > | null,
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
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    displayName?: string | null,
    email: string,
    networth: number,
    image?: string | null,
    trades?:  Array< {
      __typename: "Trade",
      id: string,
      coinId: string,
      amount: number,
      price: number,
      date: string,
    } | null > | null,
    portfolio?:  Array< {
      __typename: "PortfolioCoin",
      id: string,
      amount: number,
      coinId: string,
    } | null > | null,
    followers?: Array< string | null > | null,
    following?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    watchlist?: Array< string | null > | null,
    owner?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      displayName?: string | null,
      email: string,
      networth: number,
      image?: string | null,
      trades?:  Array< {
        __typename: "Trade",
        id: string,
        coinId: string,
        amount: number,
        price: number,
        date: string,
      } | null > | null,
      portfolio?:  Array< {
        __typename: "PortfolioCoin",
        id: string,
        amount: number,
        coinId: string,
      } | null > | null,
      followers?: Array< string | null > | null,
      following?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      watchlist?: Array< string | null > | null,
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
  } | null,
};

export type ListCoinsQueryVariables = {
  filter?: ModelCoinFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
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
    displayName?: string | null,
    email: string,
    networth: number,
    image?: string | null,
    trades?:  Array< {
      __typename: "Trade",
      id: string,
      coinId: string,
      amount: number,
      price: number,
      date: string,
    } | null > | null,
    portfolio?:  Array< {
      __typename: "PortfolioCoin",
      id: string,
      amount: number,
      coinId: string,
    } | null > | null,
    followers?: Array< string | null > | null,
    following?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    watchlist?: Array< string | null > | null,
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
    displayName?: string | null,
    email: string,
    networth: number,
    image?: string | null,
    trades?:  Array< {
      __typename: "Trade",
      id: string,
      coinId: string,
      amount: number,
      price: number,
      date: string,
    } | null > | null,
    portfolio?:  Array< {
      __typename: "PortfolioCoin",
      id: string,
      amount: number,
      coinId: string,
    } | null > | null,
    followers?: Array< string | null > | null,
    following?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    watchlist?: Array< string | null > | null,
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
    displayName?: string | null,
    email: string,
    networth: number,
    image?: string | null,
    trades?:  Array< {
      __typename: "Trade",
      id: string,
      coinId: string,
      amount: number,
      price: number,
      date: string,
    } | null > | null,
    portfolio?:  Array< {
      __typename: "PortfolioCoin",
      id: string,
      amount: number,
      coinId: string,
    } | null > | null,
    followers?: Array< string | null > | null,
    following?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    watchlist?: Array< string | null > | null,
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
  } | null,
};