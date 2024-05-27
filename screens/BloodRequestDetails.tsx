/* eslint-disable prettier/prettier */
import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {ScrollView, View} from 'react-native';
import Footer from '../components/Footer';
import MyText from '../components/MyText';

export default function BloodRequestDetails({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  return (
    <React.Fragment>
      <View
        style={{
          borderWidth: 4,
          borderColor: '#AE0000',
          flex: 1,
          backgroundColor: '#ffffff',
        }}>
        <ScrollView
          style={{
            flex: 1,
          }}>
          <View>
            <MyText>রক্তের আবেদনের বিস্তারিত তথ্য এখানে দেখানো হবে</MyText>
          </View>
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    </React.Fragment>
  );
}
