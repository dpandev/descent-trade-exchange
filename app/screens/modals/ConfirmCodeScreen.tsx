import { Alert, Keyboard, Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RoundedButton, ElementView, LabelledInputField, KeyboardAvoidingView, Text } from '../../components/Themed';
import { RootStackParamList } from '../../types';
import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useAuthContext } from '../../utils/AuthContext';
import LoadingScreenModal from '../../components/molecules/LoadingScreenModal';

export default function ConfirmCodeScreen({
  navigation
}: NativeStackScreenProps<RootStackParamList>) {

  const [username, setUsername] = useState<string>('');
  const [code, setCode] = useState<string>('');

  const onPressConfirm = async (): Promise<void> => {
    try {
      await Auth.confirmSignUp(username, code);

      // case: if user completes valid signup, but loses token returned and then confirms account, user needs to sign in manually
      Alert.alert('You have successfully confirmed your account.');
      navigation.goBack();
    } catch(error: any) {
      console.log('confirmCode:', error);
      if (error.message) {
        Alert.alert(error.message);
      } else {
        Alert.alert(error.toString());
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.root}
      >
        <ElementView style={styles.root}>
          <Text>Check your email for the confirm code</Text>
          <ElementView style={styles.form}>
            <LabelledInputField 
              value={username}
              setValue={setUsername}
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
            <LabelledInputField 
              value={code}
              setValue={setCode}
              onSubmitEditing={Keyboard.dismiss}
              label={'Confirmation Code'}
              labelStyles={styles.label}
              placeholder={'type code here...'}
              placeholderTextColor={styles.inputContainer.borderBottomColor}
              textContentType={'username'}
              keyboardAppearance={'dark'}
              componentStyles={styles.inputContainer}
              inputStyles={{ color: 'white' }}
              selectionColor={styles.label.color}
            />
            <RoundedButton onPress={onPressConfirm}>
              Confirm Code
            </RoundedButton>
          </ElementView>
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
  },
  label: {
    color: '#772ceb',
    fontSize: 28,
    marginBottom: 25,
    letterSpacing: 0.50,
  },
});
