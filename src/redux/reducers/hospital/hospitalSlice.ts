import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export type HospitalState = {
    cityName: string,
}


const hospitalState = createSlice({
    name: 'hospital',
    initialState: {
        cityName: ''
    },
    reducers: {
        setCityName: (state, action: PayloadAction<string>) => {
            state.cityName = action.payload
        }
    }
})


export const { setCityName } = hospitalState.actions
export default hospitalState.reducer;