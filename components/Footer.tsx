/* eslint-disable prettier/prettier */

import {NavigationProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import MyText from './MyText';
import Feather from 'react-native-vector-icons/Feather';

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
          flexDirection: 'row',
          gap: 6,
        }}>
        {route.name === 'BloodBankList' ||
        route.name === 'BloodSeekerDetails' ? (
          <>
            <Feather name="home" size={18} color="#AE0000" />
            <MyText style={{color: '#AE0000', fontWeight: 600}}>হোম</MyText>
          </>
        ) : route.name === 'BloodBankDetails' ? (
          <>
            <Feather name="home" size={18} color="#AE0000" />
            <MyText style={{color: '#AE0000', fontWeight: 600}}>হোম</MyText>
          </>
        ) : (
          <>
            <Image source={require('../assets/icons/Union.png')} height={30} />
            <MyText style={{color: '#AE0000', fontWeight: 600}}>
              ব্লাড ব্যাংক
            </MyText>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            route.name === 'BloodRequestForum' ? 'Home' : 'BloodRequestForum',
            route.name === 'Home' && {refresh: true},
          )
        }
        style={{
          width: '50%',
          borderTopWidth: 4,
          borderColor: '#AE0000',
          paddingVertical: 8,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 6,
        }}>
        {route.name === 'BloodRequestForum' ? (
          <>
            <Feather name="home" size={18} color="#AE0000" />
            <MyText style={{color: '#AE0000', fontWeight: 600}}>হোম</MyText>
          </>
        ) : (
          <>
            <Image
              source={require('../assets/icons/folder-plus.png')}
              height={30}
            />
            <MyText style={{color: '#AE0000', fontWeight: 600}}>
              নতুন আবেদন
            </MyText>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}
