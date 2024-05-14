/* eslint-disable prettier/prettier */
import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import Footer from '../components/Footer';

export default function BloodBankList({
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
            <Text>ব্লাড ব্যাংক লিস্ট</Text>
          </View>
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    </React.Fragment>
  );
}
