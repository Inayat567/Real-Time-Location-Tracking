import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import { NavigationProps } from '../../Types/root';

const OnBoarding = ({navigation}: NavigationProps) => {
  const handleNavigation = (screen: string) => {
    navigation.navigate(screen);
  };
  return (
    <View style={styles.container}>
      <Image
        source={require('../../Assets/Images/track.png')}
        style={styles.img}
      />
      <View style={{flex: 1, marginTop: 20}}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: colors.BLUE}]}
          onPress={() => handleNavigation('Signin')}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigation('Signup')}>
          <Text style={[styles.buttonText, {color: colors.BLUE}]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BG,
  },
  img: {
    width: '90%',
    height: '75%',
    resizeMode: 'stretch',
    borderRadius: 20,
    marginVertical: 10,
  },
  button: {
    paddingHorizontal: 100,
    paddingVertical: 8,
    marginVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.BORDER,
  },
  buttonText: {
    color: colors.WHITE,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
