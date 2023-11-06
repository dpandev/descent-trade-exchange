import { Alert, Keyboard } from 'react-native';
import React, { useState } from 'react';
import DialogInputModal from '../../components/molecules/DialogInputModal';
import { useAuthContext } from '../../hooks/AuthContext';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { AmplifyGraphQLResult } from '../../types';
import { deleteUser } from '../../../src/graphql/mutations';
import { DeleteUserMutation } from '../../../src/API';
import { LabeledInputProps } from '../../components/atoms/inputs/LabeledInput';
import LoadingScreenModal from '../../components/molecules/LoadingScreenModal';

interface ModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteAccount = ({ visible, setVisible }: ModalProps) => {
  const [confirm, setConfirm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuthContext();

  const labelProps: LabeledInputProps = {
    value: confirm,
    onChangeText: setConfirm,
    onSubmitEditing: Keyboard.dismiss,
    placeholder: 'confirm',
    style: { color: 'black' },
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
    try{
      setIsLoading(true);
      validateUserEntry();
      deleteUserData();
      await Auth.deleteUser();
    } catch(error: any) {
      if (error.message) {
        Alert.alert(error.message);
      } else {
        Alert.alert(error.toString());
      }
    } finally {
      setIsLoading(false);
      Alert.alert('Your account has been deleted.');
    }
  }

  return (
    <>
      <DialogInputModal 
        visible={visible}
        setVisible={setVisible}
        action={deleteAccount}
        title={'Delete your account?'}
        label={labelProps}
        statement={"Careful! This action cannot be undone! Type 'confirm' in the box below to proceed with account termination."}
      />
      {isLoading &&
        <LoadingScreenModal
          visible={isLoading}
        />
      }
    </>
    
  );
}

export default DeleteAccount;
