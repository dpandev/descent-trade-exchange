import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import useColorScheme from './app/hooks/useColorScheme';
import Navigation from './app/navigation';
// import * as WebBrowser from 'expo-web-browser';

import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { Linking, Platform } from 'react-native';
import useCachedResources from './app/hooks/useCachedResources';

Amplify.configure(awsExports);

// async function urlOpener(url: string, redirectUrl: string) {
//   const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
//     url,
//     redirectUrl
//   );

//   if (type === 'success' && Platform.OS === 'ios') {
//     WebBrowser.dismissBrowser();
//     return Linking.openURL(newUrl);
//   }
// }

// Amplify.configure({
//   ...awsConfig,
//   oauth: {
//     ...awsConfig.oauth,
//     urlOpener,
//     redirectSignIn: __DEV__ ? localRedirectSignIn : productionRedirectSignIn,
//     redirectSignOut: __DEV__ ? localRedirectSignOut : productionRedirectSignOut,
//   },
// });

export default function App() {

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style='auto' />
      </>
    );
  }
}
