import { HospitalCardType } from "../redux/reducers/hospital/hospitalSlice";

export type RootStackParamList = {

    Login: undefined;
    Signup: {
        email: string;
        isUserExists: boolean;
    }
    Home: undefined,
    Details: undefined;
    SplashScreen: undefined,
    FinishSignup: {
        email: string,
        password: string
    },
    ForgotPassword: {
        email: string
    },
    HospitalDetails: {
        hospital: HospitalCardType
    }
};