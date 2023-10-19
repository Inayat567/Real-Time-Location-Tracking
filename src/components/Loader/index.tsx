import React from 'react';
import AwesomeLoading from 'react-native-awesome-loading';
import colors from '../../constants/colors';

interface LoaderProp{
  show:boolean,
}

const Loader = (props:LoaderProp) => {
  return (
    <AwesomeLoading
      indicatorId={1}
      size={80}
      isActive={props.show}
      text="Please wait..."
      textStyle={{color: colors.GRAY, fontSize: 18}}
    />
  );
};

export default Loader;

