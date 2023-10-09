import { StyleSheet, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import React, { useState } from 'react';
import { ElementView, Text, RoundedButton, LabelledInputField, TextButton } from '../../components/Themed';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import SocialLoginButtons from '../../components/atoms/buttons/SocialLoginButtons';
import { Auth } from 'aws-amplify';

export default function SigninScreen() {

  const navigation = useNavigation<NavigationProp<ReactNavigation.RootParamList>>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onPressSignin = async (): Promise<void> => {
    try {
      await Auth.signIn(email, password);
    } catch(error: any) {
      console.log(error);
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ElementView style={styles.root}>
        <Text style={styles.title} darkColor=''>Sign in to an existing account</Text>
        <ElementView style={styles.form}>
          <LabelledInputField 
            value={email}
            setValue={setEmail}
            onSubmitEditing={Keyboard.dismiss}
            label={'E-Mail'}
            placeholder={'yourname@example.com'}
            textContentType={'emailAddress'}
            inputStyles={{ color: 'white', fontSize: 18 }}
          />
          <LabelledInputField 
            value={password}
            setValue={setPassword}
            onSubmitEditing={Keyboard.dismiss}
            label={'Password'}
            secureTextEntry={true}
            placeholder={'yourpassword'}
            textContentType={'password'}
            inputStyles={{ color: 'white', fontSize: 18 }}
          />
          <RoundedButton 
            onPress={onPressSignin}
            buttonStyles={styles.signinBtn}
          >
            Sign in
          </RoundedButton>
          <SocialLoginButtons />
          <Text style={styles.signupLabel}>Don't have an account?</Text>
          <TextButton
            onPress={onPressSignup}
            buttonStyles={styles.signupBtn}
            textStyles={styles.signupBtnText}
            icon={'angle-right'}
            iconSize={25}
          >
            Sign up
          </TextButton>

          <Text style={{ ...styles.signupLabel, marginTop: 25 }}>Have a confirm code?</Text>
          <TextButton
            onPress={onPressConfirmCode}
            buttonStyles={styles.signupBtn}
            textStyles={styles.signupBtnText}
            icon={'angle-right'}
            iconSize={25}
          >
            Enter confirm code
          </TextButton>
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
    width: '100%',
    height: '100%',
    padding: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 325,
    justifyContent: 'center',
  },
  signinBtn: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 200,
  },
  signupLabel: {
    fontSize: 16,
    marginTop: 'auto',
  },
  signupBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  signupBtnText: {
    fontSize: 16,
    fontWeight: 'normal',
    marginRight: 10,
    marginTop: 2,
  },
});