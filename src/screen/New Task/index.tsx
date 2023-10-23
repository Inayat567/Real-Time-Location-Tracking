import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import colors from '../../constants/colors';
import GoogleMapView from '../../components/MapView';
import Picker from '../../components/Picker';
import SearchBar from '../../components/SearchBar';
import DateTimePickers from '../../components/DateTimePicker';
import {getTimeFormat} from '../../Utils/function';
import {LatLng} from 'react-native-maps';

const NewTask = () => {
  const [routedate, setRouteData] = useState<LatLng[]>([]);
  const [value, setValue] = useState('');
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [selectedValue, setSelectedValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [startTimePickerOpen, setStartTimePickerOpen] = useState(false);
  const [endTimePickerOpen, setEndTimePickerOpen] = useState(false);
  const items = [
    {label: 'Car', value: 'Car'},
    {label: 'Car1', value: 'Car1'},
    {label: 'Car2', value: 'Car2'},
  ];

  const handleStartTime = () => {
    setStartTimePickerOpen(!startTimePickerOpen);
  };

  const handleEndTime = () => {
    setEndTimePickerOpen(!endTimePickerOpen);
  };

  const handleStartTimeValue = (value: Date) => {
    setStartTimePickerOpen(!startTimePickerOpen);
    setStartTime(value);
  };

  const handleEndTimeValue = (value: Date) => {
    setEndTimePickerOpen(!endTimePickerOpen);
    setEndTime(value);
  };

  const UpdateRoute = (val: LatLng) => {
    console.log(val);
    setRouteData(()=>[...routedate, val]);
  };

  const handleAddTask = () => {};

  return (
    <View style={styles.container}>
      <GoogleMapView
        data={routedate}
        pressible={true}
        setRouteData={UpdateRoute}
      />
      <SearchBar value={value} setValue={setValue} />
      {startTimePickerOpen && (
        <DateTimePickers
          date={startTime}
          setDate={handleStartTimeValue}
          mode="time"
        />
      )}
      {endTimePickerOpen && (
        <DateTimePickers
          date={endTime}
          setDate={handleEndTimeValue}
          mode="time"
        />
      )}
      <View style={{flex: 1}}></View>
      <View
        style={{
          flex: 0.4,
          width: '100%',
          padding: 10,
          justifyContent: 'flex-start',
          backgroundColor: colors.WHITE,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.buttonView}>Select Departure Time:</Text>
          <View style={{width: '42%'}}>
            <Picker
              open={isOpen}
              value={selectedValue}
              setOpen={setIsOpen}
              setValue={setSelectedValue}
              items={items}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.buttonView}>Select Departure Time:</Text>
          <TouchableOpacity
            style={[styles.buttonView, {borderWidth: 1, width: '42%'}]}
            onPress={() => handleStartTime()}>
            <Text style={styles.buttonViewText}>
              {getTimeFormat(startTime)}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.buttonView}>Select Arrival Time: </Text>
          <TouchableOpacity
            style={[styles.buttonView, {borderWidth: 1, width: '42%'}]}
            onPress={() => handleEndTime()}>
            <Text style={styles.buttonViewText}>{getTimeFormat(endTime)}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.buttonView,
            {
              width: '50%',
              alignSelf: 'center',
              marginTop: 20,
              backgroundColor: colors.BLUE,
            },
          ]}
          onPress={() => handleAddTask()}>
          <Text
            style={[
              styles.buttonViewText,
              {
                fontSize: 16,
                height: 30,
                backgroundColor: colors.BLUE,
                color: colors.WHITE,
              },
            ]}>
            Add Task
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
    margin: 2,
  },
  buttonViewText: {
    height: 30,
    paddingHorizontal: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    margin: 2,
  },
});
