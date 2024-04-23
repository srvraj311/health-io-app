import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import GlobalStyles from '../../../styles/general/global_styles';
import {Icon} from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HospitalCardType } from '../../../redux/reducers/hospital/hospitalSlice';

const HospitalCard = ({
  hospital, onPress
}: {
  hospital : HospitalCardType,
  onPress: (hospital: HospitalCardType) => void
}) => {

  return (
    <TouchableOpacity style={hStyles.card} activeOpacity={0.7} onPress={() => onPress(hospital)}>
      {/* Top Row */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Image
            source={require('../../../assets/images/hospital.png')}
            style={hStyles.hospitalIcon}
          />
          <Text style={hStyles.hospitalName}>{hospital.name}</Text>
        </View>
        <Image
          source={require('../../../assets/images/verified.png')}
          style={hStyles.verifiedIcon}
        />
      </View>

      {/* Bottom row */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {/* Left side */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: 24,
            alignItems: 'center',
          }}>
          <Icon source={'map-marker'} size={24} color={GlobalStyles.grey500}></Icon>
          <Text
            style={{
              marginLeft: 2,
              maxWidth: 200,
              lineHeight: 20,
              color: GlobalStyles.grey500,
            }}>
            {hospital.address}
          </Text>
        </View>
        {/* Right side */}
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-end',
            marginTop: 0,
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Icon source={'star'} size={24} color={GlobalStyles.warn}></Icon>
            <Text style={{marginLeft: 2, color: GlobalStyles.grey500, marginTop: 4}}>
              {hospital.rating}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Icon source={'navigation-variant'} size={24} color={GlobalStyles.grey500}></Icon>
            <Text style={{marginLeft: 2, color: GlobalStyles.grey500, marginTop: 4}}>
              {hospital.distance}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const hStyles = StyleSheet.create({
  card: {
    backgroundColor: GlobalStyles.white,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 32,
    borderColor: GlobalStyles.primaryColour,
    borderWidth: 1,
    minWidth: 320,
    color: GlobalStyles.grey400,
  },
  hospitalName: {
    color: GlobalStyles.secondaryColor,
    fontSize: 16,
    fontFamily: GlobalStyles.baseFontMedium,
    maxWidth: 210,
    maxHeight: 60,
    marginVertical: 6,
    marginHorizontal: 10,
  },
  hospitalIcon: {
    width: 50,
    height: 50,
    margin: 4,
  },
  verifiedIcon: {
    width: 24,
    height: 24,
    marginTop: 2,
  },
});

export default HospitalCard;
