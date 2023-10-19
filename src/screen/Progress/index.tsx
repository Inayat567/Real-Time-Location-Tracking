import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';

const Progress = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Progress</Text>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 25,
    color: colors.TEXT,
  },
});
