import {
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StatusBar,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
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
} from '../../../redux/reducers/hospital/hospitalSlice';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const HospitalList = () => {
  const hospitalState = useSelector((state: RootState) => state.hospital);
  const dispatch = useDispatch<AppDispatch>();
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isCitySelected, setIsCitySelected] = useState(
    hospitalState.cityName !== '',
  );
  const [cityName, setCurrentCityName] = useState('');
  const [searchText, setSearchText] = useState('');

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
          // behavior="position"
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
                  setSearchText(text);
                }}
              />
            </View>
            {/* <View style={{marginTop: 40}}></View> */}
          </View>
          <ScrollView
            style={hStyles.hospitalCardContainer}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={hospitalState.isFetching}
            //     onRefresh={() => {
            //       if (hospitalState.cityName) {
            //         dispatch(getHospitalsAsync(hospitalState.cityName));
            //       }
            //     }}
            //   />
            // }
            keyboardDismissMode='on-drag'>
            {
              hospitalState.hosiptalList && hospitalState.hosiptalList.map((hospital: any, index: number) => {
                const hospitalCard: HospitalCardType = {
                  name : hospital.hospital.name,
                  address : hospital.hospitalInfo.address,
                  icon : 'hospital-building',
                  distance : '--',
                  rating : '4.5',
                  city: hospital.hospital.city,
                  id: hospital.hospital.id
                }
                return <HospitalCard hospital={hospitalCard} onPress={(hospital: HospitalCardType) => {
                  // On select of hospital go to new view
                  rootNavigation.push('HospitalDetails', {hospital: hospital})
                }} key={index} />
              })
            }
          </ScrollView>
        </KeyboardAvoidingView>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default HospitalList;
