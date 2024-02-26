import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useEffect } from 'react'
// Navigations
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/navigation';
import { AppDispatch, RootState } from '../../redux/reducers/user/userStore';
import { useSelector, useDispatch } from 'react-redux';
import { isLoggedInAsync, logout } from '../../redux/reducers/user/userSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const Home = (prop: Props) => {
    // How we can get the state
    const user = useSelector((state: RootState) => state.user);
    // How we can call the reducers
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (prop.route.params.token) {
            dispatch(isLoggedInAsync(prop.route.params.token))
        } else {
            prop.navigation.replace('Login');
        }
    }, [])


    return (
        <View style={styles.container}>
            {user.isLoggedIn &&
                <Text style={styles.smallText}>Logged in as {user?.user?.first_name + ' ' + user?.user?.last_name}
                    {JSON.stringify(user?.user)}
                </Text>}
            {user.isCheckingLogin &&
                <Text style={styles.smallText}>Checking Login</Text>}
            <Button
                title='Logut'
                onPress={() => {
                    dispatch(logout());
                    prop.navigation.navigate('Login');
                }}
            />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    smallText: {
        color: 'black'
    }
})