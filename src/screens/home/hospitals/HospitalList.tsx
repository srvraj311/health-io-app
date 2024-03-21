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
import GlobalStyles from '../../../styles/general/global_styles';
import { Cities } from '../../../service/hospital/cities';
import { List } from 'react-native-paper';
import HospitalBottomSheet from './hospitalList/HospitalBottomSheet';
import PrimaryInputWhite from '../../../components/input/PrimaryInputWhite';

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

    const getCitySelector = () => {
        return Object.entries(Cities)
            .map(([state, cities]) => {
                return <List.Accordion
                    id={state}
                    key={state}
                    title={state}
                >
                    {cities.map((city) => {
                        return <List.Item
                            key={city}
                            title={city}
                            onPress={() => {
                                setCityName(city);
                                setIsCitySelected(true);
                                bottomSheetRef.current?.close();
                            }}
                        />
                    })}
                </List.Accordion>
            })
    }

    if (!isCitySelected) {
        // bottomSheetRef.current?.close();
    }
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheet
                ref={bottomSheetRef}
                onChange={handleSheetChanges}
                keyboardBehavior='fillParent'
                index={0}
                snapPoints={['8%', '40%', '50%', '60%', '80%', '90%']}
                style={hStyles.bottomSheet}
                handleIndicatorStyle={{ backgroundColor: GlobalStyles.grey400, width: 60, height: 6 }}
                handleStyle={{ backgroundColor: GlobalStyles.grey100 }}
            >
                <BottomSheetView style={hStyles.contentContainer}>
                    <HospitalBottomSheet bottomSheetRef={bottomSheetRef} />
                </BottomSheetView>
            </BottomSheet>

            <View style={hStyles.container}>
                <View style={hStyles.header}>
                    <PrimaryInputWhite
                        placeholder='Search Hospital'
                        onChangeText={(text) => {
                            setSearchText(text);
                        }}
                    />
                    <View style={{ marginTop: 40 }}></View>
                    <Text> Heloo World </Text>
                    <Text> Heloo World </Text>
                    <Text> Heloo World </Text>
                    <Text> Heloo World </Text>
                    <Text> Heloo World </Text>
                    <Text> Heloo World </Text>
                    <Text> Heloo World </Text>
                    <Text> Heloo World </Text>
                    <Text> Heloo World </Text>
                    <Text> Heloo World </Text>
                    <Text> Heloo World </Text>
                    <Text> Heloo World </Text>
                    <Text> Heloo World </Text>
                    <Text> Heloo World </Text>
                    <Text> Heloo World </Text>
                    <Text> Heloo World </Text>
                    <Text> Heloo World </Text>

                </View>
            </View>

        </GestureHandlerRootView>
    )
}

export default HospitalList