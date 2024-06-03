/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {
  Image,
  Linking,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BloodBankDetails from './screens/BloodBankDetails';
import BloodBankList from './screens/BloodBankList';
import BloodRequestForum from './screens/BloodRequestForum';
import Home from './screens/Home';

import {NavigationContainer} from '@react-navigation/native';
import {
  DrawerNavigationProp,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import Header from './components/Header';
import BloodSeekerDetails from './screens/BloodSeekerDetails';
import Feather from 'react-native-vector-icons/Feather';
import SubmitReview from './screens/SubmitReview';

const Drawer = createDrawerNavigator();

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
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={DrawerContent}
        screenOptions={{
          header: Header,
          drawerPosition: 'right',
          drawerStyle: {
            width: 210,
          },
        }}>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="BloodRequestForum" component={BloodRequestForum} />
        <Drawer.Screen name="BloodBankDetails" component={BloodBankDetails} />
        <Drawer.Screen name="BloodBankList" component={BloodBankList} />
        <Drawer.Screen
          name="BloodSeekerDetails"
          component={BloodSeekerDetails}
        />
        <Drawer.Screen name="ReviewScreen" component={SubmitReview} />
      </Drawer.Navigator>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
}

function DrawerContent({navigation}: DrawerNavigationProp<any>) {
  return (
    <View style={{padding: 10, flex: 1, flexDirection: 'column'}}>
      <View
        style={{
          height: '6%',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: '#DDDDDD',
          paddingBottom: 12,
        }}>
        <Image source={require('./assets/logo-full.png')} height={40} />
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '94%',
        }}>
        <View style={{width: '100%', paddingVertical: 10, gap: 10}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#E6F9EA',
              padding: 5,
              width: '100%',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() =>
              Linking.openURL(
                'https://www.whatsapp.com/channel/0029VafBUXv2v1InsGASJv1I',
              )
            }>
            <Image source={require('./assets/WhatsApp.png')} height={45} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '100%',
              height: 40,
              backgroundColor: '#F9E6E6',
              flexDirection: 'row',
              padding: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Feather name="phone" size={20} color="#BF0000" />
            <Text style={{marginLeft: 5, color: '#BF0000', fontWeight: 'bold'}}>
              যোগাযোগ করুন
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: '100%',
            gap: 10,
            paddingTop: 10,
            borderTopColor: '#DDDDDD',
            borderTopWidth: 1,
          }}>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://www.bloodlinkfoundation.com')
            }>
            <Text style={{color: '#AE0000'}}>www.bloodlinkfoundation.com</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{color: '#AE0000'}}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ReviewScreen')}>
            <Text style={{color: '#AE0000'}}>Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default App;
