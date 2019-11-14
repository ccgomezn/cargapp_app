import React from 'react';
import PropTypes from 'prop-types';
import { WrapperButton, Text, StyleBorder } from './style';

function ButtonWhite({ content, press, border }) {
  return (
    // eslint-disable-next-line no-undef
    <WrapperButton onPress={press} style={border ? null : StyleBorder}>
      <Text>{content}</Text>
    </WrapperButton>
  );
}

ButtonWhite.propTypes = {
  content: PropTypes.string.isRequired,
  press: PropTypes.func.isRequired,
  border: PropTypes.bool.isRequired,
};

export default ButtonWhite;
