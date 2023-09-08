import { StatusBar } from 'expo-status-bar';
import Navigation from './app/navigation';
import useColorScheme from './app/hooks/useColorScheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './app/hooks/useCachedResources';

export default function App() {

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    );
  }
}