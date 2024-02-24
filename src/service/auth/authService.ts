import { Alert } from 'react-native';
import { ApiEndpoints } from '../../constants/Constants';
import { get, post } from '../api/apiService'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch, RootState, userStore } from '../../redux/reducers/user/userStore';


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

const getTokenFromStorage = () => {
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


export { validateEmailWithApi, loginUser, validateTokenAndGetUser, saveTokenToStorage, getTokenFromStorage, removeTokenFromStorage }