import {View, Text, useColorScheme} from 'react-native';
import React, {useEffect, useState} from 'react';
import {AppDispatch, RootState} from '../redux/reducers/user/userStore';
import {useSelector, useDispatch} from 'react-redux';
import {isLoggedInAsync} from '../redux/reducers/user/userSlice';
import {getTokenFromStorage, removeTokenFromStorage} from '../service/auth/authService';
import splashStyle from '../styles/components/SplashStyles';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/navigation';
import GlobalStyles from '../styles/general/global_styles';

const SplashScreen = () => {
  // How we can get the state
  const user = useSelector((state: RootState) => state.user);
  // How we can call the reducers
  const dispatch = useDispatch<AppDispatch>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    getTokenFromStorage().then(t => {
      if (t) {
        if (!user.isCheckingLogin && !user.hasVerifiedToken) {
            dispatch(isLoggedInAsync(t));
        }
        if (!user.isCheckingLogin && user.isLoggedIn && user.hasVerifiedToken) {
            navigation.navigate('Home', { token : t as string});
        }
        if(!user.isCheckingLogin && !user.isLoggedIn && user.hasVerifiedToken) {
            removeTokenFromStorage();
            navigation.navigate('Login');
        }
      } else {
        if(!user.isCheckingLogin && !user.isLoggedIn && !user.hasVerifiedToken) {
            removeTokenFromStorage();
            navigation.navigate('Login');
          }
      }
      
    });
  }, [user.isLoggedIn, user.hasVerifiedToken]);

  return (
    <View style={splashStyle.container}>
      <Text style={splashStyle.text}>Getting Token</Text>
    </View>
  );
};

export default SplashScreen;
