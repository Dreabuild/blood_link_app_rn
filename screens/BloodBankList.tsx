/* eslint-disable prettier/prettier */
import {NavigationProp} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LoaderKit from 'react-native-loader-kit';
import call from 'react-native-phone-call';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Footer from '../components/Footer';

export default function BloodBankList({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [bloodBanks, setBloodBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const loadBloodBank = async () => {
      const url = 'https://blood-link-backend-iota.vercel.app/api/v1/bank';
      const res = await fetch(url);
      const {data} = await res.json();
      setLoading(false);
      setBloodBanks(data);
    };
    loadBloodBank();
  }, []);

  const toEn = (n: any): string =>
    n.replace(/[০-৯]/g, (d: any) => '০১২৩৪৫৬৭৮৯'.indexOf(d));
  const triggerCall = (phone: string) => {
    const args = {
      number: toEn(phone), // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call
      skipCanOpen: true, // Skip the canOpenURL check
    };

    call(args).catch(console.error);
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
          {loading ? (
            <LoaderKit
              style={{
                width: 50,
                height: 50,
                marginTop: 55,
                marginHorizontal: 'auto',
              }}
              name={'BallPulseSync'} // Optional: see list of animations below
              color={'#BF0000'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
            />
          ) : (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 40,
                gap: 10,
              }}>
              {bloodBanks.length > 0 ? (
                bloodBanks.map(({id, name, address, image, contact}, index) => (
                  <View
                    key={index}
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderWidth: 1,
                      borderColor: '#1e1e1e',
                    }}>
                    <View style={{width: '60%', padding: 20, gap: 3}}>
                      <Text style={{color: '#BF0000'}}>#{id}</Text>
                      <Text style={{color: '#000000'}}>{name}</Text>
                      <Text style={{color: '#989898'}}>{address}</Text>
                      <View
                        style={{marginTop: 18, flexDirection: 'row', gap: 8}}>
                        <TouchableOpacity
                          onPress={() => triggerCall(contact[0])}
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
                          onPress={() => Linking.openURL(`sms:${contact[0]}`)}
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
                      style={{width: '33%', height: '100%', gap: 3}}
                      source={{
                        uri: image,
                      }}
                    />
                  </View>
                ))
              ) : (
                <Text style={{textAlign: 'center'}}>No Blood Bank Found !</Text>
              )}
            </View>
          )}
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    </React.Fragment>
  );
}
