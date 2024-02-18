import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  useColorScheme,
  StyleSheet,
  Button,
  TextInput,
  TextInputBase,
  TouchableOpacity
} from 'react-native';
import AppPro from './AppPro';
import { Provider } from 'react-redux';
import { userStore } from "./redux/reducers/user/userStore"

// Scereens
import Home from './screens/home/Home';
import Details from './screens/Details';

// Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Nav type defination
import { RootStackParamList } from './navigation/navigation';
import Login from './screens/auth/Login/Login';
import Signup from './screens/auth/Signup/Signup';
import GlobalStyles from './styles/general/global_styles';
import { signupNavigationOptions } from './styles/components/SignupStyles';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  return (
    <Provider store={userStore}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
          <Stack.Screen name='Signup' component={Signup}
            options={{
              headerShown: false
            }} />
          <Stack.Screen name="Home" component={Home} options={{
            title: "Home Screen"
          }} />
          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;