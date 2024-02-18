import { View, Text, ImageComponent, Image, TextInput, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React from 'react'
import { loginStyles } from '../../../styles/components/LoginStyles'
import HeadingTexts from '../../../components/common/HeadingTexts'
import PrimaryButton from '../../../components/buttons/PrimaryButton'
import Svg from 'react-native-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalStyles from '../../../styles/general/global_styles'

const Login = () => {
    const onContinuePressed = () => {
        Alert.alert('Continue Pressed')
    }
    const isIos = Platform.OS === 'ios';

    return (
        <KeyboardAvoidingView behavior='padding' style={loginStyles.keyboardViewContainer}>
            <View style={isIos ? loginStyles.containerIos : loginStyles.containerAndoroid}>
                <Image style={loginStyles.image} source={
                    require('../../../assets/images/icon.png')
                } />
                <HeadingTexts
                    text1='Welcome to'
                    text2='Health.IO' ></HeadingTexts>
                <Text
                    style={loginStyles.subHeader}>The right choice for health care needs</Text>
                <TextInput
                    placeholderTextColor={GlobalStyles.grey500}
                    placeholder='Enter your email' style={loginStyles.input} />
                <PrimaryButton
                    title='Continue'
                    onPress={() => { onContinuePressed() }}></PrimaryButton>
                <Image
                    source={require('../../../assets/images/login_bg.png')}
                    style={isIos ? loginStyles.bgImage : loginStyles.bgImageAndroid} />
            </View>
        </KeyboardAvoidingView>
    )
}

export default Login