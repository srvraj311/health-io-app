import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import GlobalStyles from '../../styles/general/global_styles'

const PrimaryButton = ({
    title, onPress, height, width
}: {
    title: string, onPress: () => any, height?: string, width?: string
}) => {
    const [isDarkMode, setItsDarkMode] = useState(useColorScheme() === 'dark');

    if (height) {
        primaryButtonStyle.button.height = Number(height)
    }
    if (width) {
        primaryButtonStyle.button.width = Number(width)
    }



    return (
        <TouchableOpacity activeOpacity={0.9} onPress={() => onPress()} style={
            primaryButtonStyle.button
        } >
            <Text style={primaryButtonStyle.buttontext} >{title}</Text>
        </TouchableOpacity>
    )
}


const primaryButtonStyle = StyleSheet.create({
    button: {
        backgroundColor: GlobalStyles.primaryColour,
        height: 52,
        width: 345,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        borderRadius: 8,
        marginTop: 32,
        zIndex: 2
    },
    buttontext: {
        color: GlobalStyles.white,
        textTransform: 'uppercase',
        fontSize: 14,
        fontWeight: '700',
        fontFamily: GlobalStyles.baseFont,

    }
});

export default PrimaryButton