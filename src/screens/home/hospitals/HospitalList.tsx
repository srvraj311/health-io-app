import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getCityNameFromStorage } from '../../../service/hospital/hospitalService';
import { AppDispatch, RootState } from '../../../redux/reducers/user/userStore';
import { useDispatch, useSelector } from 'react-redux';
import { setCityName } from '../../../redux/reducers/hospital/hospitalSlice';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { hStyles } from '../../../styles/components/HospitalStyles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PrimaryInput from '../../../components/input/PrimaryInput';
import { Chip } from 'react-native-paper';

const HospitalList = () => {

    const hospitalState = useSelector((state: RootState) => state.hospital);
    const dispatch = useDispatch<AppDispatch>();

    const [isCitySelected, setIsCitySelected] = useState(hospitalState.cityName !== '');
    const [cityName, setCityName] = useState('');

    const [searchText, setSearchText] = useState('');



    useEffect(() => {
        getCityNameFromStorage().then((city: string | null) => {
            if (city) {
                setCityName(city);
            } else {
                setCityName('');
            }
        })
    })

    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    if (!isCitySelected) {
        bottomSheetRef.current?.close();
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={hStyles.container}>
                <BottomSheet
                    detached
                    ref={bottomSheetRef}
                    onChange={handleSheetChanges}
                    index={0}
                    enablePanDownToClose
                    snapPoints={['100%']}
                    enableDynamicSizing
                    style={hStyles.bottomSheet}
                >
                    <BottomSheetView style={hStyles.contentContainer}>
                        <Text>Awesome 🎉</Text>
                    </BottomSheetView>
                </BottomSheet>
                <View style={hStyles.header}>
                    <PrimaryInput
                        placeholder='Search Hospital'
                        onChangeText={(text) => {
                            setSearchText(text);
                        }}
                    />
                    <View style={hStyles.filterContainer}>
                        <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
                        <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
                        <Chip icon="information" onPress={() => console.log('Pressed')}>Example Chip</Chip>
                    </View>
                </View>
            </View>

        </GestureHandlerRootView>
    )
}

export default HospitalList