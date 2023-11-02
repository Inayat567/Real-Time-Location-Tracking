import {ToastAndroid} from 'react-native';
import {ErrorProps} from '../Types/root';
import {LatLng} from 'react-native-maps';
import {firebase} from '@react-native-firebase/firestore';

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

export const getDateFormat = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so we add 1.
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const saveRouteToFirebase = (
  selectedCar: string,
  departTime: Date,
  arrivalTime: Date,
  routeData: LatLng[],
) => {
  let todayDate = getDateFormat(new Date());
  let routesCollectionRef = firebase
    .firestore()
    .collection('Routes')
    .doc(todayDate)
    .collection(selectedCar)
    .doc(todayDate);
  routesCollectionRef
    .set({
      carName: selectedCar,
      departureTime: getTimeFormat(departTime),
      arrivalTime: getTimeFormat(arrivalTime),
      routeCoordinates: routeData,
    })
    .then(res => {
      console.log('Document successfully written!', res);
    })
    .catch(e => {
      console.warn(e);
    });
  console.log(selectedCar, departTime, arrivalTime, routeData);
};

export interface routeProp {
  carName?: string;
  departureTime?: string;
  arrivalTime?: string;
  routeCoordinates?: LatLng[] | null;
}
