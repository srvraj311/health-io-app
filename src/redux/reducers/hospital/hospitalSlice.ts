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
            state.filteredHospitalList = action.payload as any;
        },
        sortByName: (state, action: PayloadAction<string>) => {
            if (action.payload == 'asc') {
                state.filteredHospitalList.sort((a: HospitalCardType, b: HospitalCardType) => a.name.localeCompare(b.name))
            } else if (action.payload == 'desc') {
                state.filteredHospitalList.sort((a: HospitalCardType, b: HospitalCardType) => b.name.localeCompare(a.name))
            }
        },
        sortByRating: (state, action: PayloadAction<string>) => {
            if (action.payload == 'asc') {
                state.filteredHospitalList.sort((a: HospitalCardType, b: HospitalCardType) => a.rating?.localeCompare(b.rating))
            } else if (action.payload == 'desc') {
                state.filteredHospitalList.sort((a: HospitalCardType, b: HospitalCardType) => b.rating?.localeCompare(a.rating))
            }
        },
        sortByDistance: (state, action: PayloadAction<string>) => {
            if (action.payload == 'asc') {
                state.filteredHospitalList.sort((a: HospitalCardType, b: HospitalCardType) => a.distance.localeCompare(b.distance))
            } else if (action.payload == 'desc') {
                state.filteredHospitalList.sort((a: HospitalCardType, b: HospitalCardType) => b.distance.localeCompare(a.distance))
            }
        },
        filterHighRated: (state, action: PayloadAction<boolean>) => {
            if (action.payload) {
                state.filteredHospitalList = state.hosiptalList?.filter((hospital: HospitalCardType) => Number(hospital.rating) >= 4) as any
            }    
        },
        filterGovernment: (state, action: PayloadAction<boolean>) => {
            if (action.payload) {
                // state.filteredHospitalList = state.hosiptalList?.filter((hospital: HospitalCardType) => hospital.) as any
            }
        }
       
    },
    extraReducers(builder) {
        builder
            .addCase(getHospitalsAsync.fulfilled, (state, action: PayloadAction<{hospitals: HospitalCardType[]}>) => {
                if (action.payload.hospitals) {
                    action.payload.hospitals.forEach((hospital: HospitalCardType) => {
                        hospital.rating = String((Math.random() * 5).toFixed(1)),
                        hospital.distance = String((Math.random() * 60).toFixed(0) + ' min')
                    })
                    state.hosiptalList = action.payload.hospitals
                    state.filteredHospitalList = action.payload.hospitals as any
                } // = action.payload.hospitals;
                state.isFetching = false;
            })
            .addCase(getHospitalsAsync.pending, (state) => {
                state.isFetching = true;
            })
            .addCase(getHospitalsAsync.rejected, (state) => {
                state.hosiptalList = null as any;
                setFilteredHospitalList([])
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

export const { setCityName, setSelectedOption , setFilteredHospitalList, sortByName, sortByRating, sortByDistance, filterHighRated, filterGovernment} = hospitalState.actions
export default hospitalState.reducer;