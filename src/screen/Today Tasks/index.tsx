import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import GoogleMapView from '../../components/MapView';
import { MapRouteData } from '../../constants/map';

const TodayTask = () => {
  return (
    <View style={styles.container}>
      <GoogleMapView data={MapRouteData}/>
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
  button: {
    position:'absolute',
    bottom: 20,
    width: '60%',
    height: '5%',
    backgroundColor: colors.BLUE,
    borderRadius: 10,
    margin: 10,
    alignSelf: 'center',
    zIndex: 1,
  },
  buttonText: {
    fontSize: 20,
    color: colors.WHITE,
    textAlign: 'center',
    paddingTop: 5,
  },
});
