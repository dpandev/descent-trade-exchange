import { 
  Text as DefaultText, 
  View as DefaultView, 
  ScrollView as DefaultScrollView, 
  Button as DefaultButton,
  PressableStateCallbackType,
} from 'react-native';
import CustomButton from './buttons/CustomButton';
import LabelledInput from './inputs/LabelledTextInput';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type ScrollViewProps = ThemeProps & DefaultScrollView['props'];
export type ButtonProps = ThemeProps & DefaultButton['props'];
export type ThemeableButtonProps = ThemeProps & CustomButton['props'];
export type LabelledInputFieldProps = ThemeProps & LabelledInput['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ElementView(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'transparent');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ScrollView(props: ScrollViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultScrollView contentContainerStyle={[{ backgroundColor }, style]} {...otherProps} />;
}

export function SquareButton(props: ButtonProps) {
  const { color, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'secondary');

  return <DefaultButton color={ backgroundColor } {...otherProps} />;
}

/**
 * Re-usable button with set color themed properties. Has
 * two modes for color styles - inverted and non-inverted.
 * @param props 
 * @returns A themed button
 */
export function ThemedButton(props: ThemeableButtonProps) {
  const { inverted, icon, iconColor, textStyles, buttonStyles, lightColor, darkColor, ...otherProps } = props;
  const txtStyle = { 
    color: useThemeColor({ light: lightColor, dark: darkColor }, 'text'),
    ...textStyles
  }
  const btnStyle = {
    backgroundColor: useThemeColor({ light: lightColor, dark: darkColor }, inverted ? 'secondary' : 'primary'),
    borderColor: useThemeColor({ light: lightColor, dark: darkColor }, inverted ? 'secondary' : 'primary'),
    ...buttonStyles
  }
  const btnStylePressed = {
    backgroundColor: useThemeColor({ light: lightColor, dark: darkColor }, inverted ? 'primary' : 'secondary'),
    borderColor: useThemeColor({ light: lightColor, dark: darkColor }, inverted ? 'primary' : 'secondary'),
    ...buttonStyles
  }
  return (
    <CustomButton 
      textStyles={txtStyle} 
      buttonStyles={
        ({pressed}: {pressed: PressableStateCallbackType}) => {
          return [pressed ? btnStylePressed : btnStyle]}} 
      iconColor={txtStyle.color} 
      icon={icon} 
      {...otherProps} 
    />
  );
}

/**
 * Themed button with rounded edges
 * @param props 
 * @returns a themed rounded button
 */
export function RoundedButton(props: ThemeableButtonProps) {
  const { inverted, icon, iconColor, textStyles, buttonStyles, lightColor, darkColor, ...otherProps } = props;
  const defaultTxtStyles = { 
    fontWeight: 'bold',
    letterSpacing: 0.45,
    marginRight: icon ? 15 : 0,
    ...textStyles
  }
  const defaultBtnStyles = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginVertical: 25,
    marginHorizontal: 10,
    borderRadius: 50,
    width: '35%',
    borderWidth: 1,
    ...buttonStyles
  }
  return (
    <ThemedButton 
      textStyles={defaultTxtStyles}
      buttonStyles={defaultBtnStyles} 
      inverted={inverted}
      {...otherProps} 
    />
  );
}

/**
 * Themed button with styling specific for a small button.
 * @param props 
 * @returns a themed small squared button
 */
export function FollowButton(props: ThemeableButtonProps) {
  const { inverted, textStyles, buttonStyles, lightColor, darkColor, ...otherProps } = props;
  const txtStyle = { 
    color: useThemeColor({ light: lightColor, dark: darkColor }, 'text'),
    ...(textStyles ? textStyles : {}) 
  }
  const btnStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 2,
    width: 80,
    height: 35,
    ...buttonStyles
  }
  return <ThemedButton buttonStyles={btnStyle} textStyles={txtStyle} inverted={inverted} {...otherProps} />;
}

/**
 * Themed button with styling made for displaying in lists.
 * @param props 
 * @returns a themed full width button
 */
export function ModifiedListItemButton(props: ThemeableButtonProps) {
  const { textStyles, buttonStyles, lightColor, darkColor, ...otherProps } = props;
  const textStyle = {
    color: useThemeColor({ light: lightColor, dark: darkColor }, 'text'),
    ...textStyles
  }
  const btnStyle = {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginVertical: 8,
    alignSelf: 'center',
    borderRadius: 8,
    width: '100%',
    borderWidth: 1,
    ...buttonStyles
  }
  return (
    <ThemedButton 
      textStyles={textStyle}
      buttonStyles={btnStyle} 
      {...otherProps} 
    />
  );
}

export function LabelledInputField(props: LabelledInputFieldProps) {
  const { inputStyles, lightColor, darkColor, ...otherProps } = props;
  return <LabelledInput {...otherProps} />;
}
