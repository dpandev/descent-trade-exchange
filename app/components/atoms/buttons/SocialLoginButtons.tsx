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

  return (
    <>
      <RoundedButton onPress={onSignInApple}>
        Continue with Apple
      </RoundedButton>
      <RoundedButton onPress={onSignInGoogle}>
        Continue with Google
      </RoundedButton>
    </>
  );
}
