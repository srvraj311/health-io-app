import { User } from "../models/User";
import SplashScreen from '../screens/SplashScreen';

export type RootStackParamList = {

    Login: undefined;
    Signup: {
        email: string;
        isUserExists: boolean;
    }
    Home: {
        token: string
    },
    Details: { userId: string };
    SplashScreen: undefined
};