import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import GlobalStyles from '../../../styles/general/global_styles';
import {Icon} from 'react-native-paper';
import { Hospital } from '../../../redux/reducers/hospital/hospitalSlice';

const HospitalCard = (props: Hospital) => {
  return (
    <View style={hStyles.card}>
      {/* Top Row */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <Image
            source={require('../../../assets/images/hospital.png')}
            style={hStyles.hospitalIcon}
          />
          <Text style={hStyles.hospitalName}>{props.name}</Text>
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
          <Icon source={'map-marker'} size={24}></Icon>
          <Text
            style={{
              marginLeft: 2,
              maxWidth: 200,
              lineHeight: 20,
              color: GlobalStyles.grey500,
            }}>
            {props.address}
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
            <Text style={{marginLeft: 2, color: GlobalStyles.grey500}}>
              {props.rating}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Icon source={'navigation-variant'} size={24}></Icon>
            <Text style={{marginLeft: 2, color: GlobalStyles.grey500}}>
              {props.distance}
            </Text>
          </View>
        </View>
      </View>
    </View>
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
    fontWeight: '900',
    fontFamily: GlobalStyles.baseFont,
    maxWidth: 210,
    maxHeight: 60,
    marginVertical: 6,
    marginHorizontal: 10,
    letterSpacing: 0.35,
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
