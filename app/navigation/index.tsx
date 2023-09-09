import React from 'react'
import { DefaultTheme, NavigationContainer } from '@react-navigation/native'
import LinkingConfig from './LinkingConfig'
import { ColorSchemeName } from 'react-native';
import BottomTabNavigator from './BottomTabNavigator'

export default function index({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfig}
      theme={DefaultTheme}
    >
      <BottomTabNavigator />
    </NavigationContainer>
  )
}