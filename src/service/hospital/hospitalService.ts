import AsyncStorage from "@react-native-async-storage/async-storage"

export const getCityNameFromStorage = (): Promise<string | null> => {
    return AsyncStorage.getItem('cityName');
}




