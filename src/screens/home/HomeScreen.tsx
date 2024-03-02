import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HeadingTextsHome from '../../components/common/HeadingTextsHome'
import PrimaryCardIcon from '../../components/common/PrimaryCardIcon'
import homeStyles from '../../styles/components/HomeStyles'
import { HomeTabParamList } from './Home'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'

type Props = BottomTabNavigationProp<HomeTabParamList, 'HomeScreen'>;

const HomeScreen = (prop: Props) => {
    const navigation = useNavigation<Props>();
    return (
        <View style={homeStyles.container}>
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
                <HeadingTextsHome text1='Welcome to' text2='health.io' />
            </View>
            <View style={homeStyles.body}>
                <View style={homeStyles.marginNegetative}>
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
                </View>
            </View>
        </View>
    )
}

export default HomeScreen