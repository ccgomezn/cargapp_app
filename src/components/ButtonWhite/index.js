import React from 'react';
import PropTypes from 'prop-types';
import { WrapperButton, Text } from './style';

function ButtonWhite({ content, press }) {
  return (
    <WrapperButton onPress={press}>
      <Text>{content}</Text>
    </WrapperButton>
  );
}

ButtonWhite.propTypes = {
  content: PropTypes.string.isRequired,
  press: PropTypes.func.isRequired,
};

export default ButtonWhite;
