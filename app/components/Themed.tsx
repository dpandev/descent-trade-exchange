import { 
  Text as DefaultText, 
  View as DefaultView, 
  ScrollView as DefaultScrollView, 
  Button as DefaultButton,
  PressableStateCallbackType,
  KeyboardAvoidingView as DefaultKeyboardAvoidingView,
} from 'react-native';
import CustomButton from './atoms/buttons/CustomButton';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { AlternateButton as DefaultAlternateButton, AlternateButtonProps } from './atoms/buttons/AlternateButton';
import { ReactElement } from 'react';

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
  inverted?: boolean;
  activeState?: boolean;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type ScrollViewProps = ThemeProps & DefaultScrollView['props'];
export type ButtonProps = ThemeProps & DefaultButton['props'];
export type ThemeableButtonProps = ThemeProps & CustomButton['props'];
export type KeyboardAvoidingViewProps = ThemeProps & DefaultKeyboardAvoidingView['props'];
export type AlternateThemeButtonProps = ThemeProps & AlternateButtonProps;

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { inverted, style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, inverted ? 'primary' : 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ElementView(props: ViewProps) {
  const { inverted, style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, inverted ? 'primary' : 'transparent');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ScrollView(props: ScrollViewProps) {
  const { inverted, style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, inverted ? 'primary' : 'background');

  return <DefaultScrollView contentContainerStyle={[{ backgroundColor }, style]} {...otherProps} />;
}

export function KeyboardAvoidingView(props: KeyboardAvoidingViewProps) {
  const { inverted, style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, inverted ? 'primary' : 'background');

  return <DefaultKeyboardAvoidingView style={[{ backgroundColor }, style]} {...otherProps} />
}

export function SquareButton(props: ButtonProps) {
  const { inverted, color, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, inverted ? 'secondary' : 'primary');

  return <DefaultButton color={ backgroundColor } {...otherProps} />;
}

/**
 * Button that keeps color scheme while in active state.
 * @param props 
 * @returns 
 */
export function ActivatedButton(props: ThemeableButtonProps) {
  const { inverted, activeState, icon, iconColor, textStyles, buttonStyles, lightColor, darkColor, ...otherProps } = props;
  const txtStyle = { 
    color: useThemeColor({ light: lightColor, dark: darkColor }, 'text'),
    ...textStyles,
  }
  const btnStyle = {
    backgroundColor: useThemeColor({ light: lightColor, dark: darkColor }, inverted ? 'secondary' : 'primary'),
    borderColor: useThemeColor({ light: lightColor, dark: darkColor }, inverted ? 'secondary' : 'primary'),
    ...buttonStyles,
  }
  const btnStylePressed = {
    backgroundColor: useThemeColor({ light: lightColor, dark: darkColor }, inverted ? 'primary' : 'secondary'),
    borderColor: useThemeColor({ light: lightColor, dark: darkColor }, inverted ? 'primary' : 'secondary'),
    ...buttonStyles,
  }
  return (
    <CustomButton 
      textStyles={txtStyle} 
      buttonStyles={activeState ? btnStylePressed : btnStyle}
      iconColor={txtStyle.color} 
      icon={icon} 
      {...otherProps} 
    />
  );
}

/**
 * Re-usable button with set color themed properties. Has
 * two modes for color styles - inverted and non-inverted.
 * @param props 
 * @returns A themed button
 */
export function ThemedButton(props: ThemeableButtonProps) {
  const { inverted=false, textStyles, buttonStyles, lightColor, darkColor, ...otherProps } = props;
  const txtStyle = { 
    color: useThemeColor({ light: lightColor, dark: darkColor }, 'buttonText'),
    ...textStyles,
  }
  const btnStyle = {
    backgroundColor: useThemeColor({ light: lightColor, dark: darkColor }, inverted ? 'secondary' : 'primary'),
    borderColor: useThemeColor({ light: lightColor, dark: darkColor }, inverted ? 'secondary' : 'primary'),
    ...buttonStyles,
  }
  const btnStylePressed = {
    backgroundColor: useThemeColor({ light: lightColor, dark: darkColor }, inverted ? 'tint' : 'secondary'),
    borderColor: useThemeColor({ light: lightColor, dark: darkColor }, inverted ? 'tint' : 'secondary'),
    ...buttonStyles,
  }

  return (
    // <CustomButton 
    //   textStyles={txtStyle} 
    //   buttonStyles={
    //     //changes style if button is being pressed
    //     ({pressed}: {pressed: PressableStateCallbackType}) => {
    //       return [pressed ? btnStylePressed : btnStyle]}
    //   }
    //   {...otherProps} 
    // />
    <DefaultAlternateButton 
      activeStyle={btnStylePressed}
      inactiveStyle={btnStyle}
      textStyle={txtStyle}
      {...otherProps}
    />
  );
}

export function AlternateThemedButton(props: AlternateThemeButtonProps): ReactElement {
  const { inverted=false, icon, textStyle, style, activeStyle, inactiveStyle, lightColor, darkColor, ...otherProps } = props;
  const defaultTxtStyles: AlternateButtonProps['textStyle'] = { 
    fontWeight: 'bold',
    letterSpacing: 0.45,
    marginRight: icon ? 15 : 0,
    // color: 'white',
    ...{textStyle},
  }
  const defaultBtnStyles: AlternateButtonProps['style'] = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: icon ? 'space-evenly' : 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 14,
  }
  const inactiveStylesThemed: AlternateThemeButtonProps['inactiveStyle'] = {
    backgroundColor: useThemeColor({ light: lightColor, dark: darkColor }, inverted ? 'secondary' : 'primary'),
    borderColor: useThemeColor({ light: lightColor, dark: darkColor }, inverted ? 'secondary' : 'primary'),
    ...defaultBtnStyles,
    ...{inactiveStyle},
    ...{style},
  }
  const activeStylesThemed: AlternateButtonProps['activeStyle'] = {
    backgroundColor: useThemeColor({ light: lightColor, dark: darkColor }, inverted ? 'primary' : 'secondary'),
    borderColor: useThemeColor({ light: lightColor, dark: darkColor }, inverted ? 'primary' : 'secondary'),
    ...defaultBtnStyles,
    ...{activeStyle},
    ...{style},
  }
  return (
    <DefaultAlternateButton 
      activeStyle={activeStylesThemed}
      inactiveStyle={inactiveStylesThemed}
      textStyle={defaultTxtStyles}
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
  const { inverted, icon, textStyles, buttonStyles, lightColor, darkColor, ...otherProps } = props;
  const defaultTxtStyles = { 
    fontWeight: 'bold',
    letterSpacing: 0.45,
    marginRight: icon ? 15 : 0,
    ...textStyles,
  }
  const defaultBtnStyles = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 25,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 14,
    borderWidth: 1,
    ...buttonStyles,
  }
  return (
    <ThemedButton 
      textStyles={defaultTxtStyles}
      buttonStyles={defaultBtnStyles} 
      inverted={inverted}
      icon={icon}
      {...otherProps} 
    />
  );
}

/**
 * Themed button with styling made for displaying in lists.
 * @param props 
 * @returns a themed full width button
 */
export function ListItemButton(props: ThemeableButtonProps) {
  const { textStyles, buttonStyles, lightColor, darkColor, ...otherProps } = props;
  const textStyle = {
    color: useThemeColor({ light: lightColor, dark: darkColor }, 'text'),
    ...textStyles,
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
    ...buttonStyles,
  }
  return (
    <ThemedButton 
      textStyles={textStyle}
      buttonStyles={btnStyle} 
      {...otherProps} 
    />
  );
}
