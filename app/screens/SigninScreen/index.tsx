import { StyleSheet, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import React, { useState } from 'react';
import { ElementView, Text, RoundedButton } from '../../components/Themed';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import SocialLoginButtons from '../../components/atoms/buttons/SocialLoginButtons';
import { Auth } from 'aws-amplify';
import LabeledInput from '../../components/atoms/inputs/LabeledInput';
import CustomButton from '../../components/atoms/buttons/CustomButton';

export default function SigninScreen() {

  const navigation = useNavigation<NavigationProp<ReactNavigation.RootParamList>>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function hasWhitespace(value: string): boolean {
    return /\s/.test(value);
  }

  function simpleValidation(email: string, password: string): boolean {
    if (password.length < 8) {
      throw new Error('Password is at least 8 characters in length.');
    }
    if (email.length < 12 || hasWhitespace(email)) {
      throw new Error('Invalid email!');
    }
    return true;
  }

  const onPressSignin = async (): Promise<void> => {
    try {
      simpleValidation(email, password);
      await Auth.signIn(email, password);
    } catch(error: any) {
      if (error.message) {
        Alert.alert(error.message);
      } else {
        Alert.alert(error.toString());
      }
    }
  }

  const onPressSignup = (): void => {
    navigation.navigate('SignupScreen');
  }

  const onPressConfirmCode = (): void => {
    navigation.navigate('ConfirmCode');
  }

  const onPressForgotPass = async (): Promise<void> => {
    navigation.navigate('ForgotPassword');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ElementView style={styles.root}>
        <Text style={styles.title} darkColor=''>Sign in to an existing account</Text>
        <ElementView style={styles.form}>
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
          <RoundedButton onPress={onPressSignin}>
            Sign in
          </RoundedButton>
          <SocialLoginButtons apple google />

          <CustomButton
            onPress={onPressForgotPass}
            buttonStyles={[styles.button, { alignSelf: 'center' }]}
            textStyles={styles.buttonText}
          >
            Forgot Password?
          </CustomButton>

          <ElementView style={styles.row}>
            <Text style={styles.label}>Don't have an account?</Text>
            <CustomButton
              onPress={onPressSignup}
              buttonStyles={styles.button}
              textStyles={styles.buttonText}
              icon='angle-right'
              iconSize={25}
              iconColor={styles.buttonText.color}
            >
              Sign up
            </CustomButton>
          </ElementView>

          <ElementView style={styles.row}>
            <Text style={styles.label}>Need to confirm code?</Text>
            <CustomButton
              onPress={onPressConfirmCode}
              buttonStyles={styles.button}
              textStyles={styles.buttonText}
              icon='angle-right'
              iconSize={25}
              iconColor={styles.buttonText.color}
            >
              Enter code
            </CustomButton>
          </ElementView>

        </ElementView>
      </ElementView>
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
    marginTop: 25,
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