import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GlobalStyles from '../../../../styles/general/global_styles';
import PrimaryButton from '../../../../components/buttons/PrimaryButton';
import Hospital from '../../../../models/Hospital';
import {Icon} from 'react-native-paper';

const AvailabilityFacility = (props: any) => {
  const hospital: Hospital = props?.route?.params?.hospital;
  console.log(props?.route?.params?.hospital);
  return (
    <View style={styles.container}>
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
          <View style={styles.infoContainer}>
            <Text style={styles.infoValue}>
              {hospital?.availability?.bed || 0}
            </Text>
            <Text style={styles.infoTitle}>Bed</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoValue}>
              {hospital?.availability?.icu || 0}
            </Text>
            <Text style={styles.infoTitle}>ICU</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoValue}>
              {hospital?.availability?.ccu || 0}
            </Text>
            <Text style={styles.infoTitle}>CCU</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoValue}>
              {hospital?.availability?.total_bed || 0}
            </Text>
            <Text style={styles.infoTitle}>Oxygen</Text>
          </View>
        </View>
      </View>
      <PrimaryButton
        title="Book Appointment"
        onPress={() =>
          props.navigation.navigate('BookAppointment', {hospital: hospital})
        }
      />
    </View>
  );
};

export default AvailabilityFacility;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: GlobalStyles.baseFont,
    backgroundColor: GlobalStyles.white,
    color: GlobalStyles.black,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
    paddingBottom: 32,
  },
  description: {
    fontSize: 16,
    color: GlobalStyles.grey900,
    marginHorizontal: 24,
    marginVertical: 24,
    lineHeight: 20,
  },
  cardContainer: {
    width: '90%',
    height: 150,
    borderRadius: 8,
    borderColor: GlobalStyles.primaryColour,
    borderWidth: 2,
    margin: 24,
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
  },
  infoValue: {
    fontSize: 32,
    fontFamily: GlobalStyles.baseFontMedium,
    color: GlobalStyles.grey600,
    textAlign: 'center',
  },
});
