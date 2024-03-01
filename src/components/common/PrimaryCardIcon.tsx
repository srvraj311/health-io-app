import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import homeStyles from '../../styles/components/HomeStyles'
import GlobalStyles from '../../styles/general/global_styles'

const PrimaryCardIcon = ({
    text, icon, onPress
}: any) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.card} onPress={onPress}>
            <Text style={styles.cardText}>{text}</Text>
            <View style={styles.cardIconContainer}>
                <Image style={styles.cardIcon} source={icon} />
            </View>
        </TouchableOpacity>
    )
}

export default PrimaryCardIcon

const styles = StyleSheet.create({
    card: {
        width: 163,
        height: 139,
        borderRadius: 20,
        backgroundColor: GlobalStyles.cardBgColor,
        margin: 12
    },
    cardText: {
        marginTop: 24,
        marginStart: 16,
        fontFamily: GlobalStyles.baseFont,
        fontSize: 16,
        color: GlobalStyles.grey700
    },
    cardIconContainer: {
        margin: 16
    },
    cardIcon: {
        height: 55,
        width: 55
    }
})