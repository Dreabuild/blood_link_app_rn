/* eslint-disable prettier/prettier */

import {NavigationProp} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import Feather from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';
import LoadingScreen from '../components/Loading';
import MyText from '../components/MyText';
import {API_URL} from '../config';
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
  const id = route.params;
  const [loading, setLoading] = useState(false);

  const [bloodDetails, setBloodDetails] = useState({
    blood_group: '',
    hemoglobin_point: '',
    patient_problem: '',
    amount_of_blood: '',
    district: '',
    description: '',
    hospital_name: '',
    delivery_time: '',
    views_count: '',
    mobile_number: '',
    whatsapp_number: '',
  });

  const makeCall = (number: string) => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber);
  };

  const sendSMS = async (number: string) => {
    let phoneNumber = '';

    if (await Linking.openURL(`whatsapp://send?phone=${number}`)) {
      phoneNumber = `whatsapp://send?phone=${number}`;
      Linking.openURL(phoneNumber);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Whatsapp message failed',
        text2: 'You need to have whatsapp installed in your phone',
      });
    }

    // if (Platform.OS === 'android') {
    //   phoneNumber = `sms:${number}`;
    // } else {
    //   phoneNumber = `sms:{number}`;
    // }
    // Linking.openURL(phoneNumber);
  };

  useEffect(() => {
    const loadBloodDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/request/${id}`);
        const data = await res.json();
        setBloodDetails(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    loadBloodDetails();
  }, [id]);

  const newAmountBlood = toBn(bloodDetails?.amount_of_blood?.toString());

  return (
    <React.Fragment>
      <View
        style={{
          borderWidth: 4,
          borderColor: '#AE0000',
          flex: 1,
          backgroundColor: '#ffffff',
        }}>
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
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
                  <MyText style={{fontWeight: 600, color: '#FFF'}}>
                    {bloodDetails?.blood_group}
                  </MyText>
                </View>
                <View style={{marginTop: 30}}>
                  <MyText
                    style={{
                      color: '#000',
                      marginTop: 20,
                      marginBottom: 15,
                      fontSize: 16,
                    }}>
                    রক্তের গ্রপঃ{' '}
                    <MyText style={{color: '#BF0000'}}>
                      {bloodDetails?.blood_group}
                    </MyText>
                  </MyText>
                  <MyText
                    style={{color: '#000', marginBottom: 15, fontSize: 16}}>
                    হিমোগ্লোবিন পয়েন্টঃ{' '}
                    <MyText style={{color: '#BF0000'}}>
                      {bloodDetails?.hemoglobin_point
                        ? bloodDetails?.hemoglobin_point
                        : 'নেই'}
                    </MyText>
                  </MyText>
                  <MyText
                    style={{color: '#000', marginBottom: 15, fontSize: 16}}>
                    রোগীর সমস্যাঃ{' '}
                    <MyText style={{color: '#BF0000'}}>
                      {bloodDetails?.patient_problem}
                    </MyText>
                  </MyText>
                  <MyText
                    style={{color: '#000', marginBottom: 15, fontSize: 16}}>
                    রক্তের পরিমানঃ{' '}
                    <MyText style={{color: '#BF0000'}}>
                      {newAmountBlood} ব্যাগ
                    </MyText>
                  </MyText>
                  <MyText
                    style={{color: '#000', marginBottom: 15, fontSize: 16}}>
                    জেলাঃ{' '}
                    <MyText style={{color: '#BF0000'}}>
                      {bloodDetails?.district}
                    </MyText>
                  </MyText>
                  <MyText
                    style={{color: '#000', marginBottom: 15, fontSize: 16}}>
                    রক্তদানের তারিখঃ{' '}
                    <MyText style={{color: '#BF0000'}}>
                      {moment(bloodDetails?.delivery_time).format('LLL')}
                    </MyText>
                  </MyText>
                  <MyText
                    style={{color: '#000', marginBottom: 15, fontSize: 16}}>
                    রক্তদানের স্থানঃ{' '}
                    <MyText style={{color: '#BF0000'}}>
                      {bloodDetails?.hospital_name}{' '}
                    </MyText>
                  </MyText>
                  <MyText
                    style={{
                      color: '#000',
                      marginBottom: 15,
                      fontSize: 16,
                    }}>
                    সংক্ষিপ্ত বিবরনঃ{' '}
                    <MyText style={{color: '#686868'}}>
                      {bloodDetails?.description
                        ? bloodDetails?.description
                        : 'নেই'}
                    </MyText>
                  </MyText>
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
                <MyText style={{color: '#BF0000'}}>#{id}</MyText>
                <MyText style={{color: '#B9B9B9'}}>
                  আবেদনটি দেখা হয়েছে: {bloodDetails?.views_count}
                </MyText>
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
                  onPress={() => makeCall(bloodDetails?.mobile_number[0])}
                  style={{
                    backgroundColor: '#F9E6E6',
                    padding: 10,
                    marginRight: 10,
                  }}>
                  <MyText
                    style={{
                      color: '#BF0000',
                      fontWeight: 800,
                      position: 'relative',
                    }}>
                    {/* < */}
                    <Feather
                      name="phone"
                      style={{fontSize: 15, color: '#AE0000'}}
                    />{' '}
                    কল করুন
                  </MyText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => sendSMS(bloodDetails?.whatsapp_number)}
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
          </>
        )}
      </View>
    </React.Fragment>
  );
}
