/* eslint-disable prettier/prettier */
import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ScrollView, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-toast-message';
import Footer from '../components/Footer';
import MyText from '../components/MyText';
import {API_URL} from '../config';
import zillas from '../data/district.json';
import {bloodDonarSchema} from '../types/BloodDonar';

export default function BloodDonarForum({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      blood_group: '',
      district: '',
      phone_number: '',
      gender: '',
      name: '',
      street_address: '',
      birth_year: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const modifiedData = {
        name: data.name,
        street_address: data.street_address,
        birth_year: data.birth_year,
        blood_group: data.blood_group,
        district: data.district,
        phone_number: data.phone_number,
        gender: 'male',
      };
      const safeData = bloodDonarSchema.safeParse(modifiedData);
      if (safeData.error) {
        Toast.show({
          type: 'error',
          text1: 'ডোনার রেজিস্ট্রেশন ব্যর্থ',
          text2: 'দয়া করে সঠিক ভাবে ফর্ম পূরণ করুন',
        });
        return;
      }
      const url = `${API_URL}/donor`;
      await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...safeData.data,
        }),
      });
      Toast.show({
        type: 'success',
        text1: 'ডোনার রেজিস্ট্রেশন সফল!',
        text2: 'ডোনার রেজিস্ট্রেশন সফল ভাবে হয়েছে',
      });
      reset();
      navigation.navigate('Home', {refresh: true});
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Donar Registration Failed',
        text2: 'দুঃখিত, আরেকবার চেষ্টা করুন',
      });
    }
  };

  const newZillas = zillas.data.map(zilla => {
    return {label: zilla.bn_name, value: zilla.bn_name};
  });

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
          <View>
            <MyText
              style={{
                color: '#000',
                fontSize: 20,
                marginTop: 20,
                textAlign: 'center',
              }}>
              উপযুক্ত তথ্য দিয়ে ফরমটি পূরণ করুন
            </MyText>
            <View style={{marginTop: 20}}>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({
                  field: {onChange, onBlur, value},
                  fieldState: {error},
                }) => (
                  <TextInput
                    placeholder={'আপনার নাম'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor={'#989898'}
                    style={{
                      color: '#000',
                        borderColor: !error ? '#DDD' : '#BF0000', borderRadius: 5,
                      borderWidth: 1,
                      padding: 10,
                      marginBottom: 20,
                      fontFamily: 'Li Ador Noirrit',
                    }}
                  />
                )}
                name={'name'}
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({
                  field: {onChange, onBlur, value},
                  fieldState: {error},
                }) => (
                  <TextInput
                    placeholder={'জন্ম সাল'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor={'#989898'}
                    style={{
                      color: '#000',
                        borderColor: !error ? '#DDD' : '#BF0000', borderRadius: 5,
                      borderWidth: 1,
                      padding: 10,
                      marginBottom: 20,
                      fontFamily: 'Li Ador Noirrit',
                    }}
                  />
                )}
                name={'birth_year'}
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <View
                    style={{
                      marginBottom: 20,
                      borderWidth: 1,
                        borderColor: !error ? '#DDD' : '#BF0000', borderRadius: 5,
                    }}>
                    <RNPickerSelect
                      pickerProps={{
                        style: {fontFamily: 'Li Ador Noirrit'},
                      }}
                      placeholder={{
                        label: 'রোগীর রক্তের গ্রুপ',
                        value: null,
                        color: '#989898',
                      }}
                      onValueChange={onChange}
                      value={value}
                      items={[
                        {label: 'A+', value: 'A+'},
                        {label: 'B+', value: 'B+'},
                        {label: 'AB+', value: 'AB+'},
                        {label: 'AB-', value: 'AB-'},
                        {label: 'O-', value: 'O-'},
                        {label: 'O+', value: 'O+'},
                        {label: 'A-', value: 'A-'},
                        {label: 'B-', value: 'B-'},
                      ]}
                      style={{
                        inputAndroid: {
                          color: '#000',
                          fontFamily: 'Li Ador Noirrit',
                        },
                      }}
                    />
                  </View>
                )}
                name={'blood_group'}
              />
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <View
                    style={{
                      marginBottom: 20,
                      borderWidth: 1,
                        borderColor: !error ? '#DDD' : '#BF0000', borderRadius: 5,
                    }}>
                    <RNPickerSelect
                      pickerProps={{
                        style: {fontFamily: 'Li Ador Noirrit'},
                      }}
                      placeholder={{
                        label: 'জেন্ডার',
                        value: null,
                        color: '#989898',
                      }}
                      style={{
                        inputAndroid: {
                          color: '#000',
                          fontFamily: 'Li Ador Noirrit',
                        },
                      }}
                      onValueChange={onChange}
                      value={value}
                      items={[
                        {label: 'পুরুষ', value: 'male'},
                        {label: 'মহিলা', value: 'female'},
                      ]}
                    />
                  </View>
                )}
                name={'gender'}
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({
                  field: {onChange, onBlur, value},
                  fieldState: {error},
                }) => (
                  <TextInput
                    placeholder={'স্ট্রিট এড্রেস'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor={'#989898'}
                    style={{
                      color: '#000',
                        borderColor: !error ? '#DDD' : '#BF0000', borderRadius: 5,
                      borderWidth: 1,
                      padding: 10,
                      marginBottom: 20,
                      fontFamily: 'Li Ador Noirrit',
                    }}
                  />
                )}
                name={'street_address'}
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, value}, fieldState: {error}}) => (
                  <View
                    style={{
                      marginBottom: 20,
                      borderWidth: 1,
                        borderColor: !error ? '#DDD' : '#BF0000', borderRadius: 5,
                    }}>
                    <RNPickerSelect
                      onValueChange={onChange}
                      value={value}
                      items={newZillas}
                      pickerProps={{
                        style: {fontFamily: 'Li Ador Noirrit'},
                      }}
                      placeholder={{
                        label: 'জেলা নির্বাচন করুন',
                        value: null,
                        color: '#989898',
                      }}
                      style={{
                        inputAndroid: {
                          color: '#000',
                          fontFamily: 'Li Ador Noirrit',
                        },
                      }}
                    />
                  </View>
                )}
                name={'district'}
              />
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({
                  field: {onChange, onBlur, value},
                  fieldState: {error},
                }) => {
                  return (
                    <View
                      style={{
                        borderWidth: 1,
                          borderColor: !error ? '#DDD' : '#BF0000', borderRadius: 5,
                        marginBottom: 20,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <TextInput
                        placeholder={'মোবাইল নাম্বার'}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholderTextColor={'#989898'}
                        style={{
                          color: '#000',
                          borderColor: !error ? '#000' : '#BF0000',
                          borderWidth: 0,
                          fontFamily: 'Li Ador Noirrit',
                        }}
                      />
                    </View>
                  );
                }}
                name={'phone_number'}
              />
            </View>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={{
                backgroundColor: '#BF0000',
                padding: 10,
              }}>
              <MyText
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  fontFamily: 'Li Ador Noirrit Bold',
                }}>
                সাবমিট
              </MyText>
            </TouchableOpacity>
              <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{
                      backgroundColor: '#F9E6E6',
                      padding: 10,
                      marginTop: 10,
                  }}>
                  <MyText
                      style={{
                          color: '#BF0000',
                          textAlign: 'center',
                          fontFamily: 'Li Ador Noirrit Bold',
                      }}>
                      ফিরে যাও
                  </MyText>
              </TouchableOpacity>
          </View>
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    </React.Fragment>
  );
}
