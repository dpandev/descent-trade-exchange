import { Coin } from "../../src/API";

export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

// export function typeGuard(value: any): value is TValue {
//   return typeof value === typeof 
// }

interface A {
  a: number
}
interface B {
  b: string
}

function isTypeA<TA extends A, TB extends B>(val: TA | TB): val is TA {
  return typeof (val as any).a === 'number'
}

// export function isTypeCoin(toBeDetermined: any): toBeDetermined is Coin {
//   return toBeDetermined? Coin;
// }

// export interface ValidateFunction<T> {
//   _t?: T; //  avoid unused parameter lint warnings
// }

// export function makeValidator<T>(schema: object): ValidateFunction<T> {
//   return 
// }

// type SuccessResponse = {success: true, payload: Payload}
// type FailureResponse = {success: false, error: Error}
// type ApiResponse = SuccessResponse | FailureResponse

// export const handleApiResponse = () => {
//   //
// }

// const fetch = async () => {
//   try {
//     const res = await axios.get(API_ENDPOINT)
//     return handleApiResponse({success: true, payload: res.data})
//   } catch(error) {
//     handleApiResponse({success: false, error: error instanceof Error ? error : new Error('unknown error')})
//   }
// }
