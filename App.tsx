import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import useColorScheme from './app/hooks/useColorScheme';
import Navigation from './app/navigation';

export default function App() {

  const colorScheme = useColorScheme();

  return (
    <>
      <Navigation colorScheme={colorScheme} />
      <StatusBar style='auto' />
    </>
  );
}
