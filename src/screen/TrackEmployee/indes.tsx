import {StyleSheet, Alert, View, ActivityIndicator} from 'react-native';
import React, {useEffect, useContext} from 'react';
import colors from '../../constants/colors';
import GoogleMapView from '../../components/MapView';
import AuthContext from '../../components/Context/context';
import {NavigationProps} from '../../Types/root';
import {getDateFormat} from '../../Utils/function';
import {firebase} from '@react-native-firebase/firestore';

const TrackEmployee = ({navigation}: NavigationProps) => {
  const {routes, liveRoutes, setLiveRoutes} = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (liveRoutes.length === 0) {
        Alert.alert('No Task!', 'No one started deliviring order.');
        navigation.goBack();
      }
    }, 5000);

    const interval = setInterval(() => {
      updateRouts();
    }, 0.5 * 60 * 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const updateRouts = async () => {
    try {
      const todayDate = getDateFormat(new Date());
      const carName = routes?.carName || 'Car1';

      const docRef = firebase
        .firestore()
        .collection('liveCoordinates')
        .doc(todayDate)
        .collection(carName)
        .doc(todayDate);

      const res = await docRef.get();
      if (!res.exists) {
        throw new Error(`No document`);
      } else {
        console.log('Routes from firebase: ', res?.data());
        let tempData = res?.data();
        console.log('Routes value: ', tempData?.routes);
        setLiveRoutes([...tempData?.routes]);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  return (
    <View style={styles.container}>
      {liveRoutes.length > 0 ? (
        <GoogleMapView data={liveRoutes} />
      ) : (
        <>
          <ActivityIndicator size={50} />
        </>
      )}
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
