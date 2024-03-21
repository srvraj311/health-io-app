import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { AppDispatch, RootState } from '../../../../redux/reducers/user/userStore';
import { useDispatch, useSelector } from 'react-redux';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';
import PrimaryOutlinedButton from '../../../../components/buttons/PrimaryOutlinedButton';
import { Constants } from '../../../../constants/Constants';
import { setSelectedOption } from '../../../../redux/reducers/hospital/hospitalSlice';
import FilterComponent from './FilterComponent';
import SelectCityComponent from './SelectCityComponent';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

const HospitalBottomSheet = (props: { bottomSheetRef: React.RefObject<BottomSheetMethods> }) => {

    const hospitalState = useSelector((state: RootState) => state.hospital);
    const dispatch = useDispatch<AppDispatch>();

    const onPressFilter = () => {
        dispatch(setSelectedOption(Constants.OPTION_FILTER));
    }
    const onPressSelectCity = () => {
        dispatch(setSelectedOption(Constants.OPTION_SELECT_CITY));
    }

    return (
        <View style={styles.container}>
            <Text style={styles.cityName}>{hospitalState.cityName || 'No City Selected'}</Text>
            <View style={styles.subContainer}>
                <PrimaryOutlinedButton
                    disabled={hospitalState.optionSelected !== Constants.OPTION_FILTER}
                    icon='filter' width='170' title="Filter"
                    onPress={() => onPressFilter()} />
                <PrimaryOutlinedButton
                    disabled={hospitalState.optionSelected !== Constants.OPTION_SELECT_CITY}
                    icon='map-marker' width='170' title={hospitalState.cityName || 'Select City'}
                    onPress={() => onPressSelectCity()} />
            </View>
            <View style={styles.bottomSheetContainer}>
                {hospitalState.optionSelected === Constants.OPTION_FILTER && <FilterComponent {...props} />}
                {hospitalState.optionSelected === Constants.OPTION_SELECT_CITY && <SelectCityComponent {...props} />}
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    cityName: {
        fontSize: 12,
    },
    subContainer: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 26
    },
    bottomSheetContainer: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        marginTop: 100
    }

})

export default HospitalBottomSheet