import { Alert } from 'react-native';
import { ApiEndpoints } from '../../constants/Constants';
import { get, post } from '../api/apiService'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch, RootState, userStore } from '../../redux/reducers/user/userStore';
import { UserDetails } from '../../models/UserDetails';


const validateEmail = (email: string) => {
    // const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(email).toLowerCase());
    return true;
}

const loginUser = (email: string, password: string) => {
    email = email.toLowerCase();
    if (!password) {
        Alert.alert("Please enter password");
        return;
    }
    if (!validateEmail(email)) {
        Alert.alert("Email invalid")
        return;
    }
    return post(ApiEndpoints.LOGIN, { email: email, password: password })
}

const validateEmailWithApi = (email: string) => {
    email = email.toLowerCase();
    if (validateEmail(email)) {
        return post(ApiEndpoints.VALIDATE, { email: email })
    } else {
        Alert.alert("Email invalid")
    }
}

const saveTokenToStorage = (token: string) => {
    AsyncStorage.setItem("token", token);
}

const getTokenFromStorage = async () => {
    return AsyncStorage.getItem("token");
}

const removeTokenFromStorage = () => {
    AsyncStorage.removeItem("token");
}

const validateTokenAndGetUser = (token: string) => {
    return get(ApiEndpoints.VALIDATE, undefined, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
}

const validatePassword = (password: string) => {
    if (password === '') {
        return 'Password must not be empty';
    }

    if (password.length < 8) {
        return 'Password must be at least 8 characters';
    }

    const doesContainCapitalAlphabetRegex = /[A-Z]/;
    if (!doesContainCapitalAlphabetRegex.test(password)) {
        return 'Must include capital alphabets';
    }

    const doesContainSmallAlphabetsRegex = /[a-z]/;
    if (!doesContainSmallAlphabetsRegex.test(password)) {
        return 'Must include small alphabets';
    }

    const doesContainSpecialCharactersRegex = /[^A-Za-z0-9]/;
    if (!doesContainSpecialCharactersRegex.test(password)) {
        return 'Must include special characters';
    }

    const doesContainsNumberRegex = /[0-9]/;
    if (!doesContainsNumberRegex.test(password)) {
        return 'Must include numbers';
    }

    return '';
}


const sendVerificationMail = (email: string, command: string) => {
    return post(ApiEndpoints.SEND_OTP, {}, {
        params: {
            email: email,
            command: command
        }
    })
}

const verifyOtpForSignup = (email: string, otp: string) => {
    return post(ApiEndpoints.VERIFY_OTP, {}, {
        params: {
            email: email,
            otp: otp,
            command: 'signup'
        }
    })
}

const updatePassword = (email: string, password: string) => {
    return post(ApiEndpoints.FORGOT_PASSWORD, {
        email: email,
        password: password,
    })
}

/**
 * Sends a signup request with the given user details.
 *
 * @param {UserDetails} userDetails - the user details to be sent in the request
 * @return {type} the result of the signup request
 */
const signupRequest = (userDetails: UserDetails) => {
    return post(ApiEndpoints.SIGNUP, userDetails)
}

const getCityNameFromApi = () => {
    return get(ApiEndpoints.GET_CITIES)
}

export {
    validateEmailWithApi,
    loginUser,
    validateTokenAndGetUser,
    saveTokenToStorage,
    getTokenFromStorage,
    removeTokenFromStorage,
    validatePassword,
    sendVerificationMail,
    verifyOtpForSignup,
    signupRequest,
    updatePassword,
    getCityNameFromApi
}