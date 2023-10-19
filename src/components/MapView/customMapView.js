import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import {firebase} from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../constants/colors';

const CustomMapView = () => {
  const [region, setRegion] = useState({
    latitude: 35.285959850000005,
    longitude: 75.66158396666667,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [routeCoordinate, setRouteCoordinate] = useState([]);
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState();
  const [flag, setFlag] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const colors = [
    'blue',
    'green',
    'red',
    'black',
    'yellow',
    'cyan',
    'orange',
    'gray',
  ];
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [callbackInProgress, setCallbackInProgress] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('id')
      .then(val => {
        console.log(val);
        setUserId(val);
      })
      .catch(err => console.log(err));
    AsyncStorage.getItem('role')
      .then(val => {
        console.log(val);
        setRole(val);
      })
      .catch(err => console.log(err));

    getUpdatedLocation();

    const timer = setTimeout(() => {
      getUpdatedLocation();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (role === 'fso' && !flag) {
      firebase
        .firestore()
        .collection('user')
        .doc(userId)
        .get()
        .then(snapshot => {
          if (!snapshot.exists) {
            firebase
              .firestore()
              .collection('user')
              .doc(userId)
              .set({
                latitude: latitude,
                longitude: longitude,
                routes: null,
              })
              .then(() => {
                console.log('Data saved');
                setFlag(true);
              })
              .catch(error => console.log('Error: ' + error));
          }
        })
        .catch(error => console.log('Error: ', error));

      firebase
        .firestore()
        .collection('user')
        .doc(userId)
        .get()
        .then(snapshot => {
          if (snapshot.exists) {
            console.log('Data: ', snapshot.data());
            routeCoordinates.length = 0;
            routeCoordinates.push(snapshot.data().routes);
            setRouteCoordinates(routeCoordinates);
          } else {
            console.log('No Data');
          }
        })
        .catch(error => console.log('Error: ' + error));
    } else if (role === 'manager') {
      getAllFsoLocation();
    }
  });

  const getAllFsoLocation = () => {
    firebase
      .firestore()
      .collection('user')
      .get()
      .then(snapshot => {
        if (snapshot.size > 0) {
          routeCoordinates.length = 0;
          snapshot.forEach(item => {
            console.log('Each snapshot item: ', item.data().routes);
            console.log('Route coordinates are : ', routeCoordinates);
            item.data().routes !== null &&
              item.data().routes.length !== 0 &&
              routeCoordinates.push(item.data().routes);
            setRouteCoordinates(routeCoordinates);
          });
        }
      })
      .catch(error => console.log('Error: ', error));
  };

  const updateRouts = routeCoordinate => {
    if (role === 'fso') {
      firebase
        .firestore()
        .collection('user')
        .doc(userId)
        .get()
        .then(snapshot => {
          if (snapshot.exists) {
            firebase
              .firestore()
              .collection('user')
              .doc(userId)
              .update({routes: routeCoordinate})
              .then(() => {
                console.log('Routes updated');
              })
              .catch(error => console.log('Error: not exist: ' + error));
          } else {
            firebase
              .firestore()
              .collection('user')
              .doc(userId)
              .set({routes: routeCoordinate})
              .then(() => {
                console.log('Route saved');
              })
              .catch(error => console.log('Error: ' + error));
          }
        });

      firebase
        .firestore()
        .collection('user')
        .doc(userId)
        .get()
        .then(snapshot => {
          routeCoordinates.length = 0;
          if (snapshot.exists) {
            console.log('fso snapshot item: ', snapshot.data().routes);
            console.log('Route Coordinates are : ', routeCoordinates);
            snapshot.data().routes !== null &&
              snapshot.data().routes.size !== 0 &&
              routeCoordinates.push(snapshot.data().routes);
            setRouteCoordinates(routeCoordinates);
          }
        })
        .catch(error => console.log('Error: ', error));
    } else {
      getAllFsoLocation();
    }
    setCallbackInProgress(false);
  };

  const getUpdatedLocation = () => {
    if (callbackInProgress) {
      // Callback already in progress, skip this iteration
      return;
    }

    setCallbackInProgress(true);
    ReactNativeForegroundService.add_task(
      () => {
        Geolocation.watchPosition(
          info => {
            setRegion({
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
              latitudeDelta: 0.1, //0.0005
              longitudeDelta: 0.1, //0.0005
            });
            setLatitude(info.coords.latitude);
            setLongitude(info.coords.longitude);
            const {latitude, longitude} = info.coords;
            const newCoordinate = {latitude, longitude};
            setRouteCoordinate(routeCoordinate.concat(newCoordinate));
            console.log('Route Coordinate: ', newCoordinate);

            updateRouts(routeCoordinate);
          },
          error => {
            console.log('Error: ', error);
            setCallbackInProgress(false);
          },
          {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
        );
      },
      {
        delay: 100,
        onLoop: true,
        taskId: 'taskid',
        onError: e => console.log(`Error logging:`, e),
      },
    );

    ReactNativeForegroundService.start({
      id: 1244,
      title: 'Tracker',
      message: 'Tracking your background location',
      icon: 'ic_launcher',
    });
  };

  const onRegionChange = region => {
    console.log('Region: ', region);
    // setRegion(region)
  };
  return (
    <View style={styles.container}>
      {routeCoordinates.length > 0 ? (
        <MapView
          key={1}
          style={{width: '97%', height: '90%'}}
          provider={PROVIDER_GOOGLE}
          region={region}
          onRegionChange={position => onRegionChange(position)}
          moveOnMarkerPress={true}>
          {routeCoordinates.map(
            (item, index) =>
              // console.log("Item: ", index, item, routeCoordinates)
              item && (
                <React.Fragment key={index}>
                  <Marker
                    pinColor={colors[index]}
                    title={item[0]?.latitude + ' / ' + item[0]?.longitude}
                    coordinate={{
                      latitude: item[0]?.latitude,
                      longitude: item[0]?.longitude,
                    }}
                  />
                  <Marker
                    pinColor={colors[index]}
                    title={
                      item[item.length - 1]?.latitude +
                      ' / ' +
                      item[item.length - 1]?.longitude
                    }
                    coordinate={{
                      latitude: item[item.length - 1]?.latitude,
                      longitude: item[item.length - 1]?.longitude,
                    }}
                  />
                  <Polyline
                    coordinates={item}
                    strokeWidth={3}
                    strokeColor={colors[index]}
                  />
                </React.Fragment>
              ),
          )}
        </MapView>
      ) : (
        <ActivityIndicator size={60} color="gray" />
      )}
    </View>
  );
};

export default CustomMapView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BG,
  },
  map: {
    height: '100%',
    width: '80%',
  },
});
