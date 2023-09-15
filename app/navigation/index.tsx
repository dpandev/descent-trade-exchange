import React, { ReactNode, useState } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import LinkingConfig from './LinkingConfig';
import { ColorSchemeName } from 'react-native';
// import BottomTabNavigator from './BottomTabNavigator';
import RootStackNavigator from './RootStackNavigator';
import { AuthProvider } from '../utils/AuthContext';

export default function index({ colorScheme }: { colorScheme: ColorSchemeName }) {

  return (
    <NavigationContainer
      linking={LinkingConfig}
      theme={DefaultTheme}
    >
      <AuthProvider>
        {/* <BottomTabNavigator /> */}
        <RootStackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}