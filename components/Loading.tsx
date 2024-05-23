/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import LoadingDots from 'react-native-loading-dots';

export default function LoadingScreen() {
  return (
    <View style={styles.loadingScreen}>
      <View style={styles.dotsWrapper}>
        <LoadingDots colors={['#AE0000', '#AE0000', '#AE0000', '#AE0000']} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotsWrapper: {
    width: 100,
  },
});
