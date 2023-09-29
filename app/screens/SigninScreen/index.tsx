import { StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { View, ElementView, Text, RoundedButton, LabelledInputField, ThemedButton } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import SocialLoginButtons from '../../components/atoms/buttons/SocialLoginButtons';

export default function SigninScreen() {

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          <Text style={[styles.title, styles.lightColor]}>Sign in to an existing account</Text>
          <ElementView style={styles.form}>
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
            />
            <RoundedButton 
              onPress={onPressSignin}
              textStyles={styles.lightColor}
              buttonStyles={styles.signinBtn}
            >
              Sign in
            </RoundedButton>
            <SocialLoginButtons />
            <Text style={[styles.signupLabel, styles.lightColor]}>Don't have an account?</Text>
            <ThemedButton
              onPress={onPressSignup}
              buttonStyles={styles.signupBtn}
              textStyles={styles.signupBtnText}
              icon={'angle-right'}
              iconSize={25}
            >
              Sign up
            </ThemedButton>
          </ElementView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
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
  inputContainer: {
    borderBottomColor: '#D1D1D1',
  },
  purpleColor: {
    color: '#6338F1',
  },
  lightColor: {
    color: '#D1D1D1',
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
    backgroundColor: 'rgba(0, 0, 0, 0)',
    borderWidth: 0,
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
    color: '#6338F1',
  },
})