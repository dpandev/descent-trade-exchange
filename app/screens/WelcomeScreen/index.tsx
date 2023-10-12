import React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { View, Text, ElementView, ThemedButton } from '../../components/Themed';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
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
          <Text style={styles.title}>Don't lose your savings in crypto</Text>
          <ElementView style={styles.row}>
            <Text style={styles.title}>Lose virtual money instead {' '}</Text>
            <FontAwesome5 name={'laugh-wink'} color={'white'} size={25} />
          </ElementView>
          <ThemedButton
            onPress={onGetStarted}
            textStyles={styles.buttonText}
            buttonStyles={styles.button}
            icon={'angle-right'}
            iconSize={25}
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
  },
});