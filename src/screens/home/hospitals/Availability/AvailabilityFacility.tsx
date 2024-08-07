import {
  Image,
  KeyboardAvoidingViewBase,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import GlobalStyles from '../../../../styles/general/global_styles';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';
import Hospital from '../../../../models/Hospital';
import {Icon} from 'react-native-paper';
import {SCREEN_WIDTH} from '@gorhom/bottom-sheet';

const AvailabilityFacility = (props: any) => {
  
  
  const [hospital, setHospital] = useState(props?.hospital);
  useEffect(() => {
    setHospital(props?.hospital);
  }, [props]);

  const capitalise = (key: string) => {
    const validKeys = ['x_ray', 'ultra_sound', 'ecg', 'mri', 'xray', 'ot', 'bed', 'icu', 'oxygen_cylinders', 'ventilator'];
    const validCaps = ['X Ray', 'Ultra Sound', 'ECG', 'MRI', 'Xray', 'OT', 'Bed', 'ICU', 'Oxygen', 'CCU'];
    if (validKeys.includes(key)) {
      return validCaps[validKeys.indexOf(key)];
    }
  };

  const getAmenitiesByHospital = () => {
    const validKeys = ['x_ray', 'ultra_sound', 'ecg', 'mri', 'xray', 'ot'];
    if (hospital && hospital.amenities) {
      const view = Object.keys(hospital.amenities).map(key => {
        if (!validKeys.includes(key)) {
          return null;
        }
        return (hospital?.amenities as any)[key] &&
          (hospital?.amenities as any)[key] == true ? (
          <View key={key} style={styles.infoContainer}>
            <Image
              style={styles.infoImage}
              source={require('../../../../assets/images/available.png')}
            />
            <Text style={styles.infoTitle}>{capitalise(key)}</Text>
          </View>
        ) : (
          <View key={key} style={styles.infoContainer}>
            <Image
              style={styles.infoImage}
              source={require('../../../../assets/images/unavailable.png')}
            />
            <Text style={styles.infoTitle}>{capitalise(key)}</Text>
          </View>
        );
      });
      
      return view;
    }
  };

  const getHospitalAvailabilities =() => {
    const validKeys = ['x_ray', 'ultra_sound', 'ecg', 'mri', 'xray', 'ot', 'bed', 'icu', 'oxygen_cylinders', 'ventilator'];
    if (hospital && hospital.availability) {
      const view = Object.keys(hospital.availability).map(key => {
        if (!validKeys.includes(key)) {
          return null;
        }
        return (
          <View key={key} style={styles.infoContainer}>
            <Text style={styles.infoValue}>
              {hospital?.availability[key] || 0}
            </Text>
            <Text style={styles.infoTitle}>{capitalise(key)}</Text>
          </View>
        );
      });
      return view;
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {/* Item 1 : Life Support Solutions */}
      <View style={styles.cardContainer}>
        {/* Top Container Starts */}
        <View style={styles.cardTop}>
          <Text style={styles.cardTitle}>Life Support Solutions</Text>
          <View style={styles.iconContainer}>
            <Icon
              source={'chart-line'}
              size={20}
              color={GlobalStyles.primaryColour}></Icon>
          </View>
        </View>
        {/* Top Container Ends */}
        <View style={styles.infoItem}>
        {getHospitalAvailabilities()}
        </View>
      </View>
      {/* Item 2 : Diagnostics Solutions */}
      <View style={styles.cardContainer}>
        {/* Top Container Starts */}
        <View style={styles.cardTop}>
          <Text style={styles.cardTitle}>Diagnostics Solution</Text>
          <View style={styles.iconContainer}>
            <Icon
              source={'chart-line'}
              size={20}
              color={GlobalStyles.primaryColour}></Icon>
          </View>
        </View>
        {/* Top Container Ends */}
        <View style={styles.infoItem}>
        { getAmenitiesByHospital() }
        </View>
      </View>
      {/* Item 2 : Book Appointment */}
      <View style={styles.buttonContainer}>
        <PrimaryButton
          title="Book Appointment"
          onPress={() =>
            props.navigation.navigate('BookAppointment', {hospital: hospital})
          }
        />
      </View>
    </ScrollView>
  );
};

export default AvailabilityFacility;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: GlobalStyles.baseFont,
    backgroundColor: GlobalStyles.white,
    color: GlobalStyles.black,
    // alignItems: 'center',
    // justifyContent: 'space-between',
    flexGrow: 1,
    height: '100%',
  },
  description: {
    fontSize: 16,
    color: GlobalStyles.grey900,
    marginHorizontal: 24,
    marginVertical: 24,
    lineHeight: 20,
  },
  cardContainer: {
    width: SCREEN_WIDTH - 48,
    height: 150,
    borderRadius: 8,
    borderColor: GlobalStyles.primaryColour,
    borderWidth: 2,
    margin: 24,
    marginBottom: 0,
  },
  cardTop: {
    height: 40,
    borderBottomColor: GlobalStyles.primaryColour,
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: GlobalStyles.inputBackground,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: 'row',
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: GlobalStyles.baseFontMedium,
    color: GlobalStyles.primaryColour,
    marginLeft: 16,
  },
  iconContainer: {
    marginRight: 16,
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: -6,
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginHorizontal: 10,
    marginVertical: 24,
  },
  infoTitle: {
    fontSize: 12,
    fontFamily: GlobalStyles.baseFontMedium,
    color: GlobalStyles.grey900,
    textAlign: 'center',
    marginTop: 0,
  },
  infoValue: {
    fontSize: 32,
    fontFamily: GlobalStyles.baseFontMedium,
    color: GlobalStyles.grey600,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 32,
  },
  infoImage: {
    alignSelf: 'center',
    marginBottom: 6,
    width: 50,
    height: 50,
  },
});
