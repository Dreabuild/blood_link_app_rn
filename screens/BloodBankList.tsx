/* eslint-disable prettier/prettier */
import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Footer from '../components/Footer';
import FeatherIcon from 'react-native-vector-icons/Feather';

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
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingVertical: 40,
              gap: 10,
            }}>
            {[1, 2, 3].map((item, index) => (
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderColor: '#1e1e1e',
                }}>
                <View style={{width: '60%', padding: 20, gap: 3}}>
                  <Text style={{color: '#BF0000'}}>#DHK01</Text>
                  <Text style={{color: '#000000'}}>
                    LABAID HOSPITAL BLOOD BANK
                  </Text>
                  <Text style={{color: '#989898'}}>
                    House #69, Road #9/A, Dhanmondi R/A
                  </Text>
                  <View style={{marginTop: 18, flexDirection: 'row', gap: 8}}>
                    <TouchableOpacity
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
                  style={{width: '40%', height: '100%'}}
                  source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Hospital-de-Bellvitge.jpg/640px-Hospital-de-Bellvitge.jpg',
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
