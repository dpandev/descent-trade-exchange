export type ListUsersProfilesQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      displayName: string,
      email: string,
      networth: number,
      image: string,
      trades?:  {
        __typename: "ModelTradeConnection",
        nextToken?: string | null,
      } | null,
      portfolio?:  {
        __typename: "ModelPortfolioCoinConnection",
        nextToken?: string | null,
      } | null,
      followers?: Array< string > | null,
      following?: Array< string > | null,
      createdAt: string,
      updatedAt: string,
      watchlist?: Array< string > | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};