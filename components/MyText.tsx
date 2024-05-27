import React from 'react';
import {Text} from 'react-native';

const MyText = (props: any) => {
  return (
    <>
      <Text
        {...props}
        style={{
          ...props.style,
          fontFamily: props.style.fontFamily
            ? props.style.fontFamily
            : 'Li Ador Noirrit',
        }}>
        {props.children}
      </Text>
    </>
  );
};

export default MyText;
