import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import useColorScheme from './app/hooks/useColorScheme';
import Navigation from './app/navigation';
import * as WebBrowser from 'expo-web-browser';

import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports';
import { Linking, Platform } from 'react-native';
import useCachedResources from './app/hooks/useCachedResources';

Amplify.configure(awsExports);

// const [
//   productionRedirectSignIn,
//   localRedirectSignIn,
// ] = 'exp://10.0.0.246:8081/';

// const [
//   productionRedirectSignOut,
//   localRedirectSignOut,
// ] = 'exp://10.0.0.246:8081/';

const productionRedirectSignIn = 'exp://10.0.0.246:8081/';
const productionRedirectSignOut = 'exp://10.0.0.246:8081/';
const localRedirectSignIn = 'exp://10.0.0.246:8081/';
const localRedirectSignOut = 'exp://10.0.0.246:8081/';

async function urlOpener(url: string, redirectUrl: string) {
  const res = await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl
  );

  if (res.type === 'success' && Platform.OS === 'ios') {
    WebBrowser.dismissBrowser();
    return Linking.openURL(res.url);
  }
}

Amplify.configure({
  ...awsExports,
  oauth: {
    ...awsExports.oauth,
    urlOpener,
    redirectSignIn: __DEV__ ? localRedirectSignIn : productionRedirectSignIn,
    redirectSignOut: __DEV__ ? localRedirectSignOut : productionRedirectSignOut,
  },
});

export default function App() {

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  if (__DEV__) console.log('running dev...')

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
