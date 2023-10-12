import { Keyboard, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { ElementView, LabelledInputField, LabelledInputFieldProps, Text, ThemedButton } from '../../components/Themed';
import LoadingScreenModal from './LoadingScreenModal';

interface DialogInputModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  action: () => void;
  label: LabelledInputFieldProps ;
  title?: string;
  statement?: string;
}

export default function DialogInputModal({ 
  visible, 
  setVisible, 
  isLoading,
  action,
  label, 
  title, 
  statement,
}: DialogInputModalProps) {
  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(!visible)}
    >
      <ElementView style={styles.centeredView}>
        <ElementView style={styles.root}>
          <ElementView style={styles.titleBar}>
            <Text style={styles.title}>{title || ''}</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={() => setVisible(!visible)}>
              <FontAwesome name="close" size={28} color="white" />
            </TouchableOpacity>
          </ElementView>
          {statement && 
            <Text style={styles.statement}>{statement}</Text>
          }
          <ElementView style={styles.input}>
            <LabelledInputField 
              value={label.value}
              setValue={label.setValue}
              onSubmitEditing={Keyboard.dismiss}
              label={label.label}
              labelStyles={{ color: styles.inputContainer.color }}
              placeholder={label.placeholder}
              placeholderTextColor={styles.inputContainer.color}
              componentStyles={styles.inputContainer}
            />
          </ElementView>
          <ElementView style={styles.bottomBar}>
            <ThemedButton onPress={action} buttonStyles={styles.submitBtn}>
              <Text style={styles.submitBtnText}>Enter</Text>
            </ThemedButton>
          </ElementView>
        </ElementView>
      </ElementView>
      {isLoading &&
        <LoadingScreenModal
          visible={isLoading}
        />
      }
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    padding: 4,
  },
  title: {
    flex: 9,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    borderRadius: 6,
    backgroundColor: '#CE1A20',
  },
  root: {
    minWidth: 325,
    backgroundColor: '#772ceb',
    borderRadius: 8,
    padding: 6,
  },
  statement: {
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 5,
    fontSize: 15,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 4,
  },
  inputContainer: {
    borderBottomWidth: 0,
    marginVertical: 5,
    color: 'gray',
  },
  submitBtn: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  submitBtnText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  bottomBar: {
    alignItems: 'center',
  },
});