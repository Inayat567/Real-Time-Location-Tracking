import React, {Dispatch} from 'react';
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

interface DateTimePickerProp {
  date: Date;
  setDate:(value: Date) => void //Dispatch<React.SetStateAction<Date>>;
  mode: 'date' | 'time';
}

const DateTimePickers = ({date, setDate, mode}: DateTimePickerProp) => {
  const onChange = (event: DateTimePickerEvent, date?: Date | undefined) => {
    date && setDate(date);
  };

  const showMode = (currentMode: 'date' | 'time') => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  return <>{showMode(mode)}</>;
};

export default DateTimePickers;
