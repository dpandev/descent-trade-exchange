import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { AlternateThemedButton, RoundedButton, ThemedButton, Text } from '../../Themed';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import React from 'react';

type SocialProviders = {
  email?: boolean;
  apple?: boolean;
  google?: boolean;
}

const SocialLoginButtons = (props: SocialProviders): React.JSX.Element => {
  const navigation = useNavigation();

  const onSignInEmail = (): void => {
    navigation.navigate('SigninScreen');
  }

  const onSignInApple = async (): Promise<void> => {
    await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Apple });
  }

  const onSignInGoogle = async (): Promise<void> => {
    await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
  }

  return (
    <>
      {props.email &&
        <AlternateThemedButton 
          onPress={onSignInEmail}
          icon={{ name: 'envelope', size: 25 }}
        >
          <Text style={styles.text}>Continue with Email</Text>
        </AlternateThemedButton>
      }
      {props.apple &&
        <AlternateThemedButton 
          onPress={onSignInApple}
          icon={{ name: 'apple', size: 25 }}
        >
          <Text style={styles.text}>Continue with Apple</Text>
        </AlternateThemedButton>
      }
      {props.google &&
        <AlternateThemedButton 
          onPress={onSignInGoogle}
          icon={{ name: 'google', size: 25 }}
        >
          <Text style={styles.text}>Continue with Google</Text>
        </AlternateThemedButton>
      }
    </>
  );
}

export default SocialLoginButtons;

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    letterSpacing: 0.45,
    fontSize: 16,
  },
});
