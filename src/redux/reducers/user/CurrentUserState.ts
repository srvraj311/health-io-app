import { User } from "../../../models/User";

export interface CurrentUserState {
    email: string,
    user: User,
    isLoggedIn: boolean,
    isCheckingLogin: boolean,
}