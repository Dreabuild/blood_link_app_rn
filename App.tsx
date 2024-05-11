/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import BloodRequestForum from './screens/BloodRequestForum';
import BloodBankDetails from './screens/BloodBankDetails';
import BloodBankList from './screens/BloodBankList';

import {NavigationContainer} from '@react-navigation/native';
import Header from './components/Header';

const Stack = createStackNavigator();

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
