import { Text, ColorValue, Pressable, PressableProps, StyleProp, ViewStyle, TextProps } from 'react-native';
import React, { ReactNode, useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

export interface AlternateButtonIconProps {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  size?: number;
  color?: ColorValue;
  inactiveColor?: ColorValue;
}

export interface AlternateButtonProps extends PressableProps {
  icon?: AlternateButtonIconProps;
  activeStyle?: StyleProp<ViewStyle>;
  inactiveStyle?: StyleProp<ViewStyle>;
  children?: ReactNode | string;
  textStyle?: TextProps['style'];
}

export const AlternateButton = (props: AlternateButtonProps): React.JSX.Element => {
  const [activeTouch, setActiveTouch] = useState<boolean>(false);

  const onPush = (): void => {
    setActiveTouch(prevState => !activeTouch);
  }

  return (
    <Pressable 
      onPress={props.onPress} 
      onPressIn={onPush}
      onPressOut={onPush}
      style={
        props.activeStyle && props.inactiveStyle
        ? (activeTouch ? props.activeStyle : props.inactiveStyle)
        : (props.style || {})
      }
      {...props}
    >
        {typeof props.children === 'string'
          ? <Text style={props.textStyle}>{props.children}</Text>
          : props.children
        }
        {props.icon?.name &&
          <FontAwesome5 
            name={props.icon.name} 
            size={props.icon.size} 
            color={(activeTouch ? props.icon.color : props.icon.inactiveColor || props.icon.color) || 'white'}
          />
        }
    </Pressable>
  );
}

export default AlternateButton;