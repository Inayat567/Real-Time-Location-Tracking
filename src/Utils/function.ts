import {ToastAndroid} from 'react-native';
import {ErrorProps} from '../Types/root';

export const EmailValidator = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const ShowError: React.FC<ErrorProps> = ({error, setError}) => {
  if (error?.length > 0) {
    ToastAndroid.showWithGravity(error, ToastAndroid.LONG, ToastAndroid.TOP);
    setError('');
  }
  return null;
};

export default ShowError;

export const getTimeFormat = (date: Date) => {
  let hours = date.getHours();
  let minutes: string | number = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  let strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};
