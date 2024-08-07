import { Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React from 'react'
import HeadingTextsHome from '../../components/common/HeadingTextsHome'
import PrimaryCardIcon from '../../components/common/PrimaryCardIcon'
import { HomeTabParamList } from './Home'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { RootState } from '../../redux/reducers/user/userStore'
import { useSelector } from 'react-redux'
import GlobalStyles from '../../styles/general/global_styles'
import { SCREEN_WIDTH } from '@gorhom/bottom-sheet'

const isIos = Platform.OS === 'ios';
const HomeScreen = () => {
    const navigation = useNavigation<BottomTabNavigationProp<HomeTabParamList>>();
    const user = useSelector((state: RootState) => state.user);
    const homeStyles = StyleSheet.create({
        container: {
            alignItems: 'center',
            backgroundColor: GlobalStyles.pagBackground,
            flexDirection: 'column',
            flexGrow: 1,
            width: SCREEN_WIDTH,
        },
        margin: {
            flex: 1,
            marginTop: isIos ? 70 : 50,
        },
        topContainer: {
            height: 200,
            width: '100%',
        },
        header: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            zIndex: -1,
            height: 300,
            minWidth: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.9,
            width: '100%',
        },
        image: {
            height: '100%',
            width: '100%',
            resizeMode: 'cover',
        },
        iconContainer: {
            width: '88%',
            marginHorizontal: 24,
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginTop: 8,
            flexDirection: 'row',
        },
        iconButton: {
            height: 50,
            width: 50,
        },
        icon: {
            height: 50,
            width: 50,
            resizeMode: 'cover',
        },
        body: {
            position: 'relative',
            borderTopLeftRadius: 40,
            top: -40, //-240,
            color: 'black',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: useWindowDimensions().width,
            height: '100%',
            marginBottom: -40,
            marginTop: 100,
            paddingTop: 35,
            paddingHorizontal: 16,
            backgroundColor: GlobalStyles.pagBackground,
        },
        horizontal: {
            flexDirection: 'row',
        },
        marginNegetative: {
            flex: 1,
            flexGrow: 1,
            height: 30,
            width: '100%',
            // marginTop: 100
        }
    });
    
    return (
        <View style={homeStyles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            {/* Top Container */}
            <View style={homeStyles.topContainer}>
                <View style={homeStyles.margin}></View>
                <View style={homeStyles.header}>
                    <Image style={homeStyles.image} source={require('../../assets/images/home_bg.png')} />
                </View>
                <View style={homeStyles.iconContainer}>
                    <TouchableOpacity activeOpacity={0.8} style={homeStyles.iconButton}>
                        <Image style={homeStyles.icon} source={require('../../assets/icons/profile_icon.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={homeStyles.iconButton}>
                        <Image style={homeStyles.icon} source={require('../../assets/icons/notification.png')} />
                    </TouchableOpacity>
                </View>
                <HeadingTextsHome text1={'Hey' + ' ' + ((user.user?.first_name) ? user.user?.first_name.substring(0, 15) : "User")} text2='Welcome to health.io' />
            </View>
            <View style={homeStyles.body}>
                <ScrollView showsVerticalScrollIndicator={false} style={homeStyles.marginNegetative}>
                    <View style={homeStyles.horizontal}>
                        <PrimaryCardIcon
                            icon={require('../../assets/icons/hospital.png')}
                            onPress={() => navigation.jumpTo('Hospitals')}
                            text='Hospitals' />
                        <PrimaryCardIcon
                            icon={require('../../assets/icons/clinics.png')}
                            onPress={() => { }}
                            text='Clinics' />
                    </View>

                    <View style={homeStyles.horizontal}>
                        <PrimaryCardIcon
                            icon={require('../../assets/icons/pharmacy.png')}
                            onPress={() => { }}
                            text='Pharmacy' />
                        <PrimaryCardIcon
                            icon={require('../../assets/icons/laboratory.png')}
                            onPress={() => { }}
                            text='Laboratory' />
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}



export default HomeScreen