import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';

interface PropObj {
  name: string;
  number: string;
  color?: string;
  route?: string;
}

interface PropType {
  data: PropObj[];
}

const FlexBox = (props: PropType) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {props.data.map(item => (
        <TouchableOpacity
          style={[
            styles.box,
            {backgroundColor: item.color ? item.color : colors.GRAY},
          ]}
          onPress={() => {
            navigation.navigate(item.route);
          }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.number}>{item.number}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FlexBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
    flexDirection: 'row',
  },
  box: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
    borderRadius: 10,
  },
  name: {
    fontSize: 25,
    color: colors.WHITE,
  },
  number: {
    marginTop: 10,
    fontSize: 18,
    color: colors.WHITE,
  },
});
