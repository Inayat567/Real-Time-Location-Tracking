import {StyleSheet, Text, View} from 'react-native';
import React, {Dispatch} from 'react';
import {TouchableOpacity} from 'react-native';
import { DescriptionDataType } from '../../Types/root';

type PropType = {
  name: string;
  toggleModalVisible:  (data: DescriptionDataType) => void;
  date?: string;
  data: DescriptionDataType;
};

const ListView = ({name, date, toggleModalVisible, data}: PropType) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          toggleModalVisible(data);
        }}>
        <Text style={styles.name}>{name}</Text>
        {date && <Text style={styles.date}>{date}</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default ListView;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
  },
  button: {
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  name: {
    width: '15%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    flex: 1,
    textAlign: 'right',
  },
});
