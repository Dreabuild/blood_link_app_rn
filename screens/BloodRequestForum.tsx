/* eslint-disable prettier/prettier */
import {NavigationProp} from '@react-navigation/native';
import moment from 'moment';
import React, {useState} from 'react';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {ScrollView, TextInput, View} from 'react-native';
import CheckBox from 'react-native-check-box';
import DatePicker from 'react-native-date-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Footer from '../components/Footer';
import MyText from '../components/MyText';
import {API_URL} from '../config';
import zillas from '../data/district.json';
import {bloodSeekerSchema} from '../types/BloodSeeker';
import LoadingScreen from "../components/Loading.tsx";

export default function BloodRequestForum({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [loading,setLoading] = useState(false)

  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      blood_group: '',
      hemoglobin_point: '',
      amount_of_blood: '',
      patient_problem: '',
      district: '',
      hospital_name: '',
      mobile_numbers: [{number: ''}],
      whatsapp_number: '',
      facebook_account_url: '',
      gender: '',
      relationship: '',
      urgent: false,
      description: '',
      delivery_time: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
        setLoading(true)
      const mobile_numbers = data.mobile_numbers.map(
        (number: any) => number.number,
      );

      const modifiedData = {
        blood_group: data.blood_group,
        hemoglobin_point: Number(data.hemoglobin_point),
        amount_of_blood: Number(data.amount_of_blood),
        patient_problem: data.patient_problem,
        district: data.district,
        hospital_name: data.hospital_name,
        relationship: data.relationship,
        mobile_number: mobile_numbers,
        whatsapp_number: data.whatsapp_number,
        facebook_account_url: data.facebook_account_url,
        gender: data.gender,
        delivery_time: date,
        urgent: data.urgent,
        description: data.description,
      };
      const safeData = bloodSeekerSchema.safeParse(modifiedData);
      if (safeData.error) {
          console.log(safeData.error)
        Toast.show({
          type: 'error',
          text1: 'নতুন আবেদন ব্যর্থ',
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
        text1: 'নতুন আবেদন সফল!',
        text2: 'নতুন আবেদন সফল ভাবে পাঠানো হয়েছে',
      });
      reset();
      navigation.navigate('Home', {refresh: true});
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'নতুন আবেদন ব্যর্থ',
        text2: 'দুঃখিত, আরেকবার চেষ্টা করুন',
      });
    }finally {
        setLoading(false)
    }
  }

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'mobile_numbers',
  });

  const firstMoNo = fields[0];

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
          {loading ? <LoadingScreen/> :(
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
                              render={({
                                           field: {onChange, onBlur, value},
                                           fieldState: {error},
                                       }) => (
                                  <TextInput
                                      placeholder={'হিমোগ্লোবিন পয়েন্ট (ঐচ্ছিক)'}
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
                              name={'hemoglobin_point'}
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
                                      placeholder={'রক্তের পরিমান (ব্যাগ সংখ্যা)'}
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
                              name={'amount_of_blood'}
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
                                      placeholder={'রোগীর সমস্যা'}
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
                              name={'patient_problem'}
                          />
                      </View>
                      <View style={{marginTop: 20}}>
                          <MyText
                              style={{
                                  color: '#BF0000',
                                  fontSize: 16,
                                  marginTop: 20,
                                  marginBottom: 20,
                                  fontFamily: 'Li Ador Noirrit Bold',
                              }}>
                              অন্যান্য তথ্য
                          </MyText>
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
                                              label: 'জেলা নির্বাচন',
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
                                       }) => (
                                  <TextInput
                                      placeholder={'হাসপাতালের নাম'}
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
                              name={'hospital_name'}
                          />
                          {fields.map((field, index) => (
                              <Controller
                                  key={field.id}
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
                                                      borderColor: !error ? '#DDD' : '#BF0000', borderRadius: 5,
                                                      borderWidth: 0,
                                                      width: index === fields.length - 1 ? '50%' : '100%',
                                                      fontFamily: 'Li Ador Noirrit',
                                                  }}
                                                  onKeyPress={({nativeEvent}) => {
                                                      if (
                                                          nativeEvent.key === 'Backspace' &&
                                                          value.length === 0
                                                      ) {
                                                          if (firstMoNo.id === field.id) {
                                                              return;
                                                          }
                                                          remove(index);
                                                      }
                                                  }}
                                              />
                                              {index === fields.length - 1 && (
                                                  <TouchableOpacity
                                                      onPress={() => append({number: ''})}
                                                      style={{
                                                          marginRight: 10,
                                                          backgroundColor: '#BF0000',
                                                          padding: 10,
                                                          flexDirection: 'row',
                                                      }}>
                                                      <Icon
                                                          name="plus"
                                                          style={{color: '#fff'}}
                                                          size={20}
                                                      />
                                                      <MyText style={{color: '#fff'}}>
                                                          আরো যোগ করুন
                                                      </MyText>
                                                  </TouchableOpacity>
                                              )}
                                          </View>
                                      );
                                  }}
                                  name={`mobile_numbers.${index}.number`}
                              />
                          ))}
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
                                      placeholder={'হোয়াটএপস নাম্বার'}
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
                              name={'whatsapp_number'}
                          />
                          <Controller
                              control={control}
                              rules={{
                                  required: false,
                              }}
                              render={({
                                           field: {onChange, onBlur, value},
                                           fieldState: {error},
                                       }) => (
                                  <TextInput
                                      placeholder={'ফেসবুক একাউন্টের লিংক (ঐচ্ছিক)'}
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
                              name={'facebook_account_url'}
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
                                              label: 'রোগীর জেন্ডার (ঐচ্ছিক)',
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
                                  required: false,
                              }}
                              render={({
                                           field: {onChange, onBlur, value},
                                           fieldState: {error},
                                       }) => (
                                  <TextInput
                                      placeholder={'আপনি রোগীর কি হোন? (ঐচ্ছিক)'}
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
                              name={'relationship'}
                          />
                          <Controller
                              control={control}
                              rules={{
                                  required: true,
                              }}
                              render={({field: {onChange, value}, fieldState: {error}}) => {
                                  return (
                                      <>
                                          <TextInput
                                              showSoftInputOnFocus={false}
                                              placeholder={'রক্ত প্রয়োজনের সময় সিলেক্ট করুন?'}
                                              value={
                                                  (value as any) instanceof Date
                                                      ? moment(value).format('lll')
                                                      : ''
                                              }
                                              onPress={() => setOpen(true)}
                                              placeholderTextColor={'#989898'}
                                              style={{
                                                  color: '#000',
                                                  borderColor: !error ? '#DDD' : '#BF0000', borderRadius: 5,
                                                  borderWidth: 1,
                                                  padding: 10,
                                                  marginBottom: 20,
                                                  fontFamily: 'Li Ador Noirrit',
                                              }}
                                              caretHidden={true}
                                          />
                                          <DatePicker
                                              modal
                                              open={open}
                                              date={date}
                                              onConfirm={newDate => {
                                                  setOpen(false);
                                                  setDate(newDate);
                                                  onChange(newDate);
                                              }}
                                              onCancel={() => {
                                                  setOpen(false);
                                              }}
                                          />
                                      </>
                                  );
                              }}
                              name={'delivery_time'}
                          />
                          <Controller
                              name="urgent"
                              control={control}
                              rules={{
                                  required: false,
                              }}
                              render={({field: {onChange, value}}) => (
                                  <CheckBox
                                      style={{flex: 1, marginBottom: 20}}
                                      onClick={() => {
                                          onChange(!value);
                                      }}
                                      checkBoxColor="#BF0000"
                                      rightTextStyle={{
                                          color: '#BF0000',
                                          fontFamily: 'Li Ador Noirrit Bold',
                                      }}
                                      isChecked={value}
                                      // leftText={'CheckBox'}
                                      rightText="যত দ্রুত সম্ভব রক্তের প্রয়োজন"
                                  />
                              )}
                          />
                          <Controller
                              control={control}
                              rules={{
                                  required: false,
                              }}
                              render={({
                                           field: {onChange, onBlur, value},
                                           fieldState: {error},
                                       }) => (
                                  <TextInput
                                      placeholder={'বিস্তারিত'}
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
                                          height: 150,
                                          fontFamily: 'Li Ador Noirrit',
                                      }}
                                  />
                              )}
                              name={'description'}
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
                  </View>
              </ScrollView>

          )}

        <Footer navigation={navigation} />
      </View>
    </React.Fragment>
  );
}
