import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import React, { useContext, useEffect, useState } from 'react';

import BottomTabNavigator from './BottomTabNavigator';
import ModalScreen from '../screens/modals/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import CoinDetailsScreen from '../screens/CoinDetailsScreen';
import CoinExchangeScreen from '../screens/CoinExchangeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { AuthContext } from "../utils/AuthContext";

import { userInfo } from "../../assets/dummyData/userInfo";
import AuthStackNavigator from "./AuthStackNavigator";
import { Hub } from "aws-amplify";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const { userId, setUserId } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const colorScheme = useColorScheme();

  const fetchUserData = async (loginUser: string) => {//fetch user from db using id fron cognito
    try {
      // const response = await API.graphql(
      //   graphqlOperation(
      //     getUser,
      //     {id: loginUser }
      //   )
      // )
      // setUserId(response.data.getUser)
      setUserId(userInfo[0].id)
      setIsLoading(false)
      return
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      setIsLoading(true)
      if (event === 'signIn') {
        fetchUserData(data.signInUserSession.accessToken.payload.sub)
      }
    });
    console.log(userId)

    return unsubscribe;
  }, []);

  return (
    <>
    { userId.userId ? (
      <Stack.Navigator>
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ 
            headerStyle: { backgroundColor: Colors[colorScheme].secondary },
            headerTintColor: 'white', 
            headerTitleStyle: { fontWeight: 'bold'},   
            presentation: 'modal', 
          }}
        />
        <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="Modal" component={ModalScreen} />
          <Stack.Screen 
            name="CoinDetails" 
            component={CoinDetailsScreen} 
            options={{ 
              title: 'Details', 
              headerStyle: { backgroundColor: Colors[colorScheme].secondary },
              headerTintColor: 'white', 
              headerTitleStyle: { fontWeight: 'bold'},  
            }} 
          />
          <Stack.Screen 
            name="CoinExchange" 
            component={CoinExchangeScreen} 
            options={{ 
              title: 'Exchange', 
              headerStyle: { backgroundColor: Colors[colorScheme].secondary }, 
              headerTintColor: 'white', 
              headerTitleStyle: { fontWeight: 'bold'}, 
            }} 
          />
        </Stack.Group>
      </Stack.Navigator>
      ) : ( <AuthStackNavigator /> )
    }
    </>
  );
}