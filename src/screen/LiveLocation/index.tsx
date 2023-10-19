import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import GoogleMapView from '../../components/MapView';

const LiveLocation = () => {
  return (
    <View style={styles.container}>
      <GoogleMapView />
      {/* <View style={{flex: 0.1}}> */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Mark as Complete</Text>
        </TouchableOpacity>
      {/* </View> */}
    </View>
  );
};

export default LiveLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
    position: 'relative',
  },
  heading: {
    fontSize: 25,
    color: colors.TEXT,
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
