import { PayloadAction, createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit"
import { User } from '../../../models/User';
import { removeTokenFromStorage, saveTokenToStorage, validateTokenAndGetUser } from "../../../service/auth/authService";
import { CurrentUserState } from "./CurrentUserState";

const initialState: CurrentUserState = {
    email: '',
    user: null as any, // Empty user :,
    isLoggedIn: false,
    isCheckingLogin: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
        },
        setIsCheckingLogin: (state, action: PayloadAction<boolean>) => {
            state.isCheckingLogin = action.payload
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null as any;
            state.email = '';
            state.isCheckingLogin = false;
            removeTokenFromStorage();
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
        }
    },
    // All async reducers below
    extraReducers: (builder) => {
        builder
            .addCase(isLoggedInAsync.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
                state.isLoggedIn = action.payload.status
                if (action.payload.user) {
                    state.user = action.payload.user
                }
                // action.payload is true that we returned in the async function
                state.isCheckingLogin = false
            })
            // Pending
            .addCase(isLoggedInAsync.pending, (state) => {
                state.isCheckingLogin = true
            })
            // Rejected 
            .addCase(isLoggedInAsync.rejected, (state) => {
                state.isCheckingLogin = false
                state.isLoggedIn = false
            })
    }
})
interface LoginResponse {
    status: boolean,
    user?: User
}

// Call this function from entry level component
export const isLoggedInAsync = createAsyncThunk(
    "user/checkIsLoggedIn",
    async (token: string): Promise<LoginResponse> => {
        return new Promise((resolve, reject) => {
            if (!token) {
                return reject({
                    status: false
                })
            }
            validateTokenAndGetUser(token)
                ?.then((response: any) => {
                    if (response.status === 'OK') {
                        resolve({
                            status: true,
                            user: response?.body?.user
                        })
                    } else {
                        reject({
                            status: false
                        })
                    }
                })?.catch((error) => {
                    reject({
                        status: false
                    })
                })
        })
    }
);

export const { login, logout, setEmail, setUser, setIsCheckingLogin } = userSlice.actions;
export default userSlice.reducer;