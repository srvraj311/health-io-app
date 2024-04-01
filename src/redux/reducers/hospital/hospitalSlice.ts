import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Constants } from "../../../constants/Constants"
import { getCityNameFromStorage, getHospitalsFromApi, setCityNameToStorage } from "../../../service/hospital/hospitalService"

export type HospitalState = {
    cityName: string,
    optionSelected: string,
    hosiptalList: HospitalCardType[],
    filteredHospitalList: HospitalCardType[],
    isFetching: boolean,
}

export type HospitalCardType = {
    name: string,
    city: string,
    address: string,
    icon: string,
    distance: string,
    rating: string,
    id: string
}


const hospitalState = createSlice({
    name: 'hospital',
    initialState: {
        cityName: '',
        optionSelected: Constants.OPTION_FILTER,
        hosiptalList: null as any,
        filteredHospitalList: [],
        isFetching: false
    },
    reducers: {
        setCityName: (state, action: PayloadAction<string>) => {
            if (state.cityName === action.payload) return
            if (action.payload === '') return
            setCityNameToStorage(action.payload);
            state.cityName = action.payload
        },
        setSelectedOption: (state, action: PayloadAction<string>) => {
            state.optionSelected = action.payload
        },
        setFilteredHospitalList: (state, action: PayloadAction<HospitalCardType[]>) => {
            
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getHospitalsAsync.fulfilled, (state, action: PayloadAction<{hospitals: HospitalCardType[]}>) => {
                if (action.payload.hospitals) {
                    state.hosiptalList = action.payload.hospitals
                } // = action.payload.hospitals;
                state.isFetching = false;
            })
            .addCase(getHospitalsAsync.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(getHospitalsAsync.rejected, (state) => {
                state.hosiptalList = null as any;
                state.isFetching = false;
            })
            
    },
})


export const getHospitalsAsync = createAsyncThunk(
    'hospital/getHospitalsAsync',
    async (cityName: string): Promise<{hospitals: HospitalCardType[]}> => {
        return new Promise((resolve, reject) => {
            getHospitalsFromApi(cityName)
                .then((response: any) => {
                    if (response.status === 'OK') {
                        resolve({hospitals : response?.body?.hospitals})
                    } else {
                        reject(response)
                    }
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }
)

export const { setCityName, setSelectedOption } = hospitalState.actions
export default hospitalState.reducer;