import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';

const TrackEmployee = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TrackEmployee</Text>
    </View>
  );
};

export default TrackEmployee;

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
