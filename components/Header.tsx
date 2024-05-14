/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, View} from 'react-native';

export default function Header() {
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
      <View
        style={{
          backgroundColor: '#E6F9EA',
          paddingHorizontal: 5,
          paddingVertical: 1,
        }}>
        <Image source={require('../assets/WhatsApp.png')} height={45} />
      </View>
    </View>
  );
}
