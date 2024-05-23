/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StatusBar} from 'react-native';
import BloodBankDetails from './screens/BloodBankDetails';
import BloodBankList from './screens/BloodBankList';
import BloodRequestForum from './screens/BloodRequestForum';
import Home from './screens/Home';

import {NavigationContainer} from '@react-navigation/native';
import Toast, {BaseToast} from 'react-native-toast-message';
import Header from './components/Header';
import BloodSeekerDetails from './screens/BloodSeekerDetails';

const Stack = createStackNavigator();

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: any) => (
    <BaseToast {...props} style={{borderLeftColor: 'green'}} />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: any) => (
    <BaseToast {...props} style={{borderLeftColor: '#BF0000'}} />
  ),
};

function App(): React.JSX.Element {
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
