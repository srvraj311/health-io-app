import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import Hospital from '../../../../models/Hospital';
import GlobalStyles from '../../../../styles/general/global_styles';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';

const AboutHospital = (props: any) => {
  const hospital: Hospital = props?.hospital;
  useEffect(() => {
      
  }, [hospital]);
  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        {/* TODO : Add hospital.description */}
        {hospital.hospital?.name}, is a “{hospital.hospital?.type != '0' || 'General type hospital'}”, and is located at {hospital.hospital?.address} in {hospital.hospital?.city}. The hospital has {hospital.availability?.total_bed || 0} beds, {hospital.availability?.total_ventilator || 0} ventilators, {hospital.availability?.total_icu || 0} ICU, and {hospital.availability?.total_oxygen_cylinders || 0} Oxygen cylinders as of there last updated data. The hospital is rated as {hospital.hospital?.rating || 0} stars.
      </Text>

      <PrimaryButton
        title="Book Appointment"
        onPress={() =>
          props.navigation.navigate('BookAppointment', {hospital: hospital})
        }
      />
    </View>
  );
};

export default AboutHospital;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: GlobalStyles.baseFont,
    backgroundColor: GlobalStyles.white,
    color: GlobalStyles.black,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
    marginBottom: 32,
  },
  description: {
    fontSize: 16,
    color: GlobalStyles.grey900,
    marginHorizontal: 24,
    marginVertical: 24,
    lineHeight: 20,
  },
});
