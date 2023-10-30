import React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import LinkingConfig from './LinkingConfig';
import { ColorSchemeName } from 'react-native';
import RootStackNavigator from './RootStackNavigator';
import { AuthProvider } from '../hooks/AuthContext';

export default function index({ colorScheme }: { colorScheme: ColorSchemeName }) {

  return (
    <NavigationContainer
      linking={LinkingConfig}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <AuthProvider>
        <RootStackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}