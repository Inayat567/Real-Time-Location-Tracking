import {StyleSheet, View, Alert} from 'react-native';
import React, {useEffect, useContext} from 'react';
import colors from '../../constants/colors';
import GoogleMapView from '../../components/MapView';
import {NavigationProps} from '../../Types/root';
import AuthContext from '../../components/Context/context';

const TodayTask = ({navigation}: NavigationProps) => {
  const {routes} = useContext(AuthContext);
  useEffect(() => {
    if (
      routes?.routeCoordinates === undefined ||
      routes?.routeCoordinates.length === 0
    ) {
      Alert.alert('No Task', 'You have no task assigned today!');
      navigation.goBack();
    }
  });

  return (
    <View style={styles.container}>
      <GoogleMapView data={routes?.routeCoordinates} />
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
    position: 'absolute',
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
