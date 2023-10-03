import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import useColorScheme from "../hooks/useColorScheme";
import Colors from "../constants/Colors";
import React, { useState } from 'react';

import BottomTabNavigator from './BottomTabNavigator';
import ModalScreen from '../screens/modals/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import CoinDetailsScreen from '../screens/CoinDetailsScreen';
import CoinExchangeScreen from '../screens/CoinExchangeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useAuthContext } from "../utils/AuthContext";
import AuthStackNavigator from "./AuthStackNavigator";
import PlayerDetailsScreen from "../screens/PlayerDetailsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  const user = useAuthContext();
  const colorScheme = useColorScheme();

  return (
    <>
    { user ? (
      <Stack.Navigator>
        <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
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
          <Stack.Screen 
            name="PlayerDetails" 
            component={PlayerDetailsScreen} 
            options={{ 
              title: 'Player Details', 
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