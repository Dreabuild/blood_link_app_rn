/* eslint-disable prettier/prettier */

import {NavigationProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

export default function Footer({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const route = useRoute();

  return (
    <View
      style={{
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            route.name === 'BloodBankList'
              ? 'Home'
              : route.name === 'BloodBankDetails'
              ? 'Home'
              : 'BloodBankList',
          )
        }
        style={{
          width: '50%',
          borderTopWidth: 4,
          borderRightWidth: 4,
          borderColor: '#AE0000',
          paddingVertical: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#AE0000', fontWeight: 600}}>
          {route.name === 'BloodBankList' || route.name === 'BloodSeekerDetails'
            ? 'হোম'
            : route.name === 'BloodBankDetails'
            ? 'হোম'
            : 'ব্যাংক হোম'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            route.name === 'BloodRequestForum' ? 'Home' : 'BloodRequestForum',
          )
        }
        style={{
          width: '50%',
          borderTopWidth: 4,
          borderColor: '#AE0000',
          paddingVertical: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: '#AE0000', fontWeight: 600}}>
          {route.name === 'BloodRequestForum' ? 'হোম' : 'নতুন আবেদন'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
