/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import BloodBankDetails from './screens/BloodBankDetails';
import BloodBankList from './screens/BloodBankList';
import BloodRequestForum from './screens/BloodRequestForum';
import Home from './screens/Home';

import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import Header from './components/Header';
import BloodSeekerDetails from './screens/BloodSeekerDetails';
import ReviewForum from './screens/ReviewForum';

const Stack = createStackNavigator();

const toastConfig = {
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{borderLeftColor: '#BF0000'}}
      text1Style={{fontWeight: 'normal', fontFamily: 'Li Ador Noirrit Bold'}}
      text2Style={{fontFamily: 'Li Ador Noirrit'}}
    />
  ),
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{borderLeftColor: '#5cb85c'}}
      text1Style={{fontWeight: 'normal', fontFamily: 'Li Ador Noirrit Bold'}}
      text2Style={{fontFamily: 'Li Ador Noirrit'}}
    />
  ),
};

function App(): React.JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 100);
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#AE0000" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: Header,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BloodRequestForum" component={BloodRequestForum} />
        <Stack.Screen name="BloodBankDetails" component={BloodBankDetails} />
        <Stack.Screen name="BloodBankList" component={BloodBankList} />
        <Stack.Screen name="ReviewForum" component={ReviewForum} />
        <Stack.Screen
          name="BloodSeekerDetails"
          component={BloodSeekerDetails}
        />
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}

export default App;
