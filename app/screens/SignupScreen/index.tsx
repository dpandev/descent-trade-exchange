import { StyleSheet, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';
import { View, ElementView, Text, RoundedButton, ScrollView, LabelledInputField, ThemedButton } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import SocialLoginButtons from '../../components/atoms/buttons/SocialLoginButtons';

export default function SignupScreen() {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const navigation = useNavigation();

  const onPressSignin = () => {
    navigation.navigate('SigninScreen');
  }

  const onPressSignup = () => {
    console.log('sign up pressed');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{marginTop: 50}}>
          <View style={styles.root}>
            <Text style={[styles.title, styles.lightColor]}>Create an account</Text>
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
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    //
  },
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
    color: '#6338F1',
  },
  lightColor: {
    color: '#D1D1D1',
  },
  signupBtn: {
    alignSelf: 'center',
    padding: 30,
    maxWidth: 275,
  },
  signinLabel: {
    fontSize: 16,
    // marginTop: 50,
    // marginBottom: 50,
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