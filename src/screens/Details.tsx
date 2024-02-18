import { View, Text, StyleSheet, Button } from 'react-native'
import React from 'react'
import { RootStackParamList } from '../navigation/navigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

type DetailsProps = NativeStackScreenProps<RootStackParamList, "Details">;



const Details = ({ route }: DetailsProps) => {

    const { userId } = route.params;

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    return (
        <View style={styles.container}>
            <Text style={styles.smallText}>Details {userId} </Text>
            <Button title='Go Back home' onPress={() => navigation.replace("Home")} />
        </View>
    )
}

export default Details

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