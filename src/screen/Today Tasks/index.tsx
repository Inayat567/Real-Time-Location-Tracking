import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';

const TodayTask = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TodayTask</Text>
    </View>
  );
};

export default TodayTask;

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
