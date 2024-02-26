import { View, Text, KeyboardAvoidingView, Platform, ScrollView, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { signupNavigationOptions, signupStyles } from '../../../styles/components/SignupStyles'
import PrimaryButton from '../../../components/buttons/PrimaryButton'
import HeadingTexts from '../../../components/common/HeadingTexts'
import PrimaryInput from '../../../components/input/PrimaryInput'
import GlobalStyles from '../../../styles/general/global_styles'
import LargeHeadingTexts from '../../../components/common/LargeHeadingTexts'
import { saveTokenToStorage, sendVerificationMail, signupRequest, verifyOtpForSignup } from '../../../service/auth/authService'
import HeaderBackButton from '../../../components/buttons/HeaderBackButton'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/navigation'
import { UserDetails } from '../../../models/UserDetails'
import bloodGroupOptions from '../../../models/BloodGroups'
import PrimaryDropdown from '../../../components/input/PrimaryDropdown'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../redux/reducers/user/userStore'
import { setIsCheckingLogin } from '../../../redux/reducers/user/userSlice'
import { Constants } from '../../../constants/Constants'

const FinishSignup = ({ navigation, route }: { navigation: any, route: { params: { email: string, password: string } } }) => {

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => {
                return <HeaderBackButton onPress={() => navigation.goBack()} />
            },
            ...signupNavigationOptions
        })
    }, [])

    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<AppDispatch>();
    const isIos = Platform.OS === 'ios';
    const [otp, setOtp] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [otpError, setOtpError] = useState('');
    const [showDropDown, setShowDropDown] = useState(false);
    const [otpResent, setOtpResent] = useState(false);
    const [userDetails, setUserDetails] = useState({
        email: route.params.email,
        password: route.params.password,
        otp: otp,
        first_name: '',
        last_name: '',
        city: '',
        blood_group: 'a_negative',
        role: 'ROLE_USER',
    })
    const [formError, setFormError] = useState({
        first_name: '',
        last_name: '',
        city: '',
        blood_group: '',
    })


    const handleResentOtp = () => {
        if (otpResent) {
            setOtpError('Maximum OTP request reached, Try later');
            return;
        }
        setOtpResent(true);
        setOtpError('');
        setIsLoading(true);
        sendVerificationMail(route.params.email, Constants.CMD_SIGNUP)
            ?.then((response) => {
                setIsLoading(false);
                if (response.status === 'OK') {
                    setIsLoading(false);
                }
            })
            ?.catch((error) => {
                Alert.alert(error.message)
            })
            ?.finally(() => {
                setIsLoading(false);
            })
    }

    const handleOtpVerify = () => {
        setOtpError('');
        if (!otp || otp.length < 5) {
            setOtpError('Please enter a valid OTP');
            return;
        }
        if (!route.params.email) {
            setOtpError('Request expired, Restart signup again');
            return;
        }
        setIsLoading(true);
        verifyOtpForSignup(route.params.email, otp)
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

    const handleSignup = () => {
        setFormError({
            first_name: '',
            last_name: '',
            city: '',
            blood_group: '',
        });
        if (!userDetails.first_name) {
            setFormError(prev => ({ ...prev, first_name: 'Please enter first name' }));
            return;
        }
        if (!userDetails.last_name) {
            setFormError(prev => ({ ...prev, last_name: 'Please enter last name' }));
            return;
        }
        if (!userDetails.blood_group) {
            setFormError(prev => ({ ...prev, blood_group: 'Please select blood group' }));
        }
        dispatch(setIsCheckingLogin(true));
        signupRequest(userDetails)
            ?.then((response: any) => {
                dispatch(setIsCheckingLogin(true));
                if (response.status === 'OK') {
                    saveTokenToStorage(response?.body?.token);
                    navigation.reset({ index: 0, routes: [{ name: 'Home', params: { token: response?.body?.token } }] });
                }
            })
            ?.catch((error) => {
                dispatch(setIsCheckingLogin(false));
                if (error.status === 'BadRequestException') {
                    Alert.alert(error.message);
                }
            })
    }

    const onOtpChanged = (text: string) => {
        setOtp((prev) => text);
        setOtpError((prev) => '');
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
                behavior={Platform.OS === "ios" ? "height" : "height"}
                style={signupStyles.keyboardViewContainer}>
                <View style={[signupStyles.containerNonHeader]}>
                    {!isVerified &&
                        <React.Fragment>
                            <View style={signupStyles.borderPrimary} ></View>
                            <LargeHeadingTexts
                                text1='Complete'
                                text2='Sign-Up' ></LargeHeadingTexts>
                            <Text style={[signupStyles.subHeader, { width: 345 }]}>An OTP has been sent to your registered email <Text style={{ color: GlobalStyles.primaryColour, flexWrap: 'wrap' }}>{route.params.email}</Text></Text>
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
                                <Text style={[signupStyles.textLinkLeft, signupStyles.textLink]} onPress={() => navigation.navigate('Login')}> Change Email ?</Text>
                                <Text
                                    style={[
                                        signupStyles.textLinkLeft,
                                        signupStyles.textLink,
                                        otpResent ? { color: GlobalStyles.error } : { color: GlobalStyles.primaryColour }
                                    ]}
                                    onPress={() => handleResentOtp()}> Resend OTP </Text>
                            </View>
                        </React.Fragment>
                    }
                    {
                        isVerified &&

                        <React.Fragment>
                            <View style={signupStyles.borderPrimary} ></View>
                            <LargeHeadingTexts
                                text1='Enter Your'
                                text2='Details' ></LargeHeadingTexts>
                            <Text style={[signupStyles.subHeader, { width: 345 }]}>You are one step away from joining a large network of healh experts and clinics.</Text>
                            <PrimaryInput
                                onChangeText={(val) => setUserDetails((prev) => {
                                    setFormError((prev) => ({ ...prev, first_name: '' }));
                                    return { ...prev, first_name: val }
                                })}
                                errorText={formError.first_name}
                                inputMode='text'
                                placeholder='First Name *' />
                            <PrimaryInput
                                onChangeText={(val) => setUserDetails((prev) => {
                                    setFormError((prev) => ({ ...prev, last_name: '' }));
                                    return { ...prev, last_name: val }
                                })}
                                errorText={formError.last_name}
                                inputMode='text'
                                placeholder='Last Name *' />
                            <PrimaryInput
                                onChangeText={(val) => setUserDetails((prev) => {
                                    setFormError((prev) => ({ ...prev, city: '' }));
                                    return { ...prev, city: val }
                                })}
                                inputMode='text'
                                placeholder='City' />
                            <PrimaryDropdown
                                list={bloodGroupOptions}
                                label='Blood Group'
                                value={userDetails.blood_group}
                                setValue={(val) => setUserDetails((prev) => {
                                    setFormError((prev) => ({ ...prev, blood_group: '' }));
                                    return { ...prev, blood_group: val }
                                })}
                            />
                            <PrimaryButton
                                title='Continue'
                                isLoadingState={user.isCheckingLogin}
                                onPress={() => handleSignup()}>
                            </PrimaryButton>
                        </React.Fragment>
                    }

                </View>
                <View style={signupStyles.footer}>
                    <Image
                        source={require('../../../assets/images/login_bg.png')}
                        style={isIos ? signupStyles.bgImage : signupStyles.bgImageAndroid} />
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default FinishSignup