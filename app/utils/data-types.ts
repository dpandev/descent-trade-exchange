export type Coin = {
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

export type Trade = {
  id: string,
  coinId: string,
  amount: number,
  price: number,
  date: string,
  image: string,
};

export type PortfolioCoin = {
  id: string,
  amount: number,
  coinId: string,
};

export type User = {
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
};