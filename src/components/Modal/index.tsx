import {StyleSheet, Text, View} from 'react-native';
import React, {Dispatch} from 'react';
import Modal from 'react-native-modal';
import {TouchableOpacity} from 'react-native';
import colors from '../../constants/colors';
import { DescriptionDataType } from '../../Types/root';

type ModalProp = {
  isModalVisible: boolean;
  setModalVisible: (val: DescriptionDataType) => void; // Dispatch<React.SetStateAction<boolean>>;
  data?: DescriptionDataType;
};

const CustomModal = ({isModalVisible, setModalVisible, data}: ModalProp) => {
  console.log(isModalVisible, data);
  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => data && setModalVisible(data)}
        onSwipeComplete={() => data && setModalVisible(data)}
        animationIn="bounceInUp"
        animationOut="bounceOutDown"
        animationInTiming={500}>
        <View style={styles.modal}>
          <View style={{flex: 1, paddingTop: 30}}>
            <Text style={styles.heading}>{data?.taskName.toUpperCase()}</Text>
            <Text style={styles.text}>{data?.description}</Text>
            <Text style={styles.time}>{data?.timeSpent}</Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => data && setModalVisible(data)}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  container: {flex: 1},
  modal: {
    backgroundColor: 'gray',
    height: '70%',
    borderRadius: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 30,
  },
  heading: {
    color: colors.WHITE,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: colors.WHITE,
    fontSize: 16,
    padding: 10,
  },
  time: {
    color: colors.WHITE,
    fontSize: 16,
    textAlign: 'right',
    marginRight: 20,
  },
  button: {
    width: '30%',
    height: '6%',
    backgroundColor: colors.BLACK,
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});
