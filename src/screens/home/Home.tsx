import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
// Navigations
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/navigation';
import { AppDispatch, RootState } from '../../redux/reducers/user/userStore';
import { useSelector, useDispatch } from 'react-redux';
import { isLoggedInAsync, logout } from '../../redux/reducers/user/userSlice';
import homeStyles from '../../styles/components/HomeStyles';
import { Image, Platform } from 'react-native';
import HeadingTexts from '../../components/common/HeadingTexts';
import HeadingTextsHome from '../../components/common/HeadingTextsHome';
import PrimaryCardIcon from '../../components/common/PrimaryCardIcon';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import Details from '../Details';
import HospitalList from './hospitals/HospitalList';
import ClinicsList from './clinics/ClinicsList';
import PharmacyList from './pharmacy/PharmacyList';
import LaboratoryList from './labs/LaboratoryList';
import GlobalStyles from '../../styles/general/global_styles';

const isIos = Platform.OS === 'ios';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    smallText: {
        color: 'black'
    },
    icon: {
        width: 24,
        height: 24
    },
    tabBar: {
        backgroundColor: GlobalStyles.grey50,
        height: isIos ? 100 : 70,
        paddingBottom: isIos ? 30 : 10,
        marginBottom: isIos ? 'auto' : 0,
        paddingTop: 10
    }
})


type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type HomeTabParamList = {
    HomeScreen: undefined,
    Hospitals: undefined,
    Clinics: undefined,
    Pharmacy: undefined,
    Laboratory: undefined
};


const Home = (prop: Props) => {
    // How we can get the state
    const user = useSelector((state: RootState) => state.user);
    // How we can call the reducers
    const dispatch = useDispatch<AppDispatch>();
    const Tab = createBottomTabNavigator<HomeTabParamList>();

    useEffect(() => {
        if (prop.route.params.token) {
            dispatch(isLoggedInAsync(prop.route.params.token))
        } else {
            prop.navigation.replace('Login');
        }
    }, [])


    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarLabelPosition: 'below-icon',
            tabBarActiveBackgroundColor: GlobalStyles.grey50,
            tabBarInactiveBackgroundColor: GlobalStyles.pagBackground,
            tabBarActiveTintColor: GlobalStyles.primaryColour,
            tabBarInactiveTintColor: GlobalStyles.grey400,
            tabBarLabelStyle: {
                fontFamily: GlobalStyles.baseFont,
                fontSize: 12,
            },
            tabBarIconStyle: {
                width: 24,
                height: 24
            },
            tabBarButton(props) {
                return <TouchableOpacity activeOpacity={0.7} {...props} />
            },
            tabBarShowLabel: true,
            tabBarHideOnKeyboard: true,
        }}>
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: (props) => (props.focused
                        ? <Image source={require('../../assets/icons/home.png')} style={styles.icon} />
                        : <Image source={require('../../assets/icons/home_white.png')} style={styles.icon} />),
                    title: 'Home',
                    tabBarAccessibilityLabel: 'Home',
                }}
            />
            <Tab.Screen
                name="Hospitals"
                component={HospitalList}
                options={{
                    headerShown: false,
                    tabBarIcon: (props) => (props.focused
                        ? <Image source={require('../../assets/icons/hospital.png')} style={styles.icon} />
                        : <Image source={require('../../assets/icons/hospital_white.png')} style={styles.icon} />),
                    title: 'Hospitals',
                    tabBarAccessibilityLabel: 'Hospitals',
                }}
            />
            <Tab.Screen
                name="Clinics"
                component={ClinicsList}
                options={{
                    headerShown: false,
                    tabBarIcon: (props) => (props.focused
                        ? <Image source={require('../../assets/icons/clinics.png')} style={styles.icon} />
                        : <Image source={require('../../assets/icons/clinics_white.png')} style={styles.icon} />),
                    title: 'Clinics',
                    tabBarAccessibilityLabel: 'Clinics',
                }}
            />
            <Tab.Screen
                name="Pharmacy"
                component={PharmacyList}
                options={{
                    headerShown: false,
                    tabBarIcon: (props) => (props.focused
                        ? <Image source={require('../../assets/icons/pharmacy.png')} style={styles.icon} />
                        : <Image source={require('../../assets/icons/pharmacy_white.png')} style={styles.icon} />),
                    title: 'Pharmacy',
                    tabBarAccessibilityLabel: 'Pharmacy',
                }}
            />
            <Tab.Screen
                name="Laboratory"
                component={LaboratoryList}
                options={{
                    headerShown: false,
                    tabBarIcon: (props) => (props.focused
                        ? <Image source={require('../../assets/icons/laboratory.png')} style={styles.icon} />
                        : <Image source={require('../../assets/icons/laboratory_white.png')} style={styles.icon} />),
                    title: 'Labs',
                    tabBarAccessibilityLabel: 'Labs',
                }}
            />
        </Tab.Navigator>
    )
}

export default Home