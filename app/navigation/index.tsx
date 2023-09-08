import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { ColorSchemeName } from 'react-native';
import LinkingConfig from './LinkingConfig';
import BottomTabNavigator from './BottomTabNavigator';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
      <NavigationContainer
        theme={DefaultTheme}
        linking={LinkingConfig}
      >
       <BottomTabNavigator />
      </NavigationContainer>
  );
}