import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import colors from '../../constants/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {data} from '../../constants/constants';

const Employees = () => {
  const handleRemove = () => {
    // remove code logic
  };

  const handleUpdate = () => {
    // update detail code logic
  };

  const handleAdd = () => {
    // Add New employee code logic
  };

  const EmployeeListView = (props: (typeof data)[0]) => {
    const [showButton, setShowButton] = useState(false);

    return (
      <View style={{}} key={props.id}>
        <View style={styles.listView} key={props.id}>
          <Text style={styles.name}>{props.name}</Text>
          <TouchableOpacity onPress={() => setShowButton(!showButton)}>
            <Icon
              size={25}
              name={showButton ? 'chevron-circle-up' : 'chevron-circle-down'}
              color={colors.BLACK}
            />
          </TouchableOpacity>
        </View>
        <View
          style={[styles.buttonView, {display: showButton ? 'flex' : 'none'}]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleRemove()}>
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: colors.BUTTON}]}
            onPress={() => {
              handleUpdate;
            }}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 2}}>
        <Text style={styles.title}>Employee</Text>
        <TouchableOpacity onPress={() => handleAdd()}>
          <Icon size={25} name="plus-circle" color={colors.BLACK} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, marginTop: 20}}>
        {data.map(item => EmployeeListView(item))}
      </View>
    </View>
  );
};

export default Employees;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
  },
  title: {
    flex: 0.9,
    fontSize: 25,
    textAlign: 'center',
  },
  listView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'lightgray',
  },
  button: {
    width: '25%',
    backgroundColor: colors.RED,
    margin: 15,
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.WHITE,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
  },
});
