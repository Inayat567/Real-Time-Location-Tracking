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
