import { ElementView, Text } from '../../Themed'
import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../../constants/Colors'
import useColorScheme from '../../../hooks/useColorScheme';

export interface SearchbarProps {
  placeholder?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  textContentType?: any;
  maxLength?: number;
  autoCorrect?: boolean;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  selectionColor?: string;
  inputStyles?: object;
  keyboardType?: any;
  keyboardAppearance?: any;
  label?: string;
  labelStyles?: object;
  componentStyles?: object;
}

export default function Searchbar({ value, setValue, textContentType, maxLength, autoCorrect, placeholderTextColor, secureTextEntry, selectionColor, inputStyles, keyboardAppearance, keyboardType, label, labelStyles, componentStyles, placeholder, ...otherProps }: SearchbarProps) {
  const colorScheme = useColorScheme();
  return (
    <ElementView style={styles.container}>
      <Ionicons
        name="search"
        size={25}
        color={Colors[colorScheme].secondary}
        style={{ marginLeft: 15 }}
      />
      <TextInput 
        value={value}
        onChangeText={setValue}
        maxLength={maxLength ? maxLength : 30}
        textContentType={textContentType ? textContentType : 'none'}
        style={[styles.input, inputStyles]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor ? placeholderTextColor : '#90A3B9'}
        secureTextEntry={secureTextEntry ? secureTextEntry : false}
        selectionColor={selectionColor ? selectionColor : '#90A3B9'}
        autoCorrect={autoCorrect ? autoCorrect : false}
        autoCapitalize={'none'}
        keyboardType={keyboardType ? keyboardType : 'default'}
        keyboardAppearance={keyboardAppearance ? keyboardAppearance : 'default'}
      />
    </ElementView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginVertical: 15,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#232228',
    paddingVertical: 10,
  },
  input: {
    marginLeft: 25,
    fontSize: 18,
  },
})