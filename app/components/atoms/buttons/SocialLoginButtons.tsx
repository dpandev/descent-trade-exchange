import { StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import { RoundedButton } from '../../Themed';

export default function SocialLoginButtons() {

  const onSignInApple = async () => {
    await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Apple });
  }

  const onSignInGoogle = async () => {
    await Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Google });
  }

  const onSignInFacebook = () => {
    Auth.federatedSignIn({ provider: CognitoHostedUIIdentityProvider.Facebook });
  }

  return (
    <>
      {/* <RoundedButton onPress={onSignInApple}>
        Continue with Apple
      </RoundedButton> */}

      <RoundedButton onPress={onSignInGoogle}>
        Continue with Google
      </RoundedButton>

      {/* <RoundedButton onPress={onSignInFacebook}>
        Continue with Facebook
      </RoundedButton> */}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    width: '75%',
    maxWidth: 400,
    padding: 12,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: '#6338F1',
    fontWeight: 'bold',
    letterSpacing: 0.35,
    fontSize: 18,
    textAlign: 'center',
  },
});