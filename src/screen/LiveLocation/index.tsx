import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import colors from '../../constants/colors';
import GoogleMapView from '../../components/MapView';
import {NavigationProps} from '../../Types/root';
import {getDateFormat} from '../../Utils/function';
import AuthContext, {
  AuthContextType,
  ContextRouteProp,
} from '../../components/Context/context';
import {firebase} from '@react-native-firebase/firestore';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import Geolocation from '@react-native-community/geolocation';
import {LatLng} from 'react-native-maps';

const LiveLocation = ({navigation}: NavigationProps) => {
  const {routes, setRoutes} = useContext<AuthContextType>(AuthContext);
  const [callbackInProgress, setCallbackInProgress] = useState(false);
  const [routeCoordinate, setRouteCoordinate] = useState<LatLng[]>([]);
  let orderCompleted = 1;
  let serviceStarted = false;

  const TodayTaskComplete = (routes: ContextRouteProp) => {
    console.log(routes);
    if (routes) {
      let todayDate = getDateFormat(new Date());
      firebase
        .firestore()
        .collection('PastRoutes')
        .doc(todayDate)
        .collection(routes.carName)
        .doc(todayDate)
        .set({
          carName: routes.carName,
          departureTime: routes.departureTime,
          arrivalTime: routes.arrivalTime,
          routeCoordinates: routes.routeCoordinates,
        })
        .then(res => console.log('Done with past: ', res))
        .catch(e => console.log(e));
      console.log(routes);

      firebase
        .firestore()
        .collection('Routes')
        .doc(todayDate)
        .collection(routes.carName)
        .doc(todayDate)
        .delete()
        .then(() => {
          console.log('Document deleted successfully');
        })
        .catch(error => {
          console.error('Error while deleting doc: ', error);
        });
    }
    setRoutes(null);
  };

  const handleComplete = () => {
    Alert.alert(
      'Confirmation',
      'Have you Complete ' + orderCompleted + ' Order',
      [
        {
          text: 'Yes',
          onPress: () => {
            routes?.routeCoordinates &&
              setRoutes({
                ...routes,
                routeCoordinates: routes?.routeCoordinates.slice(1),
              });
            if (orderCompleted === routes?.routeCoordinates.length) {
              TodayTaskComplete(routes);
              Alert.alert('Completed!', 'Congrats!, Today Tasks Completed', [
                {text: 'Ok', onPress: () => navigation.navigate('Home')},
              ]);
            }
          },
        },
        {text: 'No', onPress: () => console.log('Cancel Pressed')},
      ],
    );
  };

  const updateRouts = async (routeCoordinate: LatLng[]) => {
    try {
      const todayDate = getDateFormat(new Date());
      const carName = routes?.carName || 'Car1';

      const docRef = firebase
        .firestore()
        .collection('liveCoordinates')
        .doc(todayDate);
      const collectionRef = docRef.collection(carName);

      const snapshot = await docRef.get();

      if (snapshot.exists) {
        await collectionRef.doc(todayDate).update({routes: routeCoordinate});
        console.log('Routes updated');
      } else {
        await collectionRef.doc(todayDate).set({routes: routeCoordinate});
        console.log('Route saved');
      }
    } catch (error) {
      console.log('Error: ', error);
    }
    setCallbackInProgress(false);
  };

  const getUpdatedLocation = () => {
    console.log('getUpdatedLocation called');
    if (callbackInProgress) {
      console.log('Callback already in progress, skipping this iteration');
      return;
    }
    console.log('Running this step iteration');
    try {
      setCallbackInProgress(true);
      ReactNativeForegroundService.add_task(
        () => {
          Geolocation.getCurrentPosition(
            info => {
              const {latitude, longitude} = info.coords;
              const newCoordinate = {latitude, longitude};
              routeCoordinate.push(newCoordinate);
              console.log('Route Coordinate: ', routeCoordinate);
              setRouteCoordinate(routeCoordinate);
              updateRouts(routeCoordinate);
            },
            error => {
              console.log('Error in getCurrentPosition: ', error);
              setCallbackInProgress(false);
            },
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
          );
        },
        {
          delay: 5000, //0.1 * 60 * 1000,  // 0.5 minute  // write your duration here
          onLoop: true,
          taskId: 'taskid',
          // onSuccess: () => console.log("Success..."),
          onError: e => console.log(`Error logging:`, e),
        },
      );

      if (!serviceStarted) {
        ReactNativeForegroundService.start({
          id: 1244,
          title: 'Tracker',
          message: 'Tracking your background location',
          icon: 'ic_launcher',
        });
        serviceStarted = true;
      }
    } catch (e) {
      console.log('Error in getUpdatedLocation:', e);
    }
  };

  useEffect(() => {
    if (
      routes?.routeCoordinates === undefined ||
      routes?.routeCoordinates.length === 0
    ) {
      Alert.alert('No Task', 'You have no task assigned today!');
      navigation.goBack();
    }
  }, []);

  useEffect(() => {
    getUpdatedLocation();

    return () => {
      ReactNativeForegroundService.stopAll();
    };
  }, []);

  return (
    <View style={styles.container}>
      <GoogleMapView data={routes?.routeCoordinates} />
      <TouchableOpacity style={styles.button} onPress={() => handleComplete()}>
        <Text style={styles.buttonText}>Mark as Complete</Text>
      </TouchableOpacity>
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
