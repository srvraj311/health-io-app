import { View, Text, ImageComponent, Image, TextInput, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeadingTexts from '../../../components/common/HeadingTexts'
import PrimaryButton from '../../../components/buttons/PrimaryButton'
import Svg, { err } from 'react-native-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalStyles from '../../../styles/general/global_styles'
import { loginUser, saveTokenToStorage, sendVerificationMail, validateEmailWithApi, validatePassword } from '../../../service/auth/authService'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/navigation'
import Login from '../Login/Login'
import { signupNavigationOptions, signupStyles } from '../../../styles/components/SignupStyles'
import LargeHeadingTexts from '../../../components/common/LargeHeadingTexts';
import HeaderBackButton from '../../../components/buttons/HeaderBackButton';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/reducers/user/userStore';
import { isLoggedInAsync, login, setEmail, setIsCheckingLogin, setUser } from '../../../redux/reducers/user/userSlice';
import LottieView from 'lottie-react-native';
import PrimaryInput from '../../../components/input/PrimaryInput';
import { Constants } from '../../../constants/Constants';
import { tokens } from 'react-native-paper/lib/typescript/styles/themes/v3/tokens';

type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>

const Signup = ({ route }: SignupProps): JSX.Element => {
    const [email, setStateEmail]: [string, React.Dispatch<string>] = useState(route.params.email);
    const [isUserExists, setIsUserExists]: [boolean, React.Dispatch<boolean>] = useState(route.params.isUserExists);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const isIos = Platform.OS === 'ios';
    // How we can get the state
    const user = useSelector((state: RootState) => state.user);
    // How we can call the reducers
    const dispatch = useDispatch<AppDispatch>();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    const [passwordError, setPasswordError] = useState('');
    const isPasswordError = passwordError && passwordError.length > 0;
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        handleNavigationSetup();
    }, [isUserExists])

    const handleNavigationSetup = () => {
        if (!isUserExists) {
            navigation.setOptions({
                headerLeft: () => {
                    return <HeaderBackButton onPress={() => navigation.goBack()} />
                },
                ...signupNavigationOptions
            })
        }
    }

    const getContainerStyle = () => {
        const styles = []
        if (!isUserExists) {
            styles.push(signupStyles.containerNonHeader);
        } else {
            if (isIos) {
                styles.push(signupStyles.containerIos);
            } else {
                styles.push(signupStyles.containerAndoroid);
            }
        }

        return styles;
    }

    const onLoginPressed = (email: string) => {
        dispatch(setIsCheckingLogin(true));
        if (!password) {
            dispatch(setIsCheckingLogin(false));
            setPasswordError('Password is required');
            return;
        }
        loginUser(email, password)
            ?.then((response: any) => {
                if (response.status === 'OK') {
                    if (response?.body?.token) {
                        console.log(response?.body?.token)
                        saveTokenToStorage(response?.body?.token);
                        // Update all states in Redux stores
                        dispatch(isLoggedInAsync(response?.body?.token));
                        dispatch(setEmail(email));
                        navigation.reset({ index: 0, routes: [{ name: 'SplashScreen', params: { token: response?.body?.token } }] });
                    }
                }
                dispatch(setIsCheckingLogin(false));
            })?.catch((error) => {
                if (error.status === 'BadCredentialsException') {
                    Alert.alert("The password you entered is incorrect");
                } else if (error.status === 'BadRequestException') {
                    Alert.alert(error.message);
                }
            }).finally(() => {
                dispatch(setIsCheckingLogin(false));
            })
    }

    const onCreateAccountPressed = () => {
        const error = validatePassword(password);
        if (error) {
            setPasswordError((prev) => error)
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError((prev) => 'Passwords do not match')
            return;
        }
        setIsLoading(true);
        sendVerificationMail(email, Constants.CMD_SIGNUP)
            ?.then((response) => {
                setIsLoading(false);
                if (response.status === 'OK') {
                    dispatch(setIsCheckingLogin(false));
                    navigation.push('FinishSignup', {
                        email: email,
                        password: password
                    })
                }
                setIsLoading(false);
            })
            ?.catch((error) => {
                Alert.alert(error.message)
            })
            ?.finally(() => {
                setIsLoading(false);
            })
    }

    const onPasswordTextChanged = (text: string) => {
        setPassword((prev) => {
            return text
        });

        setPasswordError((prev) => {
            return ''
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
                    {
                        // When user exists
                        isUserExists && (
                            <React.Fragment>
                                <Image style={signupStyles.image} source={
                                    require('../../../assets/images/icon.png')
                                } />
                                <HeadingTexts
                                    text1='Welcome to'
                                    text2='Health.IO' ></HeadingTexts>
                                <Text
                                    style={signupStyles.subHeader}>Loging in as <Text style={{ color: GlobalStyles.primaryColour }} >{email}</Text></Text>
                                <PrimaryInput
                                    onChangeText={val => setPassword(val)}
                                    errorText={passwordError}
                                    secureTextEntry={true}
                                    placeholder='Enter your password' />
                                <PrimaryButton
                                    title='Login'
                                    isLoadingState={user.isCheckingLogin}
                                    onPress={() => { onLoginPressed(email) }}></PrimaryButton>
                                <View style={signupStyles.textLinkContainer}>
                                    <Text style={[signupStyles.textLinkLeft, signupStyles.textLink]} onPress={() => navigation.navigate('ForgotPassword', { email: route.params.email })}> Forgot Password ?</Text>
                                    <Text style={[signupStyles.textLinkLeft, signupStyles.textLink]} onPress={() => navigation.navigate('Login')}> Change Email</Text>
                                </View>
                            </React.Fragment>
                        )

                    }
                    {
                        // When user is new
                        !isUserExists && (
                            <React.Fragment>
                                <View style={signupStyles.borderPrimary} ></View>
                                <LargeHeadingTexts
                                    text1='Set your'
                                    text2='Password' ></LargeHeadingTexts>
                                <Text style={[signupStyles.subHeader, { width: 345 }]}>You are signing up as a new user with <Text style={{ color: GlobalStyles.primaryColour, flexWrap: 'wrap' }}>{email}</Text></Text>
                                <PrimaryInput
                                    onChangeText={(val: any) => onPasswordTextChanged(val)}
                                    secureTextEntry={true}
                                    errorText={passwordError}
                                    placeholder='Enter new password' />
                                <PrimaryInput
                                    secureTextEntry={true}
                                    onChangeText={val => setConfirmPassword(val)}
                                    placeholder='Re-enter new password' />
                                <PrimaryButton
                                    isLoadingState={isLoading}
                                    title='Continue'
                                    onPress={() => { onCreateAccountPressed() }}></PrimaryButton>
                                <View style={signupStyles.textLinkContainer}>
                                    <Text style={[signupStyles.textLinkLeft, signupStyles.textLink]} onPress={() => navigation.navigate('Login')}> Change Email ?</Text>
                                </View>

                            </React.Fragment>
                        )
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

export default Signup