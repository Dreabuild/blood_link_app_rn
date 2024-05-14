/* eslint-disable prettier/prettier */
import {NavigationProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {ScrollView, Text, TextInput, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Footer from '../components/Footer';
import {IBloodSeeker} from '../types/BloodSeeker';

const blood_groups = ['A+', 'B+', 'AB+', 'AB-', 'O-', 'O+', 'A-', 'B-'];

export default function BloodRequestForum({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const {
    control,
    handleSubmit,
    // formState: {errors},
  } = useForm({
    defaultValues: {
      blood_group: '',
      hemoglobin_point: '',
      amount_of_blood: '',
      patient_problem: '',
      district: '',
      hospital_name: '',
      mobile_number: '',
      whatsapp_number: '',
      facebook_account_url: '',
      gender: '',
      relationship: '',
      urgent: true,
      description: '',
      delivery_time: '',
    },
  });
  const [bloodGroup, setBloodGroup] = useState('');
  const onSubmit: SubmitHandler<IBloodSeeker> = (data: IBloodSeeker) =>
    console.log(data);

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
                  required: false,
                }}
                render={() => (
                  <SelectDropdown
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
                    onSelect={selectedItem => {
                      setBloodGroup(selectedItem);
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
                  required: false,
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
                  required: false,
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
                name={'hemoglobin_point'}
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
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder={'মোবাইল নাম্বার'}
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
                name={'mobile_number'}
              />
              <Controller
                control={control}
                rules={{
                  required: false,
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
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    placeholder={'রোগীর জেন্ডার'}
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
