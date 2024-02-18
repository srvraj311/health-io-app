import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface CurrentUserState {
    email: string
    isLoggedIn: boolean,
    isCheckingLogin: boolean
}

const initialState: CurrentUserState = {
    email: '',
    isLoggedIn: false,
    isCheckingLogin: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state) => {
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.isLoggedIn = false;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        }
    },
    // All sync reducers below
    extraReducers: (builder) => {
        builder.addCase(isLoggedInAsync.fulfilled, (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
            // action.payload is true that we returned in the async function
            state.isCheckingLogin = false
        })
            // We can have a case for pending and rejected
            .addCase(isLoggedInAsync.pending, (state) => {
                state.isCheckingLogin = true
            })
            // Rejected case
            .addCase(isLoggedInAsync.rejected, (state) => {
                state.isCheckingLogin = false
                state.isLoggedIn = false
            })
    }
})

export const isLoggedInAsync = createAsyncThunk(
    "user/checkIsLoggedIn",
    async (): Promise<boolean> => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        return true;
    }
);

export const { login, logout, setEmail } = userSlice.actions;
export default userSlice.reducer;