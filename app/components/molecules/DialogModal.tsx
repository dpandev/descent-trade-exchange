import { StyleSheet, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { ElementView, Text, ThemedButton } from '../../components/Themed';

export interface DialogModalProps {
  visible: boolean,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  statement?: string;
}

const DialogModal = ({ 
  visible,
  setVisible,
  title, 
  statement,
}: DialogModalProps) => {
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
          <ElementView style={styles.bottomBar}>
            <ThemedButton buttonStyles={styles.submitBtn} onPress={() => setVisible(!visible)}>
              <Text style={styles.submitBtnText}>Email Us</Text>
            </ThemedButton>
          </ElementView>
        </ElementView>
      </ElementView>
    </Modal>
  );
}

export default DialogModal;

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
    flex: 8,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 30,
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
    textAlign: 'center',
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