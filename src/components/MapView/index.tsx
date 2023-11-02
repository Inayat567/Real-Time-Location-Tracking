import {StyleSheet, Text, View} from 'react-native';
import MapView, {
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
  Polyline,
} from 'react-native-maps';
import React, {Dispatch} from 'react';
import colors from '../../constants/colors';
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_APIKEY} from '../../constants/map';

type PropType = {
  data?: LatLng[];
  pressible?: boolean;
  setRouteData?: (val: LatLng) => void; // Dispatch<React.SetStateAction<LatLng>>;
};

const GoogleMapView = (props: PropType) => {
  console.log("Google Route Coordinates: ", props.data);
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        // latitude: props.data ? props?.data[0].latitude : 33.565109,
        // longitude: props.data ? props.data[0].longitude : 73.016914,
        latitude: 33.565109,
        longitude: 73.016914,
        latitudeDelta: 0.1, //Zoom level
        longitudeDelta: 0.1,
      }}
      provider={PROVIDER_GOOGLE}
      zoomTapEnabled={false}
      onPress={val => {
        console.log(val.nativeEvent.coordinate);
        props.pressible &&
          props.setRouteData &&
          props.setRouteData(val.nativeEvent.coordinate);
      }}>
      {props.data &&
        props.data.map((item, index) => {
          return (
            <Marker
              key={index}
              pinColor={colors.BUTTON}
              title={item?.latitude + ' / ' + item?.longitude}
              coordinate={{
                latitude: item?.latitude,
                longitude: item?.longitude,
              }}
            />
          );
        })}
      {/* {props.data.length >= 2 ? (
        <MapViewDirections
          origin={props.data[0]}
          waypoints={
            props.data.length > 2 ? props.data.slice(1, -1) : undefined
          }
          destination={props.data[props.data.length - 1]}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor={colors.BLUE}
          onStart={params => {
            console.log(
              `Started routing between "${params.origin}" and "${params.destination}"`,
            );
          }}
          onReady={result => {
            console.log(`Distance: ${result.distance} km`);
            console.log(`Duration: ${result.duration} min.`);
          }}
          onError={errorMessage => {
            console.log('GOT AN ERROR', errorMessage);
          }}
        />
      ) : (
        <MapViewDirections
          origin={props.data[0]}
          destination={props.data[1]}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor={colors.BLUE}
        />
      )} */}
      {props.data && (
        <Polyline
          coordinates={props.data}
          strokeWidth={3}
          strokeColor={colors.BUTTON}
        />
      )}
    </MapView>
  );
};

export default GoogleMapView;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: colors.BG,
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
});
