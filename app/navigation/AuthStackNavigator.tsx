import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ConfirmCode from '../screens/modals/ConfirmCodeScreen';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import ForgotPassword from '../screens/modals/ForgotPasswordModal';

const AStack = createNativeStackNavigator();

export default function AuthStackNavigator() {
  const colorScheme = useColorScheme();

  return (
    <AStack.Navigator screenOptions={{ headerShown: false }}>
      <AStack.Screen
        name="WelcomeScreen" 
        component={WelcomeScreen} 
        options={{ title: 'Sign in' } }
      />
      <AStack.Screen 
        name="SignupScreen" 
        component={SignupScreen} 
        options={{ title: 'Sign in' } }
      />
      <AStack.Screen 
        name="SigninScreen" 
        component={SigninScreen} 
        options={{ title: 'Sign up' } }
      />
      <AStack.Screen 
        name="ConfirmCode" 
        component={ConfirmCode} 
        options={{ 
          headerStyle: { backgroundColor: Colors[colorScheme].secondary },
          headerTintColor: 'white', 
          headerTitleStyle: { fontWeight: 'bold' },   
          presentation: 'modal', 
          headerTitle: 'Confirm your account',
          title: 'Confirm your account',
          headerShown: true,
        }}
      />
      <AStack.Screen 
        name="ForgotPassword" 
        component={ForgotPassword} 
        options={{ 
          headerStyle: { backgroundColor: Colors[colorScheme].secondary },
          headerTintColor: 'white', 
          headerTitleStyle: { fontWeight: 'bold' },   
          presentation: 'modal', 
          headerTitle: 'Account Recovery',
          title: 'Forgot Password',
          headerShown: true,
        }}
      />
    </AStack.Navigator>
  );
}