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
    Details: undefined;
    SplashScreen: undefined,
    FinishSignup: {
        email: string,
        password: string
    },
    ForgotPassword: {
        email: string
    }
};