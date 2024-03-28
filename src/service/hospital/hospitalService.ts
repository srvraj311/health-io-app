import AsyncStorage from "@react-native-async-storage/async-storage"
import { Alert } from "react-native";
import { post } from "../api/apiService";
import { ApiEndpoints } from "../../constants/Constants";

export const getCityNameFromStorage = (): Promise<string | null> => {
    return AsyncStorage.getItem('cityName');
}

export const setCityNameToStorage = (cityName: string) => {
    AsyncStorage.setItem('cityName', cityName);
}

export const getHospitalsFromApi = (cityName: string) => {
    if (!cityName) {
        Alert.alert("No city is selected, Select from bottom");
    }

    return post(ApiEndpoints.GET_HOSPITALS_BY_CITY, {} , {
        params : {
            city_name: cityName
        }
    })
}




