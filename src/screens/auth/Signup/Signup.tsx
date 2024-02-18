import { View, Text, ImageComponent, Image, TextInput, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeadingTexts from '../../../components/common/HeadingTexts'
import PrimaryButton from '../../../components/buttons/PrimaryButton'
import Svg from 'react-native-svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalStyles from '../../../styles/general/global_styles'
import { validateEmailWithApi } from '../../../service/auth/authService'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../navigation/navigation'
import Login from '../Login/Login'
import { signupNavigationOptions, signupStyles } from '../../../styles/components/SignupStyles'
import LargeHeadingTexts from '../../../components/common/LargeHeadingTexts';
import HeaderBackButton from '../../../components/buttons/HeaderBackButton';

type SignupProps = NativeStackScreenProps<RootStackParamList, 'Signup'>

const Signup = ({ route }: SignupProps): JSX.Element => {
    const [email, setEmail]: [string, React.Dispatch<string>] = useState(route.params.email);
    const [isUserExists, setIsUserExists]: [boolean, React.Dispatch<boolean>] = useState(route.params.isUserExists);
    const isIos = Platform.OS === 'ios';

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

    }

    return (

        <KeyboardAvoidingView behavior='padding' style={signupStyles.keyboardViewContainer}>
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
                                // onChangeText={val => setEmail(val)}
                                secureTextEntry={true}
                                placeholderTextColor={GlobalStyles.grey500}
                                placeholder='Enter your password' style={signupStyles.input} />
                            <PrimaryButton
                                title='Login'
                                onPress={() => { onLoginPressed(email) }}></PrimaryButton>
                            <View style={signupStyles.textLinkContainer}>
                                <Text
                                    style={signupStyles.textLinkLeft}>Don't have an account ?</Text>
                                <Text style={[signupStyles.textLinkLeft, signupStyles.textLink]} onPress={() => navigation.navigate('Login')}> Go Back</Text>
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
                            <Text style={signupStyles.subHeader}>It must have 8+ characters, a lower and upper case letter, a number and a symbol. </Text>
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

                <Image
                    source={require('../../../assets/images/login_bg.png')}
                    style={isIos ? signupStyles.bgImage : signupStyles.bgImageAndroid} />
            </View>
        </KeyboardAvoidingView>
    )
}

export default Signup