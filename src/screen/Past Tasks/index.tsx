import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';

const PastTasks = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>PastTasks</Text>
    </View>
  );
};

export default PastTasks;

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
