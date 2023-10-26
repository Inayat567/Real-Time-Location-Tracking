import {NavigationScreenProp} from 'react-navigation';

export type RootStackParamList = {
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

export interface NavigationProps {
  navigation: NavigationScreenProp<any, any>;
}

export interface ErrorProps {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

export type DescriptionDataType = {
  taskName: string;
  timeSpent: number;
  description: string;
};
