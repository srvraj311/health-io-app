import React from 'react'
import {
    SafeAreaView,
    Text,
    StyleSheet,
    useColorScheme,
    View,
    Button,
    ProgressBarAndroidBase,
    ActivityIndicator
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './redux/reducers/user/userStore'
import { setEmail } from './redux/reducers/user/userSlice'


function AppPro(): JSX.Element {
    // How we can get the state
    const user = useSelector((state: RootState) => state.user);

    // How we can call the reducers
    const dispatch = useDispatch<AppDispatch>();

    return (
        <SafeAreaView style={styles.container}>

            <View >
                <ActivityIndicator size={'large'} style={{ padding: 10 }} animating={user.isCheckingLogin}>
                </ActivityIndicator>
                <Text style={user.isLoggedIn ? styles.whitetext : styles.darkMode}>Hello World</Text>
            </View>
            <Text>{user.email}</Text>
            <Button onPress={() => dispatch(setEmail("Sample Email Payload"))} title='Set Payload' ></Button>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    whitetext: {
        color: 'green'
    },
    darkMode: {
        color: 'red'
    }
})

export default AppPro;