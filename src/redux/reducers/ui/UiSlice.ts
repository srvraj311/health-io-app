import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type UiReduxState = {
    snackBarVisible: boolean,
    dialogVisible: boolean,
    snackBarMessage: boolean
}

const initialState = {
    snackBarVisible: false,
    dialogVisible: false,
    snackBarMessage: ''
}

const UiSlice = createSlice({
    name: "ui",
    initialState: initialState,
    reducers: {
        setSnackBarVisible: (state, action: PayloadAction<{ visible: boolean, message: string }>) => {
            state.snackBarVisible = action.payload.visible
            state.snackBarMessage = action.payload.message

            setTimeout(() => {
                state.snackBarVisible = false
                state.snackBarMessage = ''
            }, 3000)
        },
        setDialogVisible: (state, action: PayloadAction<boolean>) => {
            state.dialogVisible = action.payload
        }
    }
})


export const { setSnackBarVisible, setDialogVisible } = UiSlice.actions
export default UiSlice.reducer;