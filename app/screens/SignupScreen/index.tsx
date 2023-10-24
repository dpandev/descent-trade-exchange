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
  KeyboardAvoidingView 
} from '../../components/Themed';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import SocialLoginButtons from '../../components/atoms/buttons/SocialLoginButtons';
import { Auth } from 'aws-amplify';
import LoadingScreenModal from '../../components/molecules/LoadingScreenModal';
import LabeledInput from '../../components/atoms/inputs/LabeledInput';
import CustomButton from '../../components/atoms/buttons/CustomButton';

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

  function hasWhitespace(value: string): boolean {
    return /\s/.test(value);
  }

  function validateUserEmail(email: string, username: string): boolean {
    if (username.length > 12 || hasWhitespace(username)) {
      throw new Error('Username must be less than 13 characters and cannot contain spaces!');
    }
    if (username.length < 4) {
      throw new Error('Username must at least 4 characters and cannot contain spaces!');
    }
    if (hasWhitespace(email)) {
      throw new Error('Email must not contain any spaces!');
    }
    return true;
  }

  function simplePasswordValidation(pass: string, confirmPass: string): boolean {
    if (pass !== confirmPass) {
      throw new Error('Passwords do no match! Please try again.');
    }
    if (pass.length < 8) {
      throw new Error('Password must be at least 8 characters in length.');
    }
    return true;
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
      validateUserEmail(email, username);
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
            <Text style={styles.title}>Create an account</Text>
            <ElementView style={styles.form}>

              <LabeledInput 
                value={username}
                onChangeText={setUsername}
                onSubmitEditing={Keyboard.dismiss}
                label={'Username'}
                placeholder={'your-username'}
                textContentType={'username'}
              />

              <LabeledInput 
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={Keyboard.dismiss}
                label={'E-Mail'}
                placeholder={'yourname@example.com'}
                textContentType={'emailAddress'}
              />

              <LabeledInput 
                value={password}
                onChangeText={setPassword}
                onSubmitEditing={Keyboard.dismiss}
                label={'Password'}
                secureTextEntry={true}
                placeholder={'yourpassword'}
                textContentType={'password'}
              />

              <LabeledInput 
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                onSubmitEditing={Keyboard.dismiss}
                label='Confirm Password'
                secureTextEntry={true}
                placeholder={'confirmpassword'}
                textContentType={'password'}
                keyboardAppearance={'dark'}
              />

              <RoundedButton onPress={onPressSignup}>
                Sign up
              </RoundedButton>

              <SocialLoginButtons apple google />

              <ElementView style={styles.row}>
                <Text style={styles.label}>Already have an account?</Text>
                <CustomButton
                  onPress={onPressSignin}
                  buttonStyles={styles.button}
                  textStyles={styles.buttonText}
                  icon='angle-right'
                  iconSize={25}
                  iconColor={styles.buttonText.color}
                >
                  Sign in
                </CustomButton>
              </ElementView>
              
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
    padding: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 15,
    width: '100%',
    maxWidth: 400,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-around',
  },
  label: {
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    paddingVertical: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#71459B',
    marginRight: 10,
    marginTop: 2,
  },
});