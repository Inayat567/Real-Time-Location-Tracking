import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Home,
  SignIn,
  SignUp,
  Employees,
  FeedBacks,
  LiveLocation,
  NewTask,
  PastTasks,
  ProgressReport,
  TaskStatus,
  TodayTask,
  TrackEmployee,
  OnBoarding,
  Complaints,
} from '../screen';

type RootStackParamList = {
  Home: undefined;
  OnBoarding: undefined;
  Signin: undefined;
  Signup: undefined;
  Complaint: undefined;
  Employee: undefined;
  Feedback: undefined;
  Livelocation: undefined;
  Newtask: undefined;
  Pasttask: undefined;
  Progress: undefined;
  Taskstatus: undefined;
  Todaytask: undefined;
  Trackemployee: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBoarding">
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signin"
          component={SignIn}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Complaint"
          component={Complaints}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Employee"
          component={Employees}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Feedback"
          component={FeedBacks}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Livelocation"
          component={LiveLocation}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="Newtask"
          component={NewTask}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Pasttask"
          component={PastTasks}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Progress"
          component={ProgressReport}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Taskstatus"
          component={TaskStatus}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Todaytask"
          component={TodayTask}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Trackemployee"
          component={TrackEmployee}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
