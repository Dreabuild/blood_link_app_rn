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
    </View>
  );
}
