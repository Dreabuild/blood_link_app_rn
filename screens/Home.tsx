/* eslint-disable prettier/prettier */
import {NavigationProp} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LoaderKit from 'react-native-loader-kit';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BloodSeekCard from '../components/BloodSeekCard';
import Footer from '../components/Footer';
import {API_URL} from '../config';
import zillas from '../data/district.json';
import {IBloodSeeker} from '../types/BloodSeeker';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function Home({navigation}: {navigation: NavigationProp<any>}) {
  const [selectedBloodGroup, setSelectedBloodGroup] = React.useState('');
  const [selectedZila, setSelectedZila] = React.useState({
    bn_name: '',
    name: '',
  });
  const [bloodData, setBloodData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);
    const onSelectedBloodGroup = async () => {
      const url = `${API_URL}/request/${
        selectedBloodGroup ? `?bloodGroup=${selectedBloodGroup}` : ''
      }${
        selectedZila.name
          ? selectedBloodGroup
            ? `&district=${selectedZila.name}`
            : `?district=${selectedZila.name}`
          : ''
      }`;
      const res = await fetch(url);
      const {data} = await res.json();
      setBloodData(data);
      setLoading(false);
    };
    onSelectedBloodGroup();
  }, [selectedBloodGroup, selectedZila]);

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
              defaultValue={''}
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
                // console.log('selectedItem', selectedItem);
                setSelectedBloodGroup(selectedItem);
              }}
            />
            {/* SELECT ZILA */}
            <SelectDropdown
              data={[{bn_name: 'সকল জেলা', name: ''}, ...zillas.data]}
              renderItem={item => {
                return (
                  <View>
                    <Text style={{color: '#1e1e1e', padding: 10}}>
                      {item.bn_name}
                    </Text>
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
                      {selectedZila.bn_name ? selectedZila.bn_name : 'সকল জেলা'}
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
          </View>

          {/* REQUEST COUNT */}
          {loading ? (
            <LoaderKit
              style={{width: 50, height: 50, margin: 'auto'}}
              name={'BallPulseSync'} // Optional: see list of animations below
              color={'#BF0000'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
            />
          ) : (
            <>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingBottom: 40,
                }}>
                <Text style={{color: '#000', fontWeight: '600'}}>
                  <Text style={{color: '#AE0000'}}>
                    {bloodData?.length ? bloodData?.length : 0}
                  </Text>{' '}
                  টি আবেদন পাওয়া গেছে "
                  {selectedZila.bn_name ? selectedZila.bn_name : 'সকল'}" জেলায়
                </Text>
              </View>

              {/* REQUEST LIST */}
              <View style={{paddingHorizontal: 20}}>
                {/* REQUEST CARD */}
                {bloodData?.length > 0 &&
                  bloodData.map((seeker: IBloodSeeker) => {
                    return (
                      <BloodSeekCard
                        key={seeker.id}
                        seeker={seeker}
                        navigation={navigation}
                      />
                    );
                  })}
              </View>
            </>
          )}
        </ScrollView>
        <Footer navigation={navigation} />
      </View>
    </React.Fragment>
  );
}
