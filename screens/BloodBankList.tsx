/* eslint-disable prettier/prettier */
import {NavigationProp} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  Image,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Footer from '../components/Footer';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {API_URL} from '../config';

export default function BloodBankList({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [bankList, setBankList] = React.useState([]);
  const getBloodBankList = async () => {
    try {
      const URL = `${API_URL}/bank`;
      const response = await fetch(URL);
      const data = await response.json();

      setBankList(data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodBankList();
  }, []);

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
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 4,
              paddingVertical: 10,
              gap: 10,
            }}>
            {bankList.map((item, index) => (
              <View
                key={index}
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#1e1e1e',
                }}>
                <View style={{width: '60%', padding: 20, gap: 3}}>
                  <Text style={{color: '#BF0000'}}>#{item?.id}</Text>
                  <Text style={{color: '#000000'}}>{item?.name}</Text>
                  <Text style={{color: '#989898'}}>{item?.address}</Text>
                  <View style={{marginTop: 18, flexDirection: 'row', gap: 8}}>
                    <TouchableOpacity
                      onPress={() => makeCall(item?.contact[0])}
                      style={{
                        backgroundColor: '#BF0000',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                        minWidth: 80,
                        gap: 5,
                      }}>
                      <FeatherIcon name="phone" size={20} color="#FFFFFF" />
                      <Text
                        style={{
                          color: '#FFFFFF',
                        }}>
                        কল
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => sendSMS(item?.contact[0])}
                      style={{
                        backgroundColor: '#BF0000',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 10,
                        minWidth: 80,
                        gap: 5,
                      }}>
                      <FeatherIcon
                        name="message-circle"
                        size={20}
                        color="#FFFFFF"
                      />
                      <Text
                        style={{
                          color: '#FFFFFF',
                        }}>
                        ম্যাসেজ
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <Image
                  style={{
                    width: '40%',
                    height: '100%',
                  }}
                  source={{
                    uri: item?.image,
                  }}
                />
              </View>
            ))}
          </View>
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    </React.Fragment>
  );
}
