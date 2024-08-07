import {Alert, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../redux/reducers/user/userStore';
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../navigation/navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderBackButton from '../../../components/buttons/HeaderBackButton';
import GlobalStyles from '../../../styles/general/global_styles';
import {gethospitalDataFromApi} from '../../../service/hospital/hospitalService';
import Hospital from '../../../models/Hospital';
import {ActivityIndicator, Icon} from 'react-native-paper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Details from '../../Details';
import AboutHospital from './About/AboutHospital';
import AvailabilityFacility from './Availability/AvailabilityFacility';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@gorhom/bottom-sheet';
type HospitalDetailsProps = NativeStackScreenProps<
  RootStackParamList,
  'HospitalDetails'
>;

const HospitalDetails = (props: HospitalDetailsProps) => {
  const state = useSelector((state: RootState) => state.hospital);
  const dispatch = useDispatch<AppDispatch>();
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [hospital, setHospital] = useState<Hospital>({} as Hospital);
  const Tab = createMaterialTopTabNavigator();
  const isLoadingActive = !hospital.hospital;

  useEffect(() => {
    if (props?.route?.params?.hospital) {
      gethospitalDataFromApi(props?.route?.params?.hospital?.id)
        .then((response: any) => {
          if (response?.status === 'OK' && response?.body) {
            setHospital(response?.body);
          }
        })
        .catch(error => {
          Alert.alert(error.message);
        });
    }
  }, [props?.route?.params?.hospital]);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />

      <View style={styles.header}>
        <Text style={styles.headerText}>Hospital Details</Text>
        <View style={styles.backButton}>
          <HeaderBackButton onPress={() => rootNavigation.goBack()} />
        </View>
      </View>

      {/* Activity Indicator */}
      {isLoadingActive && (
        <View style={styles.activityIndicatorContainer}>
          <View style={styles.activityIndicator}>
            <ActivityIndicator
              animating={true}
              color={GlobalStyles.primaryColour}
              size="large"
            />
            <Text style={{margin: 10}}>Loading Hospital Details</Text>
          </View>
        </View>
      )}

      {/* Hospital Name  */}
      <View style={styles.borderPrimary}></View>
      <View style={styles.content}>
        <View style={styles.content_name}>
          <Image
            style={styles.image}
            source={require('../../../assets/images/hospital.png')}
          />
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text style={styles.hospitalName}>{hospital.hospital?.name}</Text>
            <View style={styles.hospitalAddress}>
              <Icon
                source={'map-marker'}
                size={20}
                color={GlobalStyles.grey500}></Icon>
              <Text
                style={{
                  fontFamily: GlobalStyles.baseFont,
                  fontSize: 12,
                  color: GlobalStyles.grey500,
                }}>
                {hospital.hospital?.address}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Info Panel */}
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Image
            style={styles.infoImage}
            source={require('../../../assets/images/government.png')}
          />
          <Text style={styles.infoText}>
            {hospital?.hospital?.type === '0'
              ? 'Not Updated'
              : hospital?.hospital?.type}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Image
            style={styles.infoImage}
            source={require('../../../assets/images/grade.png')}
          />
          <Text style={styles.infoText}>Rating</Text>
        </View>
        <View style={styles.infoItem}>
          <Image
            style={styles.infoImage}
            source={require('../../../assets/images/open_24.png')}
          />
          <Text style={styles.infoText}>Open 24x7</Text>
        </View>
        <View style={styles.infoItem}>
          <Image
            style={styles.infoImage}
            source={require('../../../assets/images/direction.png')}
          />
          <Text style={styles.infoText}>24 Mins</Text>
        </View>
      </View>
      <View style={styles.greyLine}></View>

      <Tab.Navigator
        style={styles.tabBar}
        overScrollMode={'always'}
        backBehavior="firstRoute"
        initialLayout={{width: SCREEN_WIDTH}}
        screenOptions={{
          tabBarItemStyle: {width: 'auto', paddingHorizontal: 20},
          tabBarInactiveTintColor: GlobalStyles.grey400,
          tabBarScrollEnabled: true,
          tabBarLabel: props => {
            if (props.focused) {
              return (
                <Text
                  style={[styles.tabLabelFont, {color: GlobalStyles.black}]}>
                  {props.children}
                </Text>
              );
            }
            return (
              <Text
                style={[styles.tabLabelFont, {color: GlobalStyles.grey400}]}>
                {props.children}
              </Text>
            );
          },

          tabBarIndicatorStyle: {
            backgroundColor: GlobalStyles.primaryColour,
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          },
          tabBarStyle: {
            left: 24 / 2,
            backgroundColor: GlobalStyles.white,
            marginTop: 0,
            borderColor: GlobalStyles.white,
            elevation: 0,
          },
        }}>
        <Tab.Screen
          name="Availability & Facility"
        >
          {(props) => <AvailabilityFacility hospital={hospital} />}
        </Tab.Screen>
        <Tab.Screen
          name="About"
          initialParams={{hospital}}
        >
          {(props) => <AboutHospital hospital={hospital} />}
          </Tab.Screen>
        <Tab.Screen name="Blood Bank" component={Details} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default HospitalDetails;

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    position: 'absolute',
    height: SCREEN_HEIGHT, 
    width: SCREEN_WIDTH,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    zIndex: 2,
    top: 102
  },
  activityIndicator: {
    position: 'absolute',
    top: '30%',
    left: '20%',
    marginTop: 25,
    zIndex: 2,
    backgroundColor: GlobalStyles.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: GlobalStyles.grey300,
    padding: 30,
  },
  tabLabelFont: {
    fontSize: 16,
    fontFamily: GlobalStyles.baseFontBold,
    color: GlobalStyles.grey700,
    textTransform: 'capitalize',
  },
  tabBar: {
    backgroundColor: GlobalStyles.white,
    elevation: 0,
  },
  greyLine: {
    marginTop: 16,
    width: '100%',
    height: 1,
    backgroundColor: GlobalStyles.grey200,
  },
  infoText: {
    fontFamily: GlobalStyles.baseFontMedium,
    fontSize: 14,
    color: GlobalStyles.grey700,
    margin: 'auto',
    marginTop: 12,
    textAlign: 'center',
  },
  infoImage: {
    width: 50,
    height: 50,
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 0,
    marginVertical: 10,
  },
  hospitalAddress: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginStart: 12,
    marginVertical: 6,
  },
  content_name: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 24,
    marginTop: 24,
    marginBottom: 24 / 2
  },
  hospitalName: {
    fontSize: 16,
    textAlign: 'left',
    fontFamily: GlobalStyles.baseFontBold,
    color: GlobalStyles.grey900,
    marginTop: 0,
    marginLeft: 18,
    marginRight: 18,
  },
  image: {
    height: 80,
    width: 80,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: GlobalStyles.white,
  },
  content: {},
  borderPrimary: {
    height: 3,
    width: SCREEN_WIDTH,
    backgroundColor: GlobalStyles.primaryColour,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    height: 58,
  },
  headerText: {
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
    fontFamily: GlobalStyles.baseFontMedium,
    color: GlobalStyles.grey900,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});
