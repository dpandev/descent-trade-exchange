import { Alert, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { LabelledInputFieldProps } from '../../components/Themed';
import DialogInputModal from '../../components/molecules/DialogInputModal';
import { useAuthContext } from '../../utils/AuthContext';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { AmplifyGraphQLResult } from '../../types';
import { deleteUser } from '../../../src/graphql/mutations';
import { DeleteUserMutation } from '../../../src/API';

interface ModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteAccount({ visible, setVisible }: ModalProps) {
  const [confirm, setConfirm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuthContext();

  const labelProps: LabelledInputFieldProps = {
    value: confirm,
    setValue: setConfirm,
    onSubmitEditing: Keyboard.dismiss,
    placeholder: 'confirm',
  }

  const validateUserEntry = (): void => {
    if (confirm !== 'confirm') {
      throw new Error('Invalid input. Please verify your spelling.');
    }
  }

  const deleteUserData = async (): Promise<{ data: DeleteUserMutation }> => {
    const response = await API.graphql<AmplifyGraphQLResult<typeof deleteUser>>({
      ...graphqlOperation(
        deleteUser, 
        { input: { id: user?.id }}
      ),
    }) as { data: DeleteUserMutation };
    return response;
  }

  const deleteAccount = async (): Promise<void> => {
    if (!user) return;
    setIsLoading(true);
    try{
      validateUserEntry();
      deleteUserData();
      const deleteUserFromCognito = await Auth.deleteUser();
      console.log(deleteUserFromCognito);
      Alert.alert('Your account has been deleted.');
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
    <>
      <DialogInputModal 
        visible={visible}
        setVisible={setVisible}
        isLoading={isLoading}
        action={deleteAccount}
        title={'Delete your account?'}
        label={labelProps}
        statement={"Careful! This action cannot be undone! Type 'confirm' in the box below to proceed with account termination."}
      />
    </>
  );
}
