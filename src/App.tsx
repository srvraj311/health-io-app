import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  useColorScheme,
  StyleSheet,
  Button,
  TextInput,
  TextInputBase,
  TouchableOpacity,
} from 'react-native';
import AppPro from './AppPro';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, userStore } from './redux/reducers/user/userStore';

// Scereens
import Home from './screens/home/Home';
import Details from './screens/Details';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Nav type defination
import { RootStackParamList } from './navigation/navigation';
import Login from './screens/auth/Login/Login';
import Signup from './screens/auth/Signup/Signup';
import GlobalStyles from './styles/general/global_styles';
import SplashScreen from './screens/SplashScreen';
import { PaperProvider } from 'react-native-paper';
import FinishSignup from './screens/auth/Signup/FinishSignup';
import ForgotPassword from './screens/auth/Login/ForgotPassword';
import HospitalDetails from './screens/home/hospitals/HospitalDetails';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <Provider store={userStore}>
      <PaperProvider theme={GlobalStyles.theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen">
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='ForgotPassword'
              component={ForgotPassword}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name='FinishSignup'
              component={FinishSignup}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="HospitalDetails"
              component={HospitalDetails}
              options={{
                headerShown: false
              }}/>
            <Stack.Screen name="Details" component={Details} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default App;
