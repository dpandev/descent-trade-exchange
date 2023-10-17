import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { View, ElementView, ThemedButton } from '../../components/Themed';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../types';

export default function WelcomeScreen() {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();

  const onGetStarted = () => {
    navigation.navigate('SignupScreen');
  }

  return (
    <View style={styles.root}>
      <ImageBackground 
        source={require('../../../assets/images/splash.png')}
        resizeMode='cover'
        style={styles.bgImage}
      >
        <ElementView style={styles.inner}>
          <ThemedButton
            onPress={onGetStarted}
            textStyles={styles.buttonText}
            buttonStyles={styles.button}
            icon={'hand-point-right'}
            iconSize={25}
            iconColor='white'
          >
            Get Started
          </ThemedButton>
        </ElementView>
      </ImageBackground>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    padding: 25,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Bradley Hand',
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
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