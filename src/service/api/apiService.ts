import axios from 'axios';
import { Constants } from '../../constants/Constants';
import { Alert } from 'react-native';

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

function makeRequest<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE', // Add other supported methods
    url: string,
    data?: any, // Use specific types for data depending on the API endpoint
    config?: AxiosConfig
): Promise<ApiResponse> {
    let cnf: AxiosConfig = {
        ...config,
        headers: {
            ...config?.headers,
            'Content-Type': 'application/json',
        },
        params: {
            ...config?.params
        }
    }
    console.log('Payload : ' + JSON.stringify(data));
    if (config) {
        console.log(config)
    }
    return axios({
        method,
        url: `${BASE_URL}${url}`,
        data,
        ...cnf
    })
        .then((response) => {
            console.log('Response : ' + JSON.stringify(response?.data));
            return response?.data
        })
        .catch((error) => {
            console.log(JSON.stringify(error.message))
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


