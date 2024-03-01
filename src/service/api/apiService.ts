import axios from 'axios';
import { Constants } from '../../constants/Constants';
import { Alert } from 'react-native';
import { getTokenFromStorage } from '../auth/authService';

const BASE_URL = Constants.BASE_URL;

interface AxiosConfig {
    headers?: {
        [key: string]: string;
    };
    params?: {
        [key: string]: string;
    }
    // Add other axios config options as needed
}

interface ApiResponse {
    status: string,
    body?: {
        message?: string
    },
    error?: {
        message?: string, status?: string
    }
    // Add other response properties as needed
}

async function makeRequest<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE', // Add other supported methods
    url: string,
    data?: any, // Use specific types for data depending on the API endpoint
    config?: AxiosConfig
): Promise<ApiResponse> {
    let token = await getTokenFromStorage();
    let finalConfig;
    if (token) {
        finalConfig = getAuthConfig(token, config);
    } else {
        finalConfig = getNormalConfig(config);
    }

    console.log('Payload : ' + JSON.stringify(data));
    console.log('Config : ' + JSON.stringify(finalConfig));

    return axios({
        method,
        url: `${BASE_URL}${url}`,
        data,
        ...finalConfig
    })
        .then((response) => {
            console.log('Response : ' + JSON.stringify(response?.data));
            return response?.data
        })
        .catch((error) => {
            if (error?.response.data.error.message) {
                console.log('Known Error : ' + JSON.stringify(error.response.data));
                console.log(error.response.data);
                // Alert.alert(error.response.data.error.message);
                throw error.response.data.error; // Re-throw for caller handling
                return;
            }

            if (error?.message) {
                console.log('Unknown Error : ' + JSON.stringify(error));
                // Alert.alert(error.message);
                throw error; // Re-throw for caller handling
                return;
            }

            console.log('Unknown Error : ' + JSON.stringify(error));
            // Undefined error
            Alert.alert(error);
            throw new Error(error); // Re-throw for caller handling
        });
}

function getAuthConfig(token: string, config?: AxiosConfig): AxiosConfig {
    return {
        ...config,
        headers: {
            'Content-Type': 'application/json',
            ...config?.headers,
            Authorization: `Bearer ${token}`,
        },
        params: {
            ...config?.params
        }
    };
}

function getNormalConfig(config?: AxiosConfig): AxiosConfig {
    return {
        ...config,
        headers: {
            'Content-Type': 'application/json',
            ...config?.headers,
        },
        params: {
            ...config?.params
        }
    };
}


export function get(url: string, data?: any, config?: any): Promise<ApiResponse> {
    return makeRequest('GET', url, data, config);
}

export function post(url: string, data?: any, config?: any): Promise<ApiResponse> {
    return makeRequest('POST', url, data, config);
}

export function put(url: string, data?: any, config?: any): Promise<ApiResponse> {
    return makeRequest('PUT', url, data, config);
}

export function del(url: string, data?: any, config?: any): Promise<ApiResponse> {
    return makeRequest('DELETE', url, data, config);
}


