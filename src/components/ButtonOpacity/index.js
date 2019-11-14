import React from 'react';
import PropTypes from 'prop-types';
import { MainWrapper, Text } from './style';

function ButtonOpacity({ text }) {
  return (
    <MainWrapper>
      <Text>{text}</Text>
    </MainWrapper>
  );
}

ButtonOpacity.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ButtonOpacity;
