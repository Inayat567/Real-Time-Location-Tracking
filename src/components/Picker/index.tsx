import {StyleSheet, Text, View} from 'react-native';
import React, {Dispatch, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

interface PickerProp {
  open: boolean;
  value: string;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  setValue: Dispatch<React.SetStateAction<string>>;
  items: {label: string; value: string}[];
}

const Picker = ({open, value, setOpen, setValue, items}: PickerProp) => {
  return (
    <View>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        dropDownDirection="BOTTOM"
      />
    </View>
  );
};

export default Picker;

const styles = StyleSheet.create({});
