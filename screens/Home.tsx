/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native-gesture-handler';
import {NavigationProp} from '@react-navigation/native';
import Footer from '../components/Footer';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const zilas = ['ঢাকা', 'চট্টগ্রাম', 'খুলনা', 'সিলেট'];
const requests = [];

export default function Home({navigation}: {navigation: NavigationProp<any>}) {
  const [selectedBloodGroup, setSelectedBloodGroup] = React.useState('');
  const [selectedZila, setSelectedZila] = React.useState('');

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
          {/* SELCECT BLOOD GROUP AND ZILA */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingVertical: 40,
            }}>
            {/* SELECT BLOOD GROUP */}
            <SelectDropdown
              data={bloodGroups}
              renderItem={item => {
                return (
                  <View>
                    <Text style={{color: '#1e1e1e', padding: 10}}>{item}</Text>
                  </View>
                );
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View
                    style={{
                      width: '48%',
                      height: 45,
                      backgroundColor: '#ffffff',
                      alignItems: 'center',
                      borderWidth: 0.7,
                      borderColor: '#1e1e1e',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 10,
                    }}>
                    <Text style={{color: '#1e1e1e'}}>
                      {selectedBloodGroup ? selectedBloodGroup : 'রক্তের গ্রুপ'}
                    </Text>
                    <Icon
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      style={{fontSize: 28}}
                    />
                  </View>
                );
              }}
              onSelect={selectedItem => {
                setSelectedBloodGroup(selectedItem);
              }}
            />
            {/* SELECT ZILA */}
            <SelectDropdown
              data={zilas}
              renderItem={item => {
                return (
                  <View>
                    <Text style={{color: '#1e1e1e', padding: 10}}>{item}</Text>
                  </View>
                );
              }}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View
                    style={{
                      width: '48%',
                      height: 45,
                      backgroundColor: '#ffffff',
                      alignItems: 'center',
                      borderWidth: 0.7,
                      borderColor: '#1e1e1e',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 10,
                    }}>
                    <Text style={{color: '#1e1e1e'}}>
                      {selectedZila ? selectedZila : 'সকল জেলা'}
                    </Text>
                    <Icon
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      style={{fontSize: 28}}
                    />
                  </View>
                );
              }}
              onSelect={selectedItem => {
                setSelectedZila(selectedItem);
              }}
            />
          </View>

          {/* REQUEST COUNT */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 20,
              paddingBottom: 40,
            }}>
            <Text style={{color: '#000', fontWeight: '600'}}>
              <Text style={{color: '#AE0000'}}>
                {requests.length ? requests.length : 0}
              </Text>{' '}
              টি আবেদন পাওয়া গেছে "{selectedZila ? selectedZila : 'সকল'}" জেলায়
            </Text>
          </View>

          {/* REQUEST LIST */}
          <View style={{paddingHorizontal: 20}}>
            {/* REQUEST CARD */}
            <TouchableOpacity
              style={{
                padding: 12,
                borderWidth: 0.7,
                borderColor: '#1e1e1e',
                marginBottom: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 16,
                }}>
                <View
                  style={{
                    backgroundColor: '#AE0000',
                    width: 50,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontWeight: 600, color: '#FFF'}}>O+</Text>
                </View>
                <Text style={{color: '#989898', fontSize: 13}}>#501</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 35,
                }}>
                <View>
                  <Text style={{color: '#000'}}>Lab Aid Hospital, Dhaka</Text>
                  <Text style={{color: '#000'}}>ঢাকা</Text>
                </View>
                <Text style={{color: '#AE0000'}}>২ ব্যাগ</Text>
              </View>
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  backgroundColor: '#EBB0B0',
                  padding: 3,
                }}>
                <Feather
                  name="arrow-up-right"
                  style={{fontSize: 20, color: '#AE0000'}}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    </React.Fragment>
  );
}
