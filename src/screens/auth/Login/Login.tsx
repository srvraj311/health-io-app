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
import PrimaryInput from '../../../components/input/PrimaryInput'


const Login = () => {

    const [email, setEmail] = useState('');
    const isIos = Platform.OS === 'ios';
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const [error, setError] = useState('');
    const isError = error && error.length > 0;
    const onContinuePressed = (email: string) => {
        if (!email) {
            setError('Please enter a valid email');
            return
        }

        setIsLoading(true);
        validateEmailWithApi(email)
            ?.then((response) => {
                setIsLoading(false);
                if (response.status === 'OK') {
                    navigation.push('Signup', {
                        email: email,
                        isUserExists: true
                    })
                }
            })
            ?.catch((error) => {
                setIsLoading(false);
                if (error.status === 'UsernameNotFoundException') {
                    // Alert.alert("Email Does not exist Exist")
                    navigation.push('Signup', {
                        email: email,
                        isUserExists: false
                    })
                } else {
                    setError(error.message);
                }
            })
    }

    const onEmailTextChange = (text: string) => {
        setEmail((prev) => text);
        setError((prev) => '');
    }

    return (

        <ScrollView
            contentContainerStyle={[loginStyles.scrollView]}
            automaticallyAdjustKeyboardInsets={true}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='never'
            keyboardDismissMode='interactive'
            bounces={false}
        >
            <KeyboardAvoidingView
                enabled
                contentContainerStyle={{ height: 'auto' }}
                // behavior='padding'
                behavior={Platform.OS === "ios" ? "height" : "height"}
                style={loginStyles.keyboardViewContainer}
            >
                <View style={[loginStyles.body, isIos ? loginStyles.containerIos : loginStyles.containerAndoroid]}>
                    <Image style={loginStyles.image} source={
                        require('../../../assets/images/icon.png')
                    } />
                    <HeadingTexts
                        text1='Welcome to'
                        text2='Health.IO' ></HeadingTexts>
                    <Text
                        style={loginStyles.subHeader}>The right choice for health care needs</Text>
                    <PrimaryInput
                        onChangeText={val => onEmailTextChange(val)}
                        inputMode='email'
                        errorText={error}
                        placeholder='Enter your email' />
                    <View >
                        <PrimaryButton
                            isLoadingState={isLoading}
                            title='Continue'
                            onPress={() => { onContinuePressed(email) }}></PrimaryButton>
                    </View>
                </View>

                <View style={loginStyles.footer}>

                    <Image style={loginStyles.bgImage}
                        source={require('../../../assets/images/login_bg.png')}
                    />
                </View>
            </KeyboardAvoidingView>
        </ScrollView >
    )
}

export default Login