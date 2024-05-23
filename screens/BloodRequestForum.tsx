/* eslint-disable prettier/prettier */
import {NavigationProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {Controller, useFieldArray, useForm} from 'react-hook-form';
import {ScrollView, Text, TextInput, View} from 'react-native';
import CheckBox from 'react-native-check-box';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Footer from '../components/Footer';
import {API_URL} from '../config';
import zillas from '../data/district.json';

const blood_groups = ['A+', 'B+', 'AB+', 'AB-', 'O-', 'O+', 'A-', 'B-'];
const defaultValues = {
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
};

export default function BloodRequestForum({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm({
    defaultValues,
  });

  const [selectedZila, setSelectedZila] = useState({
    bn_name: '',
    name: '',
  });

  const onSubmit = async (data: any) => {
    const res = await fetch(`${API_URL}/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...data, selectedZila}),
    });
    const newReq = await res.json();
    console.log(newReq);
  };

  const {fields, append} = useFieldArray({
    control,
    name: 'mobile_numbers',
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
                render={({field: {onChange}}) => (
                  <SelectDropdown
                    onSelect={onChange}
                    data={blood_groups}
                    renderItem={(item: any) => {
                      return (
                        <View>
                          <Text style={{color: '#989898', padding: 10}}>
                            {item}
                          </Text>
                        </View>
                      );
                    }}
                    renderButton={(selectedItem, isOpened) => {
                      return (
                        <View
                          style={{
                            width: '100%',
                            height: 45,
                            backgroundColor: '#ffffff',
                            alignItems: 'center',
                            borderWidth: 0.7,
                            borderColor: 'black',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                            marginBottom: 20,
                          }}>
                          <Text style={{color: '#989898'}}>
                            {selectedItem ? selectedItem : 'রক্তের গ্রুপ'}
                          </Text>
                          <Icon
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            style={{fontSize: 28}}
                          />
                        </View>
                      );
                    }}
                  />
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
                render={() => (
                  <SelectDropdown
                    data={zillas.data}
                    renderItem={item => {
                      return (
                        <View>
                          <Text style={{color: '#989898', padding: 10}}>
                            {item.bn_name}
                          </Text>
                        </View>
                      );
                    }}
                    renderButton={(selectedItem, isOpened) => {
                      return (
                        <View
                          style={{
                            width: '100%',
                            height: 45,
                            backgroundColor: '#ffffff',
                            alignItems: 'center',
                            borderWidth: 0.7,
                            borderColor: 'black',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                            marginBottom: 20,
                          }}>
                          <Text style={{color: '#989898'}}>
                            {selectedZila.bn_name
                              ? selectedZila.bn_name
                              : 'সকল জেলা'}
                          </Text>
                          <Icon
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            style={{fontSize: 28}}
                          />
                        </View>
                      );
                    }}
                    onSelect={selectedItem => {
                      setSelectedZila({
                        bn_name: selectedItem.bn_name,
                        name: selectedItem.name,
                      });
                    }}
                  />
                )}
                name={'blood_group'}
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
                  key={index}
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
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
                        value={value[0].number}
                        // value={value}
                        placeholderTextColor={'#989898'}
                        style={{
                          color: '#000',
                          borderColor: '#000',
                          borderWidth: 0,
                          width: index === fields.length - 1 ? '50%' : '100%',
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
                          <Icon name="plus" style={{color: '#fff'}} size={20} />
                          <Text style={{color: '#fff'}}>আরো যোগ করুন</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                  name={'mobile_numbers'}
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
                render={({field: {onChange}}) => (
                  <SelectDropdown
                    onSelect={onChange}
                    data={['Male', 'Female', 'Other']}
                    renderItem={(item: any) => {
                      return (
                        <View>
                          <Text style={{color: '#989898', padding: 10}}>
                            {item}
                          </Text>
                        </View>
                      );
                    }}
                    renderButton={(selectedItem, isOpened) => {
                      return (
                        <View
                          style={{
                            width: '100%',
                            height: 45,
                            backgroundColor: '#ffffff',
                            alignItems: 'center',
                            borderWidth: 0.7,
                            borderColor: 'black',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                            marginBottom: 20,
                          }}>
                          <Text style={{color: '#989898'}}>
                            {selectedItem ? selectedItem : 'রোগীর জেন্ডার'}
                          </Text>
                          <Icon
                            name={isOpened ? 'chevron-up' : 'chevron-down'}
                            style={{fontSize: 28}}
                          />
                        </View>
                      );
                    }}
                  />
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
                  required: false,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder={'রক্ত প্রয়োজনের সময় সিলেক্ট করুন'}
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
                name={'delivery_time'}
              />
              <Controller
                name="urgent"
                control={control}
                rules={{
                  required: false,
                }}
                render={({field: {onChange, onBlur, value}}) => (
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
              onPress={handleSubmit(onSubmit)}
              style={{
                backgroundColor: '#BF0000',
                // backgroundColor: '#BF0000',
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
