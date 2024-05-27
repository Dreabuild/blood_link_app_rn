/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, Linking, TouchableOpacity, View} from 'react-native';

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
      <TouchableOpacity
        style={{
          backgroundColor: '#E6F9EA',
          padding: 5,
          width: 40,
        }}
        onPress={() =>
          Linking.openURL(
            'https://www.whatsapp.com/channel/0029VafBUXv2v1InsGASJv1I',
          )
        }>
        <Image source={require('../assets/WhatsApp.png')} height={45} />
      </TouchableOpacity>
    </View>
  );
}
