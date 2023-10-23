import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import GoogleMapView from '../../components/MapView';
import { MapRouteData } from '../../constants/map';

const TrackEmployee = () => {

  return (
    <View style={styles.container}>
      <GoogleMapView data={MapRouteData} />
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
