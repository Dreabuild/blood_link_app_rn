/* eslint-disable prettier/prettier */
import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import Footer from '../components/Footer';
import {NavigationProp} from '@react-navigation/native';

export default function BloodRequestForum({
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
            <Text>রক্তের অাবেদন ফোরাম</Text>
          </View>
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    </React.Fragment>
  );
}
