import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';

const Complaints = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Complaints</Text>
    </View>
  );
};

export default Complaints;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 20,
    color: colors.TEXT,
  },
});
