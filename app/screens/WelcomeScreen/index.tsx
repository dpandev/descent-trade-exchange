import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { View, ElementView } from '../../components/Themed';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import SocialLoginButtons from '../../components/atoms/buttons/SocialLoginButtons';

export default function WelcomeScreen() {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const onGetStarted = () => {
    navigation.navigate('SignupScreen');
  }

  return (
    <View style={styles.root}>
      <ImageBackground 
        source={require('../../../assets/images/title-icon.png')}
        resizeMode='contain'
        style={styles.bgImage}
      />
      <ElementView style={styles.inner}>
        {/* <ThemedButton
          onPress={onGetStarted}
          textStyles={styles.buttonText}
          buttonStyles={styles.button}
          icon={'hand-point-right'}
          iconSize={25}
          iconColor='white'
        >
          Get Started
        </ThemedButton> */}
        <SocialLoginButtons email apple google />
      </ElementView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bgImage: {
    flex: 1,
    width: '100%',
    maxHeight: 400,
  },
  inner: {
    marginTop: 40,
    width: '100%',
    maxWidth: 300,
  },
  button: {
    marginTop: 100,
    marginBottom: 50,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    marginTop: 2,
    marginRight: 15,
    fontWeight: 'bold',
    fontSize: 22,
  },
});