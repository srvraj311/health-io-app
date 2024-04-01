import { StyleSheet, Text, View, useColorScheme } from 'react-native'
import React, { Children, useState } from 'react'
import PrimaryInputWhite from '../../../../components/input/PrimaryInputWhite'
import { List } from 'react-native-paper'
import { Cities } from '../../../../service/hospital/cities'
import { ScrollView } from 'react-native-gesture-handler'
import { AppDispatch, RootState } from '../../../../redux/reducers/user/userStore'
import { useDispatch, useSelector } from 'react-redux'
import { getHospitalsAsync, setCityName } from '../../../../redux/reducers/hospital/hospitalSlice'
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import GlobalStyles from '../../../../styles/general/global_styles'

const SelectCityComponent = (props: { bottomSheetRef: React.RefObject<BottomSheetMethods> }) => {
    const bottomSheetRef = props.bottomSheetRef;
    const hospitalSlice = useSelector((state: RootState) => state.hospital)
    const dispatch = useDispatch<AppDispatch>()
    const [selectedState, setSelectedState] = useState<keyof typeof Cities>('Maharashtra')
    const [selectedCity, setSelectedCity] = useState('')
    const [statesExpanded, setStatesExpanded] = useState(true)
    const [cityExpanded, setCityExpanded] = useState(false)
    const [searchText, setSearchText] = useState('')
    const [cities, setCities] = useState(Cities[selectedState || 'Maharashtra'])
    const onSelectState = (state: keyof typeof Cities) => {
        setSelectedState(() => state)
        setStatesExpanded(() => false)
        setCityExpanded(() => true)
        setCities(() => Cities[state || 'Maharashtra'])
    }
    const onSelectedCity = (city: string) => {
        setSelectedCity(city)
        dispatch(setCityName(city));
        dispatch(getHospitalsAsync(city));
        bottomSheetRef.current?.collapse();
    }
    const onPress = () => {
        bottomSheetRef.current?.snapToIndex(5)
        setStatesExpanded((prev) => !prev);
        setCityExpanded((prev) => !prev);
    }
    const onSearchTextChange = (value: string) => {
        bottomSheetRef.current?.snapToIndex(5)
        setSearchText(() => value);
        if (!value) {
            setSearchText(undefined as any)
            setCities(() => Cities[selectedState || 'Maharashtra'])
            return;
        }
        setCityExpanded(true);
        const filteredCites: string[] = [];
        Object.keys(Cities)
            .forEach((state) => {
                // @ts-ignore
                filteredCites.push(...(Cities[state as any]
                    .filter((cityname: string) => {
                        return cityname.toLowerCase().includes(value.toLowerCase())
                    })))
            })

        setCities(filteredCites)
    }
    return (
        <View style={styles.container}>
            <PrimaryInputWhite
                placeholder='Search City'
                onChangeText={(value) => {
                    onSearchTextChange(value);
                }}
                icon='magnify'
            />
            <List.Section title='State' style={{ display: searchText ? 'none' : 'flex' }}>
                <List.Accordion
                    onPress={() => onPress()}
                    expanded={statesExpanded}
                    style={styles.states}
                    title={selectedState ? selectedState : 'Select State'}
                    left={props => <List.Icon {...props} icon="map-marker" />}
                >
                    <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true} indicatorStyle={useColorScheme() === 'dark' ? 'white' : 'black'}>
                        {Object
                            .keys(Cities)
                            .sort((a, b) => a.localeCompare(b))
                            .map((state) => {
                                return <List.Item style={styles.listItem} key={state} onPress={() => {
                                    onSelectState(state as any)
                                }} title={state} />
                            })
                        }
                    </ScrollView>
                </List.Accordion>
            </List.Section>
            <List.Section title='City'>
                <List.Accordion
                    onPress={() => onPress()}
                    expanded={cityExpanded}
                    style={styles.cities}
                    title={selectedState && selectedCity ? selectedCity : 'Select City'}
                    left={props => <List.Icon {...props} icon="map-marker" />}
                >
                    <ScrollView style={styles.scrollView}>
                        {cities
                            .sort((a, b) => a.localeCompare(b))
                            .map((city: string) => {
                                return <List.Item style={styles.listItem} key={Math.random() * 1000} onPress={() => {
                                    onSelectedCity(city)
                                }} title={city} />
                            })}
                    </ScrollView>
                </List.Accordion>

            </List.Section>
        </View >
    )
}

export default SelectCityComponent

const styles = StyleSheet.create({
    container: {
        marginTop: -20
    },
    subContainer: {
    },
    states: {
        maxHeight: 200,
        backgroundColor: GlobalStyles.white,
        borderColor: GlobalStyles.primaryColour,
        borderWidth: 1,
        borderRadius: 5
    },
    cities: {
        maxHeight: 200,
        backgroundColor: GlobalStyles.white,
        borderColor: GlobalStyles.primaryColour,
        borderWidth: 1,
        borderRadius: 5
    },
    scrollView: {
        backgroundColor: GlobalStyles.grey50,
        maxHeight: 200,
        paddingLeft: 0
    },
    listItem: {
        borderBottomWidth: 1,
        borderBottomColor: 'transparent',
        backgroundColor: GlobalStyles.grey50,
        paddingLeft: 10
    }
})