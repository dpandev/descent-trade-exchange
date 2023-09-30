import { StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { View, ElementView, Text, RoundedButton, LabelledInputField, ThemedButton, TextButton } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import SocialLoginButtons from '../../components/atoms/buttons/SocialLoginButtons';

export default function SigninScreen() {

  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onPressSignin = () => {
    console.log("signin pressed");
  }

  const onPressSignup = () => {
    navigation.navigate('SignupScreen');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.root}>
          <Text style={styles.title} darkColor=''>Sign in to an existing account</Text>
          <ElementView style={styles.form}>
            <LabelledInputField 
              value={email}
              setValue={setEmail}
              onSubmitEditing={Keyboard.dismiss}
              label={'E-Mail'}
              placeholder={'yourname@example.com'}
              textContentType={'emailAddress'}
            />
            <LabelledInputField 
              value={password}
              setValue={setPassword}
              onSubmitEditing={Keyboard.dismiss}
              label={'Password'}
              secureTextEntry={true}
              placeholder={'yourpassword'}
              textContentType={'password'}
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
          </ElementView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  signinBtn: {
    alignSelf: 'center',
    width: '50%',
  },
  signupLabel: {
    fontSize: 16,
    marginTop: 50,
  },
  signupBtn: {
    flexDirection: 'row',
    // backgroundColor: 'transparent',
    // borderWidth: 0,
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