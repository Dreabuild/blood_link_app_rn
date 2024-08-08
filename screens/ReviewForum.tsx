/* eslint-disable prettier/prettier */
import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ScrollView, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import Footer from '../components/Footer';
import MyText from '../components/MyText';
import {API_URL} from '../config';
import {reviewSchema} from '../types/Review';

export default function ReviewForum({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      mobile_number: '',
      comments: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const safeData = reviewSchema.safeParse(data);
      console.log(safeData.error);
      if (safeData.error) {
        Toast.show({
          type: 'error',
          text1: 'নতুন রিভিউ ব্যর্থ',
          text2: 'দয়া করে সঠিক ভাবে ফর্ম পূরণ করুন',
        });
        return;
      }
      const url = `${API_URL}/request/create`;
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
        text1: 'নতুন রিভিউ সফল!',
        text2: 'নতুন আবেদন সফল ভাবে পাঠানো হয়েছে',
      });
      navigation.navigate('Home', {refresh: true});
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'নতুন রিভিউ ব্যর্থ',
        text2: 'দুঃখিত, আরেকবার চেষ্টা করুন',
      });
    }
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
          <View>
            <MyText
              style={{
                color: '#000',
                fontSize: 20,
                marginTop: 20,
                textAlign: 'center',
              }}>
              রিভিও দিতে নিচের তথ্য পূরন করুন
            </MyText>
            <View style={{marginTop: 20}}>
              <MyText
                style={{
                  color: '#BF0000',
                  fontSize: 16,
                  marginTop: 20,
                  marginBottom: 20,
                  fontFamily: 'Li Ador Noirrit Bold',
                }}>
                প্রাথমিক তথ্য
              </MyText>
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
                      borderColor: !error ? '#000' : '#BF0000',
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
                    placeholder={'আপনার ইমেইল'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor={'#989898'}
                    style={{
                      color: '#000',
                      borderColor: !error ? '#000' : '#BF0000',
                      borderWidth: 1,
                      padding: 10,
                      marginBottom: 20,
                      fontFamily: 'Li Ador Noirrit',
                    }}
                  />
                )}
                name={'email'}
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
                    placeholder={'আপনার মোবাইল নাম্বার'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor={'#989898'}
                    style={{
                      color: '#000',
                      borderColor: !error ? '#000' : '#BF0000',
                      borderWidth: 1,
                      padding: 10,
                      marginBottom: 20,
                      fontFamily: 'Li Ador Noirrit',
                    }}
                  />
                )}
                name={'mobile_number'}
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
                    placeholder={'আপনার মন্তব্য লিখুন'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor={'#989898'}
                    style={{
                      color: '#000',
                      borderColor: !error ? '#000' : '#BF0000',
                      borderWidth: 1,
                      padding: 10,
                      marginBottom: 20,
                      height: 150,
                      fontFamily: 'Li Ador Noirrit',
                    }}
                  />
                )}
                name={'comments'}
              />
            </View>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={{
                backgroundColor: '#BF0000',
                padding: 10,
                marginRight: 10,
                  width:'100%'
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
          </View>
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    </React.Fragment>
  );
}
