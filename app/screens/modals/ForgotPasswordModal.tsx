import { Alert, Keyboard, Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RoundedButton, ElementView, LabelledInputField, KeyboardAvoidingView, Text } from '../../components/Themed';
import { RootStackParamList } from '../../types';
import { useState } from 'react';
import { Auth } from 'aws-amplify';
import LoadingScreenModal from '../../components/molecules/LoadingScreenModal';

export default function ForgotPasswordModal({
  navigation
}: NativeStackScreenProps<RootStackParamList>) {

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function simplePasswordValidation(pass: string, confirmPass: string) {
    if (pass !== confirmPass) {
      throw new Error('Passwords do no match! Please try again.');
    }
    if (pass.length < 8) {
      throw new Error('Password must be at least 8 characters in length.');
    }
  }

  const onPressSubmit = async (): Promise<void> => {
    Keyboard.dismiss();
    setIsLoading(true);
    if (!submitted) {
      try {
        if (email.length < 5) {
          throw new Error('Enter your full email address to continue.');
        }
        await Auth.forgotPassword(email);
        Alert.alert('Your password reset code has been sent to your email.')
        setSubmitted(true);
      } catch(error: any) {
        if (error.message) {
          Alert.alert(error.message);
        } else {
          Alert.alert(error.toString());
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        simplePasswordValidation(password, confirmPassword);
        const response = await Auth.forgotPasswordSubmit(email, code, password);
        if (response === 'SUCCESS') {
          Alert.alert('Account successfully recovered. Please sign in with your new password.');
          navigation.navigate('SigninScreen');
        }
      } catch (error: any) {
        if (error.message) {
          Alert.alert(error.message);
        } else {
          Alert.alert(error.toString());
        }
      } finally {
        setIsLoading(false);
      }
    }
  }

  if (submitted) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.root}
        >
          <ElementView style={styles.root}>
            <Text>Enter your new password</Text>
            <ElementView style={styles.form}>
              <LabelledInputField 
                value={password}
                setValue={setPassword}
                onSubmitEditing={Keyboard.dismiss}
                label={'Password'}
                labelStyles={styles.label}
                placeholder={'password'}
                placeholderTextColor={styles.inputContainer.borderBottomColor}
                textContentType={'password'}
                componentStyles={styles.inputContainer}
                inputStyles={{ color: 'white' }}
                selectionColor={styles.label.color}
              />
              <LabelledInputField 
                value={confirmPassword}
                setValue={setConfirmPassword}
                onSubmitEditing={Keyboard.dismiss}
                label={'Confirm Password'}
                labelStyles={styles.label}
                placeholder={'password'}
                placeholderTextColor={styles.inputContainer.borderBottomColor}
                textContentType={'password'}
                componentStyles={styles.inputContainer}
                inputStyles={{ color: 'white' }}
                selectionColor={styles.label.color}
              />
              <LabelledInputField 
                value={code}
                setValue={setCode}
                onSubmitEditing={Keyboard.dismiss}
                label={'Confirm Code'}
                labelStyles={styles.label}
                placeholder={'012345'}
                placeholderTextColor={styles.inputContainer.borderBottomColor}
                componentStyles={styles.inputContainer}
                inputStyles={{ color: 'white' }}
                selectionColor={styles.label.color}
              />
              <RoundedButton onPress={onPressSubmit}>
                Submit
              </RoundedButton>
            </ElementView>
            {isLoading &&
              <LoadingScreenModal visible={isLoading} title={'Submitting...'} />
            }
          </ElementView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.root}
      >
        <ElementView style={styles.root}>
          <Text>Enter your email to reset your password</Text>
          <ElementView style={styles.form}>
            <LabelledInputField 
              value={email}
              setValue={setEmail}
              onSubmitEditing={Keyboard.dismiss}
              label={'Email'}
              labelStyles={styles.label}
              placeholder={'yourname@example.com'}
              placeholderTextColor={styles.inputContainer.borderBottomColor}
              textContentType={'emailAddress'}
              keyboardAppearance={'dark'}
              componentStyles={styles.inputContainer}
              inputStyles={{ color: 'white' }}
              selectionColor={styles.label.color}
            />
            <RoundedButton onPress={onPressSubmit}>
              Submit
            </RoundedButton>
          </ElementView>
          {isLoading &&
            <LoadingScreenModal visible={isLoading} title={'Submitting...'} />
          }
        </ElementView>
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
    maxWidth: 300,
  },
  inputContainer: {
    borderBottomColor: '#D1D1D1',
    color: 'white',
  },
  label: {
    color: '#772ceb',
    fontSize: 28,
    marginBottom: 25,
    letterSpacing: 0.50,
  },
});
