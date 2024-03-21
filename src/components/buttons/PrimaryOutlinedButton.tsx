import { View, Text, TouchableOpacity, StyleSheet, useColorScheme, ProgressBarAndroidComponent } from 'react-native'
import React, { useState } from 'react'
import GlobalStyles from '../../styles/general/global_styles'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/reducers/user/userStore'
import LottieView from 'lottie-react-native'
import { Icon } from 'react-native-paper'

const PrimaryOutlinedButton = ({
    title, onPress, height, width, isLoadingState, icon, disabled
}: {
    title: string,
    onPress: () => any,
    height?: string,
    width?: string,
    isLoadingState?: boolean,
    icon?: string,
    disabled?: boolean
}) => {
    const [isDarkMode, setItsDarkMode] = useState(useColorScheme() === 'dark');
    if (height) {
        primaryButtonStyle.button.height = Number(height)
    }
    if (width) {
        primaryButtonStyle.button.width = Number(width)
    }



    return (
        <TouchableOpacity activeOpacity={0.6} onPress={() => onPress()} style={
            [primaryButtonStyle.button,
            !isLoadingState ? primaryButtonStyle.buttonPrimary : primaryButtonStyle.buttonLight,
            { width: width ? Number(width) : 345 },
            !disabled ? { borderColor: GlobalStyles.primaryColour, borderWidth: 2 } : { borderColor: GlobalStyles.grey300, borderWidth: 1 }
            ]
        }
            disabled={isLoadingState}
        >
            {isLoadingState ?
                <LottieView style={{ width: 150, height: 100, zIndex: 3, marginTop: 4 }} source={require('../../assets/animations/loading.json')} autoPlay loop />
                : <View style={primaryButtonStyle.buttonContainer}>
                    <Icon size={24} source={icon} color={GlobalStyles.primaryColour}></Icon>
                    <Text style={primaryButtonStyle.buttontext} >{title}</Text>
                </View>}
        </TouchableOpacity>
    )
}


const primaryButtonStyle = StyleSheet.create({
    buttonContainer: {
        width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'
    },
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
    },
    buttonPrimary: {
        borderWidth: 1,
        backgroundColor: GlobalStyles.grey50,
    },
    buttontext: {
        color: GlobalStyles.secondaryColor,
        textTransform: 'uppercase',
        fontSize: 14,
        fontWeight: '700',
        fontFamily: GlobalStyles.baseFont,
        marginLeft: 10
    }
});

export default PrimaryOutlinedButton