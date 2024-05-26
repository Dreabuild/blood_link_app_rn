/* eslint-disable prettier/prettier */
import {NavigationProp} from '@react-navigation/native';
import moment from 'moment';
import React, {useState} from 'react';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {ScrollView, Text, TextInput, View} from 'react-native';
import CheckBox from 'react-native-check-box';
import DatePicker from 'react-native-date-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Footer from '../components/Footer';
import {API_URL} from '../config';
import zillas from '../data/district.json';
import {bloodSeekerSchema} from '../types/BloodSeeker';

export default function BloodRequestForum({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onChange',
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
        Toast.show({
          type: 'error',
          text1: 'Blood Request Failed',
          text2: 'Please fill up the fields in correct format',
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
        text1: 'Blood Request Successful',
        text2: 'New Blood Request Created Successfully!',
      });
      navigation.navigate('Home');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Blood Request Failed',
        text2: 'Something went wrong. Try again',
      });
    }
  };

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'mobile_numbers',
  });

  const firstMoNo = fields[0];

  const newZillas = zillas.data.map(zilla => {
    return {label: zilla.bn_name, value: zilla.name};
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
            <Text
              style={{
                color: '#000',
                fontSize: 20,
                marginTop: 20,
                textAlign: 'center',
              }}>
              উপযুক্ত তথ্য দিয়ে ফরমটি পূরণ করুন
            </Text>
            <View style={{marginTop: 20}}>
              <Text
                style={{
                  color: '#BF0000',
                  fontSize: 16,
                  marginTop: 20,
                  marginBottom: 20,
                  fontWeight: 800,
                }}>
                প্রাথমিক তথ্য
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, value}}) => (
                  <View
                    style={{
                      marginBottom: 20,
                      borderWidth: 1,
                      borderColor: '#000',
                    }}>
                    <RNPickerSelect
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
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder={'হিমোগ্লোবিন পয়েন্ট'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor={'#989898'}
                    style={{
                      color: '#000',
                      borderColor: '#000',
                      borderWidth: 1,
                      padding: 10,
                      marginBottom: 20,
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
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder={'রক্তের পরিমান'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor={'#989898'}
                    style={{
                      color: '#000',
                      borderColor: '#000',
                      borderWidth: 1,
                      padding: 10,
                      marginBottom: 20,
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
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder={'রোগীর সমস্যা'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor={'#989898'}
                    style={{
                      color: '#000',
                      borderColor: '#000',
                      borderWidth: 1,
                      padding: 10,
                      marginBottom: 20,
                    }}
                  />
                )}
                name={'patient_problem'}
              />
            </View>
            <View style={{marginTop: 20}}>
              <Text
                style={{
                  color: '#BF0000',
                  fontSize: 16,
                  marginTop: 20,
                  marginBottom: 20,
                  fontWeight: 800,
                }}>
                অন্যান্য তথ্য
              </Text>
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                render={({field: {onChange, value}}) => (
                  <View
                    style={{
                      marginBottom: 20,
                      borderWidth: 1,
                      borderColor: '#000',
                    }}>
                    <RNPickerSelect
                      onValueChange={onChange}
                      value={value}
                      items={newZillas}
                      placeholder={{
                        label: 'জেলা নির্বাচন',
                        value: null,
                        color: '#989898',
                      }}
                      style={{
                        inputAndroid: {
                          color: '#000',
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
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder={'হাসপাতালের নাম'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor={'#989898'}
                    style={{
                      color: '#000',
                      borderColor: '#000',
                      borderWidth: 1,
                      padding: 10,
                      marginBottom: 20,
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
                  render={({field: {onChange, onBlur, value}}) => {
                    return (
                      <View
                        style={{
                          borderWidth: 1,
                          borderColor: '#000',
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
                            borderColor: '#000',
                            borderWidth: 0,
                            width: index === fields.length - 1 ? '50%' : '100%',
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
                            <Text style={{color: '#fff'}}>আরো যোগ করুন</Text>
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
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder={'হোয়াটএপস নাম্বার'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor={'#989898'}
                    style={{
                      color: '#000',
                      borderColor: '#000',
                      borderWidth: 1,
                      padding: 10,
                      marginBottom: 20,
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
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder={'ফেসবুক একাউন্টের লিংক'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor={'#989898'}
                    style={{
                      color: '#000',
                      borderColor: '#000',
                      borderWidth: 1,
                      padding: 10,
                      marginBottom: 20,
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
                render={({field: {onChange, value}}) => (
                  <View
                    style={{
                      marginBottom: 20,
                      borderWidth: 1,
                      borderColor: '#000',
                    }}>
                    <RNPickerSelect
                      style={{
                        inputAndroid: {
                          color: '#000000',
                        },
                      }}
                      placeholder={{
                        label: 'রোগীর জেন্ডার',
                        value: null,
                        color: '#989898',
                      }}
                      onValueChange={onChange}
                      value={value}
                      items={[
                        {label: 'পুরুষ', value: 'male'},
                        {label: 'মহিলা', value: 'female'},
                        {label: 'অন্যান্য', value: 'other'},
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
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder={'আপনি রোগীর কি হোন?'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor={'#989898'}
                    style={{
                      color: '#000',
                      borderColor: '#000',
                      borderWidth: 1,
                      padding: 10,
                      marginBottom: 20,
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
                render={({field: {onChange, value}}) => {
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
                          borderColor: '#000',
                          borderWidth: 1,
                          padding: 10,
                          marginBottom: 20,
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
                    rightTextStyle={{color: '#BF0000', fontWeight: 'bold'}}
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
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder={'বিস্তারিত'}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor={'#989898'}
                    style={{
                      color: '#000',
                      borderColor: '#000',
                      borderWidth: 1,
                      padding: 10,
                      marginBottom: 20,
                      height: 150,
                    }}
                  />
                )}
                name={'description'}
              />
            </View>
            <TouchableOpacity
              onPress={
                // eslint-disable-next-line no-extra-boolean-cast
                !!errors
                  ? handleSubmit(onSubmit)
                  : () => {
                      Toast.show({
                        type: 'error',
                        text1: 'Blood Request Failed!',
                        text2: 'Please fill up all the requried fields',
                      });
                    }
              }
              style={{
                backgroundColor: '#BF0000',
                padding: 10,
                marginRight: 10,
              }}>
              <Text
                style={{color: '#fff', fontWeight: 800, textAlign: 'center'}}>
                সাবমিট
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    </React.Fragment>
  );
}
