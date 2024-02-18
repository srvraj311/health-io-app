import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
// Navigations
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>

const Home = ({ navigation }: Props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.smallText}>Home Screen</Text>
            <Button
                title='Go to details'
                onPress={() => navigation.replace('Details', { userId: '123' })}
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