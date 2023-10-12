import { ElementView } from '../../Themed';
import React from 'react';
import { 
  ColorValue, 
  KeyboardTypeOptions, 
  NativeSyntheticEvent, 
  StyleProp, 
  StyleSheet, TextInput, 
  TextInputProps, 
  TextInputSubmitEditingEventData, 
  TextStyle, 
  ViewStyle 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';
import useColorScheme from '../../../hooks/useColorScheme';

export interface SearchbarProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  textContentType?: TextInputProps["textContentType"];
  maxLength?: number;
  autoCorrect?: boolean;
  placeholder?: string;
  placeholderTextColor?: ColorValue;
  secureTextEntry?: boolean;
  selectionColor?: ColorValue;
  inputStyles?: StyleProp<TextStyle>;
  keyboardType?: KeyboardTypeOptions;
  keyboardAppearance?: TextInputProps["keyboardAppearance"];
  componentStyles?: StyleProp<ViewStyle>;
  onSubmit?: ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void);
}

export default function Searchbar({ 
  value, 
  setValue, 
  textContentType = 'name', 
  maxLength = 30, 
  autoCorrect = false, 
  placeholder, 
  placeholderTextColor = '#772ceb', 
  secureTextEntry = false, 
  selectionColor = '#772ceb', 
  inputStyles = {}, 
  keyboardAppearance = 'default', 
  keyboardType = 'default',  
  componentStyles = {}, 
  onSubmit = () => console.error('set me up'),
  ...otherProps 
}: SearchbarProps) {

  const colorScheme = useColorScheme();

  return (
    <ElementView style={[styles.container, componentStyles]}>
      <Ionicons
        name="search"
        size={25}
        color={Colors[colorScheme].secondary}
        style={{ marginLeft: 15 }}
      />
      <TextInput 
        value={value}
        onChangeText={setValue}
        maxLength={maxLength}
        textContentType={textContentType}
        style={[styles.input, inputStyles]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={secureTextEntry}
        selectionColor={selectionColor}
        autoCorrect={autoCorrect}
        autoCapitalize={'none'}
        keyboardType={keyboardType}
        keyboardAppearance={keyboardAppearance}
        onSubmitEditing={onSubmit}
      />
    </ElementView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    width: '100%',
    marginVertical: 15,
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#232228',
    paddingVertical: 10,
  },
  input: {
    paddingLeft: 15,
    fontSize: 18,
    width: '100%',
    height: 30,
    color: 'white',
  },
})