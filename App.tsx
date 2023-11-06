import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import useColorScheme from './app/hooks/useColorScheme';
import Navigation from './app/navigation';
import * as WebBrowser from 'expo-web-browser';
import { Amplify } from 'aws-amplify';
import awsExports from './src/aws-exports.js';
import { Linking, Platform } from 'react-native';
import useCachedResources from './app/hooks/useCachedResources';

Amplify.configure(awsExports);

const productionRedirectSignIn = process.env.EXPO_PUBLIC_PRODUCTION_REDIRECT_SIGNIN;
const productionRedirectSignOut = process.env.EXPO_PUBLIC_PRODUCTION_REDIRECT_SIGNOUT;
const localRedirectSignIn = process.env.EXPO_PUBLIC_LOCAL_REDIRECT_SIGNOUT;
const localRedirectSignOut = process.env.EXPO_PUBLIC_LOCAL_REDIRECT_SIGNOUT;

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

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <Navigation colorScheme={colorScheme} />
        <StatusBar style='auto' />
      </>
    );
  }
}
