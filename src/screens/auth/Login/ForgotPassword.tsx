import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { signupNavigationOptions, signupStyles } from '../../../styles/components/SignupStyles'
import HeaderBackButton from '../../../components/buttons/HeaderBackButton'
import { RootStackParamList } from '../../../navigation/navigation'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import LargeHeadingTexts from '../../../components/common/LargeHeadingTexts'
import { setEmail } from '../../../redux/reducers/user/userSlice'
import PrimaryInput from '../../../components/input/PrimaryInput'
import PrimaryButton from '../../../components/buttons/PrimaryButton'
import { sendVerificationMail, updatePassword, validateEmailWithApi, validatePassword, verifyOtpForSignup } from '../../../service/auth/authService'
import { Constants } from '../../../constants/Constants'
import GlobalStyles from '../../../styles/general/global_styles'

type ForgotPasswordProps = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>
const ForgotPassword = ({ route }: ForgotPasswordProps) => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const isIos = Platform.OS === 'ios';
    const [email, setEmail] = useState(route.params.email || '');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [password2, setPassword2] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpError, setOtpError] = useState('');
    const [otpResent, setOtpResent] = useState(false);
    useEffect(() => {
        handleNavigationSetup();
    }, [])

    const handleNavigationSetup = () => {
        navigation.setOptions({
            headerLeft: () => {
                return <HeaderBackButton onPress={() => navigation.goBack()} />
            },
            ...signupNavigationOptions
        })
    }

    const getContainerStyle = () => {
        return signupStyles.containerNonHeader;
    }

    const onSendVerificationOtpPressed = (isResendButton: boolean) => {
        if (isResendButton && otpResent) {
            setOtpError('Try again after 1 minute');
            return;
        }
        if (isResendButton) {
            setOtpResent(true);
            setTimeout(() => {
                setOtpResent(false);
            }, 60000);
        }
        setIsLoading(true);
        setEmailError('');
        if (!email) {
            setEmailError('Email is required');
            return;
        }

        // Check if email exists
        sendVerificationMail(email, Constants.CMD_FORGOT_PASSWORD)
            ?.then((response: any) => {
                setIsLoading(false);
                if (response.status == "OK") {
                    setIsEmailSent(true);
                }
            })
            ?.catch((error: any) => {
                setIsLoading(false);
                setEmailError(error?.message || 'Something went wrong, Try again later');
            })
    }

    const onOtpChanged = (text: string) => {
        setOtp((prev) => text);
        setOtpError((prev) => '');
    }


    const handleOtpVerify = () => {
        setOtpError('');
        if (!otp || otp.length < 5) {
            setOtpError('Please enter a valid OTP');
            return;
        }
        if (!email) {
            setOtpError('Request expired, Please try again');
            return;
        }
        setIsLoading(true);
        verifyOtpForSignup(email, otp)
            ?.then((response) => {
                if (response.status === 'OK') {
                    setIsVerified(true);
                    setIsLoading(false);
                }
                setIsLoading(false);
            })
            ?.catch((error) => {
                setIsLoading(false);
                setOtpError(error.message);
            })
    }

    const onSavePassword = () => {
        setPasswordError('');
        if (!password) {
            setPasswordError('Password is required');
            return;
        }
        if (password !== password2) {
            setPasswordError('Passwords do not match');
            return;
        }
        setIsLoading(true);

        const passwordError = validatePassword(password);

        if (passwordError) {
            setPasswordError(passwordError);
            setIsLoading(false);
            return;
        }

        updatePassword(email, password)
            ?.then((response) => {
                if (response.status === 'OK') {
                    Alert.alert('Password updated successfully');
                    navigation.navigate('Login');
                    setIsLoading(false);
                }
                setIsLoading(false);
            })
            ?.catch((error) => {
                setIsLoading(false);
                setPasswordError(error.message);
            })

    }

    return (
        <ScrollView
            contentContainerStyle={[signupStyles.scrollView]}
            automaticallyAdjustKeyboardInsets={true}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='never'
            keyboardDismissMode='interactive'
            bounces={false}
        >
            <KeyboardAvoidingView
                enabled
                contentContainerStyle={{ height: 'auto', }}
                // behavior='position'
                behavior={Platform.OS === "ios" ? "height" : "height"}

                style={signupStyles.keyboardViewContainer}>
                <View
                    style={
                        getContainerStyle()
                    }>
                    <View style={signupStyles.borderPrimary} ></View>
                    <LargeHeadingTexts text1='Reset' text2='Password' />
                    {!isEmailSent && (
                        <React.Fragment>
                            <Text style={[signupStyles.subHeader, { width: 345 }]}>Enter your email and we will send you a link to reset your password.</Text>
                            <PrimaryInput
                                onChangeText={(val: any) => {
                                    setEmailError('')
                                    setEmail(val)
                                }}
                                defaultValue={email}
                                errorText={emailError}
                                inputMode='email'
                                placeholder='Enter your email' /><PrimaryButton
                                title='Continue'
                                isLoadingState={isLoading}
                                onPress={() => {
                                    onSendVerificationOtpPressed(false)
                                }} /><View style={signupStyles.textLinkContainer}>
                                <Text style={[signupStyles.textLinkLeft, signupStyles.textLink]} onPress={() => navigation.navigate('Login')}> Cancel ?</Text>
                            </View>
                        </React.Fragment>
                    )}
                    {isEmailSent && !isVerified && (
                        <React.Fragment>
                            <Text style={[signupStyles.subHeader, { width: 345 }]}>An OTP has been sent to your registered email <Text style={{ color: GlobalStyles.primaryColour, flexWrap: 'wrap' }}>{email}</Text></Text>
                            <PrimaryInput
                                errorText={otpError}
                                onChangeText={val => onOtpChanged(val)}
                                inputMode='numeric'
                                placeholder='Enter OTP' />
                            <PrimaryButton
                                title='Verify'
                                isLoadingState={isLoading}
                                onPress={() => handleOtpVerify()}>
                            </PrimaryButton>
                            <View style={signupStyles.textLinkContainer}>
                                <Text style={[signupStyles.textLinkLeft, signupStyles.textLink]} onPress={() => navigation.navigate('Login')}> Cancel ?</Text>
                                <Text
                                    style={[
                                        signupStyles.textLinkLeft,
                                        signupStyles.textLink,
                                        otpResent ? { color: GlobalStyles.error } : { color: GlobalStyles.primaryColour }
                                    ]}
                                    onPress={() => onSendVerificationOtpPressed(true)}> Resend OTP </Text>
                            </View>
                        </React.Fragment>
                    )}
                    {isEmailSent && isVerified && (
                        <React.Fragment>
                            <Text style={[signupStyles.subHeader, { width: 345 }]}>Enter a new password for your account associated with <Text style={{ color: GlobalStyles.primaryColour, flexWrap: 'wrap' }}>{email}</Text></Text>
                            <PrimaryInput
                                errorText={passwordError}
                                onChangeText={val => setPassword(val)}
                                inputMode='text'
                                secureTextEntry={true}
                                placeholder='Enter New Password' />
                            <PrimaryInput
                                onChangeText={val => setPassword2(val)}
                                inputMode='text'
                                secureTextEntry={true}
                                placeholder='Confirm New Password' />
                            <PrimaryButton
                                title='Continue'
                                isLoadingState={isLoading}
                                onPress={() => onSavePassword()}>
                            </PrimaryButton>
                            <View style={signupStyles.textLinkContainer}>
                                <Text style={[signupStyles.textLinkLeft, signupStyles.textLink]} onPress={() => navigation.navigate('Login')}> Cancel ?</Text>
                            </View>
                        </React.Fragment>
                    )}

                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default ForgotPassword