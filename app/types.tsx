import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GraphQLResult } from "@aws-amplify/api";
import { Coin, PortfolioCoin } from '../src/API';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  NotFound: undefined;
  SignupScreen: undefined;
  SigninScreen: undefined;
  CoinDetails: { id: string };
  CoinExchange: { isBuy: boolean, coin: Coin, portfolioCoin: PortfolioCoin | undefined };
  Settings: undefined;
  Store: undefined;
  Modal: undefined;
  ConfirmCode: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: { id: number } | undefined;
  TabThree: undefined;
  TabFour: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

export type AmplifyGraphQLResult<T extends {}> = Promise<GraphQLResult<T>>;
