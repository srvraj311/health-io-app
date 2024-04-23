import {
  Alert,
  Image,
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {HospitalState} from '../../../redux/reducers/hospital/hospitalSlice';
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
import {Icon} from 'react-native-paper';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Details from '../../Details';
import AboutHospital from './About/AboutHospital';
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
                {hospital.hospitalInfo?.address}
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
          <Text style={styles.infoText}>Government</Text>
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
        backBehavior='firstRoute'
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
        <Tab.Screen name="About" component={AboutHospital} initialParams={{hospital}} />
        <Tab.Screen name="Availability & Facility" component={Details} />
        <Tab.Screen name="Blood Bank" component={Details} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default HospitalDetails;

const styles = StyleSheet.create({
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
    marginVertical: 24,
  },
  hospitalAddress: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginStart: 12,
    marginVertical: 8,
  },
  content_name: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 24,
    marginVertical: 20,
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
    width: 500,
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
