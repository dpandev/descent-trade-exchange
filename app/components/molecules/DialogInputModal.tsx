import { StyleSheet, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { ElementView, Text, ThemedButton } from '../../components/Themed';
import LoadingScreenModal from './LoadingScreenModal';
import LabeledInput, { LabeledInputProps } from '../atoms/inputs/LabeledInput';

interface DialogInputModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  action: () => void;
  label: LabeledInputProps ;
  title?: string;
  statement?: string;
}

const DialogInputModal = ({ 
  visible, 
  setVisible, 
  action,
  label, 
  title, 
  statement
}: DialogInputModalProps) => {
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
            <LabeledInput
              placeholderTextColor={styles.inputContainer.color}
              viewStyle={styles.inputContainer}
              {...label}
            />
          </ElementView>
          <ElementView style={styles.bottomBar}>
            <ThemedButton onPress={action} buttonStyles={styles.submitBtn}>
              <Text style={styles.submitBtnText}>Enter</Text>
            </ThemedButton>
          </ElementView>
        </ElementView>
      </ElementView>
    </Modal>
  );
}

export default DialogInputModal;

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
    backgroundColor: '#71459B',
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