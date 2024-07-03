import {NavigationProp} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BloodSeekCard from '../components/BloodSeekCard';
import Footer from '../components/Footer';
import LoadingScreen from '../components/Loading';
import MyText from '../components/MyText';
import {API_URL} from '../config';
import zillas from '../data/district.json';
import {IBloodSeeker} from '../types/BloodSeeker';
import {toBn} from '../util/toBn';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function Home({navigation}: {navigation: NavigationProp<any>}) {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [selectedZila, setSelectedZila] = useState({
    bn_name: '',
    name: '',
  });
  const [bloodData, setBloodData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const onSelectedBloodGroup = async () => {
      try {
        setLoading(true);
        // navigation.addListener('focus', async () => {
        setLoading(true);
        const url = `${API_URL}/request?${
          selectedBloodGroup ? `&bloodGroup=${selectedBloodGroup}` : ''
        }${
          ['সকল জেলা', ''].includes(selectedZila.bn_name)
            ? ''
            : `&district=${selectedZila.bn_name}`
        }`;
        const res = await fetch(url);
        const {data} = await res.json();

        setBloodData(data);
        setLoading(false);
        // });
      } catch (err: any) {
      } finally {
        setLoading(false);
      }
    };
    onSelectedBloodGroup();
  }, [navigation, selectedBloodGroup, selectedZila.bn_name]);

  return (
    <React.Fragment>
      <View
        style={{
          borderWidth: 4,
          borderColor: '#AE0000',
          flex: 1,
          backgroundColor: '#ffffff',
        }}>
        {!loading ? (
          <>
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
                        <MyText style={{color: '#1e1e1e', padding: 10}}>
                          {item}
                        </MyText>
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
                        <MyText style={{color: '#1e1e1e'}}>
                          {selectedBloodGroup
                            ? selectedBloodGroup
                            : 'রক্তের গ্রুপ'}
                        </MyText>
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
                  data={[{bn_name: 'সকল জেলা', name: ''}, ...zillas.data]}
                  renderItem={item => {
                    return (
                      <View>
                        <MyText style={{color: '#1e1e1e', padding: 10}}>
                          {item.bn_name}
                        </MyText>
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
                        <MyText style={{color: '#1e1e1e'}}>
                          {selectedZila.bn_name
                            ? selectedZila.bn_name
                            : 'সকল জেলা'}
                        </MyText>
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
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingBottom: 40,
                }}>
                <MyText style={{color: '#000', fontWeight: '600'}}>
                  <MyText style={{color: '#AE0000'}}>
                    {bloodData?.length
                      ? toBn(bloodData?.length.toString())
                      : '০'}
                  </MyText>{' '}
                  টি আবেদন পাওয়া গেছে "
                  {selectedZila.bn_name ? selectedZila.bn_name : 'সকল'}" জেলায়
                </MyText>
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
            </ScrollView>
            <Footer navigation={navigation} />
          </>
        ) : (
          <LoadingScreen />
        )}
      </View>
    </React.Fragment>
  );
}
