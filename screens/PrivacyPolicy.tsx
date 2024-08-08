import {TouchableOpacity, View} from 'react-native';
import {WebView} from 'react-native-webview';
import MyText from '../components/MyText';
import {DrawerProps} from '@react-navigation/drawer/lib/typescript/src/types';

export default function PrivacyPolicy({navigation}: {navigation: DrawerProps}) {
  return (
    <View
      style={{
        flex: 1,
        borderWidth: 4,
        borderColor: '#AE0000',
        flex: 1,
        backgroundColor: '#ffffff',
      }}>
      <WebView
        source={{uri: 'https://bloodlinkfoundation.com/privacy-policy'}}
      />
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
  );
}
