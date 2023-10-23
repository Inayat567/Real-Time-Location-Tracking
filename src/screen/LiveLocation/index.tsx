import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import React, {useState} from 'react';
import colors from '../../constants/colors';
import GoogleMapView from '../../components/MapView';
import {MapRouteData} from '../../constants/map';
import {NavigationProps} from '../../Types/root';

const LiveLocation = ({navigation}: NavigationProps) => {

  const [routedate, setRouteData] = useState(MapRouteData)
  let orderCompleted = 1;
  const handleComplete = () => {
    Alert.alert(
      'Confirmation',
      'Have you Complete ' + orderCompleted + ' Order',

      [
        {
          text: 'Yes',
          onPress: () => {
            console.log('OK Pressed', routedate);
            setRouteData(routedate.slice(1));
            console.log(routedate)
            if (orderCompleted === routedate.length) {
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
  return (
    <View style={styles.container}>
      <GoogleMapView data={routedate} />
      {/* <View style={{flex: 0.1}}> */}
      <TouchableOpacity style={styles.button} onPress={() => handleComplete()}>
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
