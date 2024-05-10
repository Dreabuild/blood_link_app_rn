/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import BloodRequestForum from './screens/BloodRequestForum';
import BloodBankDetails from './screens/BloodBankDetails';
import BloodBankList from './screens/BloodBankList';
import BloodRequestList from './screens/BloodRequests';

import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BloodRequestForum" component={BloodRequestForum} />
        <Stack.Screen name="BloodBankDetails" component={BloodBankDetails} />
        <Stack.Screen name="BloodBankList" component={BloodBankList} />
        <Stack.Screen name="BloodRequestList" component={BloodRequestList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
