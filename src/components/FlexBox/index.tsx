import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {FlatGrid} from 'react-native-super-grid';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Types/root';

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
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View style={styles.container}>
      <FlatGrid
        itemDimension={130}
        data={props.data}
        style={styles.gridView}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
        spacing={10}
        renderItem={({item}) => (
          <TouchableOpacity
            style={[styles.itemContainer, {backgroundColor: item.color}]}
            onPress={() => navigation.navigate(item.route)}>
            <Text style={styles.itemName}>{item.name.toUpperCase()}</Text>
          </TouchableOpacity>
        )}
      />
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
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
    height: 150,
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center',
    color: colors.WHITE,
    fontWeight: 'bold',
  },
});
