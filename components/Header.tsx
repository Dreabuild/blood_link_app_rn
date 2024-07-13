/* eslint-disable prettier/prettier */
import {DrawerNavigationProp} from '@react-navigation/drawer';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function Header({navigation}: DrawerNavigationProp<any>) {
  return (
    <View
      style={{
        height: 55,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderColor: '#AE0000',
        flexDirection: 'row',
        backgroundColor: '#fff',
      }}>
      {/* LOGO */}
      <Image source={require('../assets/logo-full.png')} height={40} />
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Feather name="menu" size={25} color="#AE0000" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => Linking.openURL('tel:8801325986307')}
        style={{
          backgroundColor: '#F9E6E6',
          padding: 10,
        }}>
        <MyText
          style={{
            color: '#BF0000',
            fontWeight: 800,
            position: 'relative',
          }}>
          {/* < */}
          <Feather name="phone" style={{fontSize: 15, color: '#AE0000'}} />{' '}
          যোগাযোগ করুন
        </MyText>
      </TouchableOpacity>
    </View>
  );
}
