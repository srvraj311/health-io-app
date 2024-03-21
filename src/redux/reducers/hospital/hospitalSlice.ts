import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Constants } from "../../../constants/Constants"

export type HospitalState = {
    cityName: string,
    optionSelected: string
}


const hospitalState = createSlice({
    name: 'hospital',
    initialState: {
        cityName: '',
        optionSelected: Constants.OPTION_FILTER
    },
    reducers: {
        setCityName: (state, action: PayloadAction<string>) => {
            state.cityName = action.payload
        },
        setSelectedOption: (state, action: PayloadAction<string>) => {
            state.optionSelected = action.payload
        }
    }
})


export const { setCityName, setSelectedOption } = hospitalState.actions
export default hospitalState.reducer;