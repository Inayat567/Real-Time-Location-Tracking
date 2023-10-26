import {StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import colors from '../../constants/colors';
import CustomModal from '../../components/Modal';
import ListView from '../../components/ListView';
import { data } from '../../constants/constants';
import { DescriptionDataType } from '../../Types/root';

const Complaints = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [descriptionData, setDescriptionData] = useState<DescriptionDataType>();

  const toggleModalVisible = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDescriptionData = (data: DescriptionDataType) => {
    setDescriptionData(data);
    toggleModalVisible();
  };

  return (
    <View style={styles.container}>
      <CustomModal
        isModalVisible={isModalVisible}
        setModalVisible={toggleModalVisible}
        data={descriptionData}
      />
      {data.map(item => (
        <ListView
          key={item.id}
          name={item.name}
          date={item.date}
          toggleModalVisible={handleDescriptionData}
          data={item.data}
        />
      ))}
    </View>
  );
};

export default Complaints;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BG,
  },
});
