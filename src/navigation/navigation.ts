export type RootStackParamList = {

    Login: undefined;
    Signup: {
        email: string;
        isUserExists: boolean;
    }
    Home: undefined;
    Details: { userId: string };
};