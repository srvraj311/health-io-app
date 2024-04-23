import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StatusBar,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {getCityNameFromStorage} from '../../../service/hospital/hospitalService';
import {AppDispatch, RootState} from '../../../redux/reducers/user/userStore';
import {useDispatch, useSelector} from 'react-redux';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {hStyles} from '../../../styles/components/HospitalStyles';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import GlobalStyles from '../../../styles/general/global_styles';
import HospitalBottomSheet from './hospitalList/HospitalBottomSheet';
import PrimaryInputWhite from '../../../components/input/PrimaryInputWhite';
import HospitalCard from './HospitalCard';
import {
  HospitalCardType,
  getHospitalsAsync,
  setCityName,
  setFilteredHospitalList,
} from '../../../redux/reducers/hospital/hospitalSlice';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ActivityIndicator, Text } from 'react-native-paper';

const HospitalList = () => {
  const hospitalState = useSelector((state: RootState) => state.hospital);
  const dispatch = useDispatch<AppDispatch>();
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isCitySelected, setIsCitySelected] = useState(
    hospitalState.cityName !== '',
  );
  const [cityName, setCurrentCityName] = useState('');
  

  useEffect(() => {
    getCityNameFromStorage().then((city: any) => {
      if (city) {
        setCurrentCityName(city);
        setIsCitySelected(true);
        dispatch(setCityName(city));
      } else {
        setCityName('');
      }
    });

    if (
      hospitalState.cityName &&
      !hospitalState.isFetching &&
      !hospitalState.hosiptalList
    ) {
      dispatch(getHospitalsAsync(hospitalState.cityName));
    }
  }, [hospitalState.cityName]);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    
  }, []);

  const handleOnSearchTextChange = (text: string) => {
    const filteredHospitals = hospitalState.hosiptalList?.filter(
      (hospital: HospitalCardType) =>
        hospital.name
          .toLowerCase()
          .includes(text.toLowerCase()) && hospital.address.toLowerCase().includes(text.toLowerCase())
    )
    dispatch(setFilteredHospitalList(filteredHospitals));
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView
        contentContainerStyle={hStyles.scrollView}
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="never"
        keyboardDismissMode='none'
        bounces={false}>
        <KeyboardAvoidingView
          enabled
          contentContainerStyle={{height: '100%'}}
          behavior={Platform.OS === 'ios' ? 'height' : 'height'}
          style={hStyles.keyboardAvoidingView}>
          <BottomSheet
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
            keyboardBehavior='interactive'
            index={0}
            keyboardBlurBehavior='restore'
            android_keyboardInputMode='adjustPan'
            snapPoints={['8%', '40%', '50%', '60%', '80%', '90%']}
            style={hStyles.bottomSheet}
            handleIndicatorStyle={{
              backgroundColor: GlobalStyles.grey300,
              width: 60,
              height: 6,
            }}
            handleStyle={{
              backgroundColor: GlobalStyles.white,
              borderTopColor: GlobalStyles.grey300,
              borderTopWidth: 1,
            }}>
            <BottomSheetView style={hStyles.contentContainer}>
              <HospitalBottomSheet bottomSheetRef={bottomSheetRef} />
            </BottomSheetView>
          </BottomSheet>
          <View style={hStyles.headerImage}>
            <Image
              style={hStyles.image}
              source={require('../../../assets/images/home_bg.png')}
            />
          </View>
          <View style={[{marginTop: 0}, hStyles.container, ]}>
            <View style={hStyles.header}>
              <PrimaryInputWhite
                placeholder="Search Hospital"
                onChangeText={text => {
                  handleOnSearchTextChange(text);
                }}
              />
            </View>
            {/* <View style={{marginTop: 40}}></View> */}
          </View>
          {hospitalState.isFetching && <View style={hStyles.activityIndicator}>
            <ActivityIndicator  animating={hospitalState.isFetching} color={GlobalStyles.primaryColour} size="large" />
            <Text style={{margin: 10}}>{hospitalState.isFetching ? 'Loading Hospitals' : ''}</Text>
          </View>}
          
          
          <ScrollView
            style={hStyles.hospitalCardContainer}
            refreshControl={
              <RefreshControl
                refreshing={hospitalState.isFetching}
                onRefresh={() => {
                  if (hospitalState.cityName) {
                    dispatch(getHospitalsAsync(hospitalState.cityName));
                  }
                }}
              />
            }
            keyboardDismissMode='on-drag'>
              <View style={{marginTop: 20}} />
            {
              hospitalState.filteredHospitalList && hospitalState.filteredHospitalList.map((hospital: any, index: number) => {
                const hospitalCard: HospitalCardType = {
                  name : hospital.name,
                  address : hospital.address,
                  icon : 'hospital-building',
                  distance : hospital.distance,
                  rating : hospital.rating,
                  city: hospital.city,
                  id: hospital.id
                }
                return <HospitalCard hospital={hospitalCard} onPress={(hospital: HospitalCardType) => {
                  // On select of hospital go to new view
                  if (hospitalState.isFetching) return;
                  rootNavigation.push('HospitalDetails', {hospital: hospital})
                }} key={index} />
              })
            }
            <View style={{marginTop: 20}} />
          </ScrollView>
        </KeyboardAvoidingView>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default HospitalList;
