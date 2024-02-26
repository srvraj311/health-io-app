import { View, Text, TouchableOpacity, StyleSheet, useColorScheme, ProgressBarAndroidComponent } from 'react-native'
import React, { useState } from 'react'
import GlobalStyles from '../../styles/general/global_styles'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/reducers/user/userStore'
import LottieView from 'lottie-react-native'

const PrimaryButton = ({
    title, onPress, height, width, isLoadingState
}: {
    title: string, onPress: () => any, height?: string, width?: string, isLoadingState?: boolean
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
            [primaryButtonStyle.button, !isLoadingState ? primaryButtonStyle.buttonPrimary : primaryButtonStyle.buttonLight]
        }
            disabled={isLoadingState}
        >
            {isLoadingState ?
                <LottieView style={{ width: 150, height: 100, zIndex: 3, marginTop: 4 }} source={require('../../assets/animations/loading.json')} autoPlay loop />
                : <Text style={primaryButtonStyle.buttontext} >{title}</Text>}
        </TouchableOpacity>
    )
}


const primaryButtonStyle = StyleSheet.create({
    button: {
        height: 52,
        width: 345,
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        borderRadius: 8,
        marginTop: 32,
        zIndex: 2
    },
    buttonLight: {
        backgroundColor: GlobalStyles.grey100,
        borderWidth: 1,
        borderColor: GlobalStyles.primaryColour
    },
    buttonPrimary: {
        backgroundColor: GlobalStyles.primaryColour,
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