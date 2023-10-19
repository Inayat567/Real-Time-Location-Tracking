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
  Progress,
  TaskStatus,
  TodayTask,
  TrackEmployee,
} from '../screen';
import OnBoarding from '../screen/Login';
import Complaints from '../screen/Complaints';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="onBoaring">
        <Stack.Screen
          name="onBoaring"
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
          component={Progress}
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
