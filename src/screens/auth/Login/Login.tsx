import { View, Text, ImageComponent, Image, TextInput, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React, { useState } from 'react'
import { loginStyles } from '../../../styles/components/LoginStyles'
import HeadingTexts from '../../../components/common/HeadingTexts'
import PrimaryButton from '../../../components/buttons/PrimaryButton'
import Svg from 'react-native-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalStyles from '../../../styles/general/global_styles'
import { validateEmailWithApi } from '../../../service/auth/authService'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/navigation'


const Login = () => {

    const [email, setEmail] = useState('');
    const isIos = Platform.OS === 'ios';
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const onContinuePressed = (email: string) => {
        validateEmailWithApi(email)
            ?.then((response) => {
                if (response.status === 'OK') {
                    navigation.push('Signup', {
                        email: email,
                        isUserExists: false
                    })
                }
            })
            ?.catch((error) => {
                if (error.status === 'UsernameNotFoundException') {
                    // Alert.alert("Email Does not exist Exist")
                    navigation.push('Signup', {
                        email: email,
                        isUserExists: false
                    })
                } else if (error.status === 'BadRequestException') {
                    Alert.alert(error.message);
                }
            })
    }

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
                    onChangeText={val => setEmail(val)}
                    placeholderTextColor={GlobalStyles.grey500}
                    placeholder='Enter your email' style={loginStyles.input} />
                <PrimaryButton
                    title='Continue'
                    onPress={() => { onContinuePressed(email) }}></PrimaryButton>
                <Image
                    source={require('../../../assets/images/login_bg.png')}
                    style={isIos ? loginStyles.bgImage : loginStyles.bgImageAndroid} />
            </View>
        </KeyboardAvoidingView>
    )
}

export default Login