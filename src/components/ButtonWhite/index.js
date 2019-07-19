import React from 'react';
import PropTypes from 'prop-types';
import { WrapperButton, Text } from './style';

function ButtonWhite({ content }) {
  return (
    <WrapperButton>
      <Text>{content}</Text>
    </WrapperButton>
  );
}

ButtonWhite.propTypes = {
  content: PropTypes.string.isRequired,
};

export default ButtonWhite;
