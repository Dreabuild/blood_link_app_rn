import {NavigationProp} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import {IBloodSeeker} from '../types/BloodSeeker';
import {toBn} from '../util/toBn';

const BloodSeekCard = ({
  seeker,
  navigation,
}: {
  seeker: IBloodSeeker;
  navigation: NavigationProp<any>;
}) => {
  const newBloodAmount: string = toBn(seeker.amount_of_blood.toString());
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('BloodSeekerDetails', seeker)}
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
          <Text style={{fontWeight: 600, color: '#FFF'}}>
            {seeker.blood_group}
          </Text>
        </View>
        <Text style={{color: '#989898', fontSize: 13}}>#{seeker.id}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 35,
        }}>
        <View>
          <Text style={{color: '#000'}}>{seeker.hospital_name}</Text>
          <Text style={{color: '#000'}}>{seeker.district}</Text>
        </View>
        <Text style={{color: '#AE0000'}}>{newBloodAmount} ব্যাগ</Text>
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
  );
};

export default BloodSeekCard;
