import {View, Text, useColorScheme, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppDispatch, RootState} from '../redux/reducers/user/userStore';
import {useSelector, useDispatch} from 'react-redux';
import {isLoggedInAsync} from '../redux/reducers/user/userSlice';
import {
  getTokenFromStorage,
  removeTokenFromStorage,
  saveTokenToStorage,
} from '../service/auth/authService';
import splashStyle from '../styles/components/SplashStyles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/navigation';
import GlobalStyles from '../styles/general/global_styles';
import HeadingTexts from '../components/common/HeadingTexts';

const SplashScreen = () => {
  // How we can get the state
  const user = useSelector((state: RootState) => state.user);
  // How we can call the reducers
  const dispatch = useDispatch<AppDispatch>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (!user.hasVerifiedToken && !user.isCheckingLogin) {
      dispatch(isLoggedInAsync());
    }

    if (user.hasVerifiedToken && !user.isCheckingLogin && user.isLoggedIn) {
      navigation.replace('Home');
    }

    if (user.hasVerifiedToken && !user.isCheckingLogin && !user.isLoggedIn) {
      // removeTokenFromStorage();
      navigation.replace('Login');
    }
  }, [user.isLoggedIn, user.hasVerifiedToken]);

  return (
    <View style={splashStyle.container}>
      <Image
        style={splashStyle.icon}
        source={require('../assets/images/icon.png')}
      />
      <HeadingTexts text1="Health" text2="IO" />
      <Text style={splashStyle.text}>Your health is our priority</Text>
    </View>
  );
};

export default SplashScreen;
