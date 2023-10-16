import { 
  StyleSheet, 
  Platform, 
  Keyboard, 
  TouchableWithoutFeedback, 
  Alert
} from 'react-native';
import React, { useState } from 'react';
import { 
  ElementView, 
  Text, 
  RoundedButton, 
  ScrollView, 
  LabelledInputField, 
  ThemedButton,
  KeyboardAvoidingView 
} from '../../components/Themed';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import SocialLoginButtons from '../../components/atoms/buttons/SocialLoginButtons';
import { Auth } from 'aws-amplify';
import LoadingScreenModal from '../../components/molecules/LoadingScreenModal';

type SignupParams = {
  username: string;
  password: string;
  attributes: { email: string, 'custom:displayName': string };
  autoSignIn: { enabled: true };
}

export default function SignupScreen() {

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<ReactNavigation.RootParamList>>();

  const onPressSignin = (): void => {
    navigation.navigate('SigninScreen');
  }

  function simplePasswordValidation(pass: string, confirmPass: string) {
    if (pass !== confirmPass) {
      throw new Error('Passwords do no match! Please try again.');
    }
    if (pass.length < 8) {
      throw new Error('Password must be at least 8 characters in length.');
    }
  }

  const onPressSignup = async (): Promise<void> => {
    setIsLoading(true);
    const userData: SignupParams = {
      username: email,
      password: password,
      attributes: {
        email: email,
        'custom:displayName': username,
      },
      autoSignIn: {
        enabled: true,
      },
    };

    try {
      simplePasswordValidation(password, confirmPassword);
      await Auth.signUp(userData);
      navigation.navigate('ConfirmCode');
    } catch(error: any) {
      if (error.message) {
        Alert.alert(error.message);
      } else {
        Alert.alert(error.toString());
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{marginTop: 50}}>
          <ElementView style={styles.root}>
            <Text style={[styles.title, styles.lightColor]}>Create an account</Text>
            <ElementView style={styles.form}>

              <LabelledInputField 
                value={username}
                setValue={setUsername}
                onSubmitEditing={Keyboard.dismiss}
                label={'Username'}
                labelStyles={styles.purpleColor}
                placeholder={'your-username'}
                placeholderTextColor={styles.lightColor.color}
                textContentType={'username'}
                keyboardAppearance={'dark'}
                componentStyles={styles.inputContainer}
                selectionColor={styles.purpleColor.color}
                inputStyles={{ color: 'white', fontSize: 18 }}
              />

              <LabelledInputField 
                value={email}
                setValue={setEmail}
                onSubmitEditing={Keyboard.dismiss}
                label={'E-Mail'}
                labelStyles={styles.purpleColor}
                placeholder={'yourname@example.com'}
                placeholderTextColor={styles.lightColor.color}
                textContentType={'emailAddress'}
                keyboardAppearance={'dark'}
                componentStyles={styles.inputContainer}
                selectionColor={styles.purpleColor.color}
                inputStyles={{ color: 'white', fontSize: 18 }}
              />

              <LabelledInputField 
                value={password}
                setValue={setPassword}
                onSubmitEditing={Keyboard.dismiss}
                label={'Password'}
                labelStyles={styles.purpleColor}
                secureTextEntry={true}
                placeholder={'yourpassword'}
                placeholderTextColor={styles.lightColor.color}
                textContentType={'password'}
                keyboardAppearance={'dark'}
                componentStyles={styles.inputContainer}
                selectionColor={styles.purpleColor.color}
                inputStyles={{ color: 'white', fontSize: 18 }}
              />

              <LabelledInputField 
                value={confirmPassword}
                setValue={setConfirmPassword}
                onSubmitEditing={Keyboard.dismiss}
                label='Confirm Password'
                labelStyles={styles.purpleColor}
                secureTextEntry={true}
                placeholder={'confirmpassword'}
                placeholderTextColor={styles.lightColor.color}
                textContentType={'password'}
                keyboardAppearance={'dark'}
                componentStyles={styles.inputContainer}
                selectionColor={styles.purpleColor.color}
                inputStyles={{ color: 'white', fontSize: 18 }}
              />

              <RoundedButton
                onPress={onPressSignup}
                buttonStyles={styles.signupBtn}
              >
                Sign up
              </RoundedButton>

              <SocialLoginButtons />

              <Text style={[styles.signinLabel, styles.lightColor]}>Already have an account?</Text>

              <ThemedButton
                onPress={onPressSignin}
                buttonStyles={styles.signinBtn}
                textStyles={styles.signinBtnText}
                icon='angle-right'
                iconSize={25}
              >
                Sign in
              </ThemedButton>
            </ElementView>
          </ElementView>
        </ScrollView>
        {isLoading &&
          <LoadingScreenModal visible={isLoading} title={'Logging you in...'} />
        }
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    padding: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    borderBottomColor: '#D1D1D1',
  },
  purpleColor: {
    color: '#772ceb',
  },
  lightColor: {
    color: '#D1D1D1',
  },
  signupBtn: {
    // alignSelf: 'center',
    // padding: 30,
    // maxWidth: 275,
    marginBottom: 'auto',
  },
  signinLabel: {
    fontSize: 16,
    marginTop: 'auto',
  },
  signinBtn: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  signinBtnText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#6338F1',
    marginRight: 10,
    marginTop: 2,
  },
});