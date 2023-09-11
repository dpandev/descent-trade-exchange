import { ElementView, RoundedButton } from '../Themed'
import { StyleSheet } from 'react-native'
import React from 'react'

export interface TheProps {
  buttons: any,
  setRenderComp: any,
}

export default function ThreeCustomTabs({ buttons, setRenderComp }: TheProps) {

  const onButtonPress = (value: any) => {
    setRenderComp(value.component)
  }

  return (
    <ElementView style={styles.headerButtonsContainer}>
      <RoundedButton
        onPress={() => onButtonPress(buttons[0])}
        buttonStyles={styles.headerButton}
      >
        {buttons[0].name}
      </RoundedButton>
      <RoundedButton
        onPress={() => onButtonPress(buttons[1])}
        buttonStyles={styles.headerButton}
      >
        {buttons[1].name}
      </RoundedButton>
      <RoundedButton
        onPress={() => onButtonPress(buttons[2])}
        buttonStyles={styles.headerButton}
      >
        {buttons[2].name}
      </RoundedButton>
      
    </ElementView>
  )
}

const styles = StyleSheet.create({
  headerButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
    backgroundColor: '#1A1C2A',
    borderRadius: 12,
    width: '90%',
    alignSelf: 'center',
  },
  headerButton: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 0,
    marginVertical: 0,
    borderRadius: 12,
    borderWidth: 0,
  },
})