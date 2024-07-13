/* eslint-disable prettier/prettier */
import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ScrollView, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Footer from '../components/Footer';
import MyText from '../components/MyText';
import {API_URL} from '../config';
import Toast from 'react-native-toast-message';

export default function SubmitReview({
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
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const url = `${API_URL}/api/v1/review/create`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data?.name,
          email: data?.email,
          phone_number: data?.phone,
          description: data?.message,
        }),
      });

      const result = await res.json();

      Toast.show({
        type: 'success',
        text1: 'নতুন আবেদন সফল!',
        text2: 'নতুন আবেদন সফল ভাবে পাঠানো হয়েছে',
      });
      navigation.navigate('Home', {refresh: true});
      if (result?.error) {
        Toast.show({
          type: 'error',
          text1: 'Review Failed',
          text2: 'দুঃখিত, আরেকবার চেষ্টা করুন',
        });
      }
    } catch (e: any) {
      console.log(e);
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
            <View style={{marginTop: 20, gap: 10}}>
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
                name="name"
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: '#DDDDDD',
                      borderRadius: 5,
                      padding: 10,
                    }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="আপনার নাম"
                  />
                )}
              />
              {errors.name && (
                <MyText
                  style={{
                    color: '#BF0000',
                    fontSize: 14,
                    marginTop: 5,
                    textAlign: 'center',
                    fontFamily: 'Li Ador Noirrit',
                  }}>
                  অনুগ্রহ করে প্রাথমিক তথ্য পূরন করুন
                </MyText>
              )}

              <Controller
                control={control}
                name="email"
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: '#DDDDDD',
                      borderRadius: 5,
                      padding: 10,
                    }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="আপনার  ইমেইল"
                  />
                )}
              />
              {errors.email && (
                <MyText
                  style={{
                    color: '#BF0000',
                    fontSize: 14,
                    marginTop: 5,
                    textAlign: 'center',
                    fontFamily: 'Li Ador-Noirrit',
                  }}>
                  অনুগ্রহ করে ইমেইল পূরন করুন
                </MyText>
              )}

              <Controller
                control={control}
                name="phone"
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: '#DDDDDD',
                      borderRadius: 5,
                      padding: 10,
                    }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="আপনার মোবা্ইল নাম্বার"
                  />
                )}
              />
              {errors.phone && (
                <MyText
                  style={{
                    color: '#BF0000',
                    fontSize: 14,
                    marginTop: 5,
                    textAlign: 'center',
                    fontFamily: 'Li Ador-Noirrit',
                  }}>
                  অনুগ্রহ করে ফোন পূরন করুন
                </MyText>
              )}

              <Controller
                control={control}
                name="message"
                rules={{required: true}}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: '#DDDDDD',
                      borderRadius: 5,
                      padding: 10,
                    }}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="আপনার মন্তব্য লিখুন"
                  />
                )}
              />
              {errors.message && (
                <MyText
                  style={{
                    color: '#BF0000',
                    fontSize: 14,
                    marginTop: 5,
                    textAlign: 'center',
                    fontFamily: 'Li Ador-Noirrit',
                  }}>
                  অনুগ্রহ করে মতামত লিখুন
                </MyText>
              )}
            </View>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={{
                backgroundColor: '#BF0000',
                padding: 10,
                marginRight: 10,
                marginTop: 10,
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
                marginRight: 10,
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
