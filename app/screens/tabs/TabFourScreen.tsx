import React, { useState, useEffect, useContext } from 'react'
import { ActivityIndicator, StyleSheet} from 'react-native'
import SocialScreen from '../SocialScreen'
import { View } from '../../components/Themed'
// import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider'
// import { API, graphqlOperation } from 'aws-amplify'
// import { getUser } from '../../src/graphql/queries'

import { userInfo } from '../../../assets/dummyData/userInfo'
import PageHeader from '../../components/molecules/PageHeader'

export default function TabFourScreen() {
  // const { theUser } = useContext(AuthenticatedUserContext)
  // const [user, setUser] = useState(theUser)

  const [user, setUser] = useState(userInfo[0])

  const [activePage, setActivePage] = useState('')

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await API.graphql(
  //         graphqlOperation(getUser, {id: theUser.id})
  //       )
  //       setUser(response.data.getUser)
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   }
  //   fetchUser()
  //   return () => {
  //     setUser(null)
  //   }
  // }, [])

  if (!user) {
    return <ActivityIndicator />
  }

  return (
    <View style={styles.root}>
      <PageHeader title={'Social'} />
      <SocialScreen />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 10,
  },
})