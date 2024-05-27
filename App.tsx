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
import Toast from 'react-native-toast-message';
import Header from './components/Header';
import BloodSeekerDetails from './screens/BloodSeekerDetails';

const Stack = createStackNavigator();

// const customTextInputProps = {
//   underlineColorAndroid: 'rgba(0,0,0,0)',
//   style: {
//     borderWidth: 1,
//     borderColor: 'gray',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     backgroundColor: 'white',
//   },
// };

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
        <Stack.Screen
          name="BloodSeekerDetails"
          component={BloodSeekerDetails}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

export default App;
