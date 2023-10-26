import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {firebase} from '@react-native-firebase/auth';
import colors from '../../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ShowError, {EmailValidator} from '../../Utils/function';
import Loader from '../../components/Loader';
import { NavigationProps } from '../../Types/root';
const SignUp = ({navigation}: NavigationProps) => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    firstPassword: '',
    secondPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validation = () => {
    setLoading(true);
    if (user.email.length === 0) {
      setError('Email is Empty');
      setLoading(false);
    } else {
      if (user.username.length < 5) {
        setError('Username is too short');
        setLoading(false);
      } else {
        if (
          user.firstPassword.length === 0 ||
          user.firstPassword !== user.secondPassword
        ) {
          setError('Password Must be same!');
          setLoading(false);
        } else {
          if (EmailValidator(user.email)) {
            setError('');
            firebase
              .auth()
              .signInWithEmailAndPassword(user.email, user.firstPassword)
              .then(userCredential => {
                // Signed in
                setLoading(false);
                const user = userCredential.user;
                if (user.email === 'manager@gmail.com') {
                  AsyncStorage.setItem('id', user.uid);
                  AsyncStorage.setItem('role', 'manager');
                } else {
                  AsyncStorage.setItem('id', user.uid);
                  AsyncStorage.setItem('role', 'fso');
                }
                console.log('User Registered With:', user.uid);
                navigation.navigate('Signin');
              })
              .catch(error => {
                setLoading(false);
                const errorMessage = error.message;
                console.log('Error signing in:', errorMessage);
                // if(error.message)
                setError('Wrong! Email or Password! ');
              });
          } else {
            setError('Invalid Email');
            setLoading(false);
          }
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      {error && <ShowError error={error} setError={setError} />}
      <Loader show={loading} />
      <>
        <Text style={styles.heading}>Create an Account</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.GRAY}
            value={user.email}
            onChangeText={val => setUser({...user, email: val.trim()})}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor={colors.GRAY}
            value={user.username}
            onChangeText={val => setUser({...user, username: val.trim()})}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={colors.GRAY}
            value={user.firstPassword}
            secureTextEntry={true}
            onChangeText={newPassword =>
              setUser({...user, firstPassword: newPassword.trim()})
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Re-Type Password"
            placeholderTextColor={colors.GRAY}
            value={user.secondPassword}
            secureTextEntry={true}
            onChangeText={newPassword =>
              setUser({...user, secondPassword: newPassword.trim()})
            }
          />
          <TouchableOpacity style={styles.button} onPress={validation}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={{fontSize: 20}}>Already have an Account</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
            <Text style={styles.linkButton}>Sign In to your Account</Text>
          </TouchableOpacity>
        </View>
      </>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
  },
  heading: {
    fontSize: 35,
    color: colors.TEXT,
    textAlign: 'center',
    marginBottom: '20%',
    marginTop: '10%',
  },
  form: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '50%',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.BORDER,
    color: colors.TEXT,
    width: '70%',
    marginVertical: 15,
    paddingLeft: 20,
    fontSize: 18,
    borderRadius: 10,
  },
  button: {
    width: '70%',
    height: 40,
    margin: 10,
    fontSize: 18,
    backgroundColor: colors.BLUE,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkButton: {
    fontSize: 18,
    color: colors.BLUE,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: '15%',
  },
});
