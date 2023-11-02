import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import colors from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlexBox from '../../components/FlexBox';
import {NavigationProps} from '../../Types/root';
import {getDateFormat} from '../../Utils/function';
import {firebase} from '@react-native-firebase/firestore';
import AuthContext, {AuthContextType} from '../../components/Context/context';

const Home = ({navigation}: NavigationProps) => {
  const [role, setRole] = useState<string | null>('');
  const {routes, setRoutes, setLiveRoutes} =
    useContext<AuthContextType>(AuthContext);

  const [dataSync, setDataSync] = useState(false);

  const BoxData1 = [
    {name: 'Employees', number: '23', color: 'lightgray', route: 'Employee'},
    {name: 'Track Orders', number: '08', color: 'gray', route: 'Trackemployee'},
    {name: 'Complaints', number: '01', color: '#606060', route: 'Complaint'},
    {name: 'Task Status', number: '15', color: '#B8B8B8', route: 'Taskstatus'},
  ];

  const BoxData2 = [
    {name: 'Today Tasks', number: '05', color: 'darkgreen', route: 'Todaytask'},
    {name: 'Past Tasks', number: '49', color: 'gray', route: 'Pasttask'},
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
  }, []);

  const getCarRoutes = async (carName: string = 'Car1') => {
    let todayDate = getDateFormat(new Date());
    let routesCollectionRef = firebase
      .firestore()
      .collection('Routes')
      .doc(todayDate)
      .collection(carName)
      .doc(todayDate);

    const res = await routesCollectionRef.get();
    if (!res.exists) {
      throw new Error(`No document to get for ${carName}`);
    } else {
      console.log('Routes from firebase: ', res?.data());
      setRoutes(res?.data());
    }
  };

  const updateRouts = async () => {
    try {
      const todayDate = getDateFormat(new Date());
      const carName = routes?.carName || 'Car1';

      const docRef = firebase
        .firestore()
        .collection('liveCoordinates')
        .doc(todayDate)
        .collection(carName)
        .doc(todayDate);

      const res = await docRef.get();
      if (!res.exists) {
        throw new Error(`No document`);
      } else {
        console.log('Routes from firebase: ', res?.data());
        let tempData = res?.data();
        console.log('Routes value: ', tempData?.routes);
        setLiveRoutes([...tempData?.routes]);
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  if (!dataSync) {
    setDataSync(true);
    getCarRoutes();
    updateRouts();
  }

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
        </>
      ) : (
        <>
          <FlexBox data={BoxData2} />
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
