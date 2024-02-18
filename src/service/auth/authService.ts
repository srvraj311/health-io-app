import { Alert } from 'react-native';
import { ApiEndpoints } from '../../constants/Constants';
import { get, post } from '../api/apiService'

const validateEmail = (email: string) => {
    // const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(email).toLowerCase());
    return true;
}

const validateEmailWithApi = (email: string) => {
    email = email.toLowerCase();
    if (validateEmail(email)) {
        return post(ApiEndpoints.VALIDATE, { email: email })
    } else {
        Alert.alert("Email invalid")
    }
}


export { validateEmailWithApi }