import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import colors from '../../constants/colors';
import CustomModal from '../../components/Modal';
import ListView from '../../components/ListView';
import { DescriptionDataType } from '../../Types/root';
import { data } from '../../constants/constants';

const PastTasks = () => {
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

export default PastTasks;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.BG,
  },
});
