/* eslint-disable prettier/prettier */
import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';
import {IBloodSeeker} from '../types/BloodSeeker';
import {toBn} from '../util/toBn';

export default function BloodSeekerDetails({
  route,
  navigation,
}: {
  route: {
    params: IBloodSeeker;
  };
  navigation: NavigationProp<any>;
}) {
  const {
    blood_group,
    hemoglobin_point,
    patient_problem,
    amount_of_blood,
    district,
    description,
    hospital_name,
    delivery_time,
    id,
    views_count,
    mobile_number,
    whatsapp_number,
  } = route.params;

  const newAmountBlood = toBn(amount_of_blood.toString());

  const makeCall = (number: string) => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber);
  };

  const sendSMS = (number: string) => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `sms:${number}`;
    } else {
      phoneNumber = `sms:${number}`;
    }

    Linking.openURL(phoneNumber);
  };

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
            margin: 20,
          }}>
          {/* Blood Details info */}
          <View>
            <View
              style={{
                backgroundColor: '#AE0000',
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 600, color: '#FFF'}}>
                {blood_group}
              </Text>
            </View>
            <View style={{marginTop: 30}}>
              <Text
                style={{
                  color: '#000',
                  marginTop: 20,
                  marginBottom: 15,
                  fontSize: 16,
                }}>
                রক্তের গ্রপঃ{' '}
                <Text style={{color: '#BF0000'}}>{blood_group}</Text>
              </Text>
              <Text style={{color: '#000', marginBottom: 15, fontSize: 16}}>
                হিমোগ্লোবিন পয়েন্টঃ{' '}
                <Text style={{color: '#BF0000'}}>{hemoglobin_point}</Text>
              </Text>
              <Text style={{color: '#000', marginBottom: 15, fontSize: 16}}>
                রোগীর সমস্যাঃ{' '}
                <Text style={{color: '#BF0000'}}>{patient_problem}</Text>
              </Text>
              <Text style={{color: '#000', marginBottom: 15, fontSize: 16}}>
                রক্তের পরিমানঃ{' '}
                <Text style={{color: '#BF0000'}}>{newAmountBlood} ব্যাগ</Text>
              </Text>
              <Text style={{color: '#000', marginBottom: 15, fontSize: 16}}>
                জেলাঃ <Text style={{color: '#BF0000'}}>{district}</Text>
              </Text>
              <Text style={{color: '#000', marginBottom: 15, fontSize: 16}}>
                রক্তদানের তারিখঃ{' '}
                <Text style={{color: '#BF0000'}}>{delivery_time}</Text>
              </Text>
              <Text style={{color: '#000', marginBottom: 15, fontSize: 16}}>
                রক্তদানের স্থানঃ{' '}
                <Text style={{color: '#BF0000'}}>{hospital_name} </Text>
              </Text>
              <Text
                style={{
                  color: '#000',
                  marginBottom: 15,
                  fontSize: 16,
                }}>
                সংক্ষিপ্ত বিবরনঃ{' '}
                <Text style={{color: '#686868'}}>{description}</Text>
              </Text>
            </View>
          </View>
          {/* HR */}
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          {/* Seen Count */}
          <View
            style={{
              flex: 1,
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{color: '#BF0000'}}>#{id}</Text>
            <Text style={{color: '#B9B9B9'}}>
              আবেদনটি দেখা হয়েছে: {views_count}
            </Text>
          </View>
          {/* Button */}
          <View
            style={{
              flex: 1,
              marginTop: 50,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => makeCall(mobile_number)}
              style={{
                backgroundColor: '#F9E6E6',
                padding: 10,
                marginRight: 10,
              }}>
              <Text style={{color: '#BF0000', fontWeight: 800}}>
                <Feather
                  name="phone"
                  style={{fontSize: 15, color: '#AE0000'}}
                />{' '}
                কল করুন
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => sendSMS(whatsapp_number)}
              style={{
                backgroundColor: '#E6F9EA',
                padding: 5,
                width: 40,
              }}>
              <Image source={require('../assets/WhatsApp.png')} />
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    </React.Fragment>
  );
}
