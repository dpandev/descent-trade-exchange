import { Alert, Keyboard, Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RoundedButton, ElementView, KeyboardAvoidingView, Text } from '../../components/Themed';
import { RootStackParamList } from '../../types';
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import LabeledInput from '../../components/atoms/inputs/LabeledInput';

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
            <LabeledInput
              value={username}
              onChangeText={setUsername}
              onSubmitEditing={Keyboard.dismiss}
              label={'Email'}
              placeholder={'yourname@example.com'}
              textContentType={'emailAddress'}
            />
            <LabeledInput
              value={code}
              onChangeText={setCode}
              onSubmitEditing={Keyboard.dismiss}
              label={'Confirmation Code'}
              placeholder={'type code here...'}
              textContentType={'username'}
            />
            <RoundedButton onPress={onPressConfirm}>
              Confirm Account
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
  form: {
    width: '100%',
    maxWidth: 300,
  },
});
