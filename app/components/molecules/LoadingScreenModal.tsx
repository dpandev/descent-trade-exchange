import { StyleSheet, Modal, ActivityIndicator } from 'react-native';
import React from 'react';
import { ElementView, Text } from '../../components/Themed';

interface LoadingScreenModalProps {
  visible: boolean;
}

export default function LoadingScreenModal({ 
  visible, 
}: LoadingScreenModalProps) {
  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={visible}
    >
      <ElementView style={styles.centeredView}>
        <Text style={styles.text}>Logging you in...</Text>
        <ActivityIndicator size={'large'} color={'white'} />
      </ElementView>
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
  text: {
    paddingBottom: 25,
    fontSize: 20,
    fontWeight: 'bold',
  },
});