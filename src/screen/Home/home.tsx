import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import colors from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlexBox from '../../components/FlexBox';
import {NavigationProps} from '../../Types/root';

const Home = ({navigation} : NavigationProps) => {
  const [role, setRole] = useState<string | null>('');

  const BoxData1 = [
    {name: 'Employees', number: '23', color: 'lightgray', route: 'Employee'},
    {name: 'Track Orders', number: '08', color: 'gray', route: 'Trackemployee'},
    {name: 'Complaints', number: '01', color: '#606060', route: 'Complaint'},
    {name: 'Task Status', number: '15', color: '#B8B8B8', route: 'Taskstatus'},
  ];

  const BoxData2 = [
    {name: 'Complaints', number: '01', color: '#606060', route: 'Complaint'},
    {name: 'Task Status', number: '15', color: '#B8B8B8', route: 'Taskstatus'},
  ];

  const BoxData3 = [
    {name: 'Today Tasks', number: '05', color: 'darkgreen', route: 'Todaytask'},
    {name: 'Past Tasks', number: '49', color: 'gray', route: 'Pasttask'},
    {name: 'Progress', number: '78%', color: 'green', route: 'Progress'},
    {name: 'Feedbacks', number: '15', color: 'darkred', route: 'Feedback'},
  ];

  const BoxData4 = [
    {name: 'Progress', number: '78%', color: 'green', route: 'Progress'},
    {name: 'Feedbacks', number: '15', color: 'darkred', route: 'Feedback'},
  ];

  useEffect(() => {
    AsyncStorage.getItem('role')
      .then(val => {
        setRole(val);
      })
      .catch(error => {
        console.log('Error: ' + error);
      });
  });

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Welcome {role}</Text>
      <Image
        source={require('../../Assets/Images/avatar.png')}
        style={styles.image}
      />
      {role === 'manager' ? (
        <>
          <FlexBox data={BoxData1} />
          {/* <FlexBox data={BoxData2} /> */}
        </>
      ) : (
        <>
          <FlexBox data={BoxData3} />
          {/* <FlexBox data={BoxData4} /> */}
        </>
      )}
      <View>
        {role === 'manager' ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Newtask')}>
            <Text style={styles.buttonText}>New Task +</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Livelocation')}>
            <Text style={styles.buttonText}>Let's Start ={'>'}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    alignSelf: 'center',
  },
  button: {
    width: '60%',
    height: 40,
    backgroundColor: colors.BLUE,
    borderRadius: 10,
    borderColor: colors.BORDER,
    margin: 40,
    padding: 10,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: colors.WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
