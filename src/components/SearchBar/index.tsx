import {StyleSheet, Text, View} from 'react-native';
import React, {Dispatch} from 'react';
import {TextInput} from 'react-native-paper';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_APIKEY} from '../../constants/map';
import colors from '../../constants/colors';

interface SearchBarProp {
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
}
const SearchBar = ({value, setValue}: SearchBarProp) => {
  // return (
  //   <TextInput
  //     label="Search"
  //     value={value}
  //     placeholder="Type something"
  //     style={styles.input}
  //     onChange={val => setValue(val.target.toString())}
  //   />
  // );

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search Location"
        fetchDetails={true}
        onPress={(data, details) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        autoFillOnNotFound={true}
        enableHighAccuracyLocation={true}
        onFail={() => console.log("Failed")}
        onNotFound={() => console.log("Not Found")}
        onTimeout={() => console.log("Time Out")}
        // currentLocation={true}
        query={{
          key: GOOGLE_MAPS_APIKEY,
          language: 'en',
          components: 'country:pk',
        }}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: '95%',
    borderRadius: 10,
    marginTop: 5,
    height: 50,
  },
});
