import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import * as Progress from 'react-native-progress';
// import ProgressPie from 'react-native-progress/Pie'

const ProgressReport = () => {
  const progress = 0.8;
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Progress Pie Graph</Text>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Progress.Pie
          progress={progress}
          size={190}
          unfilledColor="#fff"
          color={progress > 0.4 ? colors.BUTTON : colors.RED}
          borderWidth={0}
        />
        <Text
          style={[
            styles.progressText,
            {color: progress > 0.4 ? colors.BUTTON : colors.RED},
          ]}>
          {progress * 100}%
        </Text>
      </View>
    </View>
  );
};

export default ProgressReport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    marginTop: 20,
    fontSize: 25,
    color: colors.TEXT,
  },
  progressText: {
    textAlign: 'center',
    fontSize: 35,
    marginTop: 20,
  },
});
