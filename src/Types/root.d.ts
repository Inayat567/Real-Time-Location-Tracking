import {NavigationScreenProp } from 'react-navigation';

export interface NavigationProps {
    navigation: NavigationScreenProp<any,any>
  };

export interface ErrorProps {
    error: string;
    setError: React.Dispatch<React.SetStateAction<string>>
}