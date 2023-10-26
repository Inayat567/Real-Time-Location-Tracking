import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {data} from '../../constants/constants';

const TaskStatus = () => {
  const TaskStatusListView = (props: (typeof data)[0]) => {
    return (
      <View style={styles.listView} key={props.id}>
        <Text style={styles.name}>{props.name}</Text>
        <Icon
          size={25}
          name={
            props.id % 2 === 0
              ? 'close-circle-sharp'
              : 'checkmark-done-circle-sharp'
          }
          color={
            props.id % 2 === 0
              ? colors.RED
              : colors.BUTTON
          }
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1, marginTop: 20}}>
        {data.map(item => TaskStatusListView(item))}
      </View>
    </View>
  );
};

export default TaskStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
  },
  title: {
    fontSize: 35,
    textAlign: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
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
});
