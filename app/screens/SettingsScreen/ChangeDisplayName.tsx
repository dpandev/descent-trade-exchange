import { Alert, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { LabelledInputFieldProps } from '../../components/Themed';
import DialogInputModal from '../../components/molecules/DialogInputModal';
import { useAuthContext } from '../../hooks/AuthContext';
import { API, graphqlOperation } from 'aws-amplify';
import { AmplifyGraphQLResult } from '../../types';
import { updateUser } from '../../../src/graphql/mutations';
import { UpdateUserMutation } from '../../../src/API';

interface ModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ChangeDisplayName({ visible, setVisible }: ModalProps) {
  const [username, setUsername] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuthContext();

  const labelProps: LabelledInputFieldProps = {
    value: username,
    setValue: setUsername,
    onSubmitEditing: Keyboard.dismiss,
    placeholder: 'Enter a new username...',
  }

  const validateUserEntry = (): void => {//todo add more
    if (username.length < 3) {
      throw new Error('Username must be at least 3 characters in length!');
    }
    if (username.length > 16) {
      throw new Error('Username must not be longer than 16 characters!');
    }
  }

  const updateUsername = async (): Promise<void> => {
    setIsLoading(true);
    try {
      validateUserEntry();
      const response = await API.graphql<AmplifyGraphQLResult<typeof updateUser>>({
        ...graphqlOperation(
          updateUser, 
          { input: {
            id: user?.id,
            displayName: username,
          }}
        ),
      }) as { data: UpdateUserMutation };
      if (response.data.updateUser) {
        setVisible(false);
      }
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
        action={updateUsername}
        title={'Change Your Username'}
        label={labelProps}
      />
    </>
  );
}
