/* tslint:disable */
/* eslint-disable */

export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      displayName
      networth
      image
      trades {
        id
        coinId
        amount
        price
        date
      }
      portfolio {
        id
        amount
        coinId
      }
      followers
      following
      createdAt
      updatedAt
      watchlist
    }
  }
`;