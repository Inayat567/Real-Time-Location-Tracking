import {NavigationScreenProp} from 'react-navigation';

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
