import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { RootTabScreenProps, RootTabParamList } from "../types";
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import TabOneScreen from '../screens/tabs/TabOneScreen';
import TabTwoScreen from '../screens/tabs/TabTwoScreen';
import TabThreeScreen from '../screens/tabs/TabThreeScreen';
import TabFourScreen from '../screens/tabs/TabFourScreen';

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator(): React.JSX.Element {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabThree"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme].primary,
          height: '12%',
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
        headerStyle: { backgroundColor: Colors[colorScheme].primary },
        headerTitleAlign: 'center',
        headerShown: false,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'News',
          tabBarIcon: ({ color }) => <TabBarIcon name="newspaper" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Portfolio',
          tabBarIcon: ({ color }) => <TabBarIcon name="wallet" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabThreeScreen}
        options={{
          title: 'Markets',
          tabBarIcon: ({ color }) => <TabBarIcon name="stats-chart" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="TabFour"
        component={TabFourScreen}
        options={{
          title: 'Trades',
          tabBarIcon: ({ color }) => <TabBarIcon name="file-tray-full" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}