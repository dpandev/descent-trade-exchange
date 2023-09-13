import { View, Text, RoundedButton } from '../../components/Themed'
import { StyleSheet } from 'react-native'
import React, { useContext, useState } from 'react'
// import { Auth } from 'aws-amplify'
// import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider'

export default function SettingsScreen() {
  // const { setTheUser } = useContext(AuthenticatedUserContext)
  const [activeButton, setActiveButton] = useState(false)

  const onSignOut = async () => {
    // await Auth.signOut().then(setTheUser(null))
    console.log('signout')
  }

  return (
    <View style={styles.root}>
      <RoundedButton
        onPress={onSignOut}
        textStyles={styles.lightColor}
        buttonStyles={styles.signOutBtn}
      >
        Sign Out
      </RoundedButton>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
  },
  lightColor: {},
  signOutBtn: {},
})