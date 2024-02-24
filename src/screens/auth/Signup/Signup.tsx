import { View, Text, ImageComponent, Image, TextInput, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeadingTexts from '../../../components/common/HeadingTexts'
import PrimaryButton from '../../../components/buttons/PrimaryButton'
import Svg, { err } from 'react-native-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalStyles from '../../../styles/general/global_styles'
import { loginUser, saveTokenToStorage, validateEmailWithApi } from '../../../service/auth/authService'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/navigation'
import Login from '../Login/Login'
import { signupNavigationOptions, signupStyles } from '../../../styles/components/SignupStyles'
import LargeHeadingTexts from '../../../components/common/LargeHeadingTexts';
import HeaderBackButton from '../../../components/buttons/HeaderBackButton';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/reducers/user/userStore';
import { login, setEmail, setIsCheckingLogin, setToken, setUser } from '../../../redux/reducers/user/userSlice';
import LottieView from 'lottie-react-native';

type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>

const Signup = ({ route }: SignupProps): JSX.Element => {
    const [email, setStateEmail]: [string, React.Dispatch<string>] = useState(route.params.email);
    const [isUserExists, setIsUserExists]: [boolean, React.Dispatch<boolean>] = useState(route.params.isUserExists);
    const [password, setPassword]: [string, React.Dispatch<string>] = useState('');
    const isIos = Platform.OS === 'ios';
    // How we can get the state
    const user = useSelector((state: RootState) => state.user);

    // How we can call the reducers
    const dispatch = useDispatch<AppDispatch>();

    // setIsUserExists(false)
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    useEffect(() => {
        handleNavigationSetup();
    }, [isUserExists])



    const onCreateAccountPressed = () => {

    }

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
        loginUser(email, password)
            ?.then((response: any) => {
                if (response.status === 'OK') {
                    if (response?.body?.token) {
                        console.log(response?.body?.token)
                        saveTokenToStorage(response?.body?.token);
                        // Update all states in Redux stores
                        dispatch(login());
                        dispatch(setEmail(email));
                        navigation.reset({ index: 0, routes: [{ name: 'Home', params: { token: response?.body?.token } }] });
                    }
                }
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
                                    style={signupStyles.subHeader}>The right choice for health care needs</Text>
                                <TextInput
                                    onChangeText={val => setPassword(val)}
                                    secureTextEntry={true}
                                    placeholderTextColor={GlobalStyles.grey500}

                                    placeholder='Enter your password' style={signupStyles.input} />
                                <PrimaryButton
                                    title='Login'
                                    isLoadingState={user.isCheckingLogin}
                                    onPress={() => { onLoginPressed(email) }}></PrimaryButton>
                                <View style={signupStyles.textLinkContainer}>
                                    <Text style={[signupStyles.textLinkLeft, signupStyles.textLink]} onPress={() => navigation.navigate('Login')}> Forgot Password ?</Text>
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
                                <Text style={[signupStyles.subHeader, { width: 345 }]}> It must have 8+ characters, a lower and upper case letter, a number and a symbol. </Text>
                                <TextInput
                                    // onChangeText={val => setEmail(val)}
                                    secureTextEntry={true}
                                    placeholderTextColor={GlobalStyles.grey500}
                                    placeholder='Enter new password' style={signupStyles.input} />
                                <TextInput
                                    secureTextEntry={true}
                                    // onChangeText={val => setEmail(val)}
                                    placeholderTextColor={GlobalStyles.grey500}
                                    placeholder='Re-enter new password' style={signupStyles.input} />
                                <PrimaryButton
                                    title='Continue'
                                    onPress={() => { onCreateAccountPressed() }}></PrimaryButton>
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