import React from 'react';
import PropTypes from 'prop-types';
import { Linear, Text } from './style';

function ButtonGradient({ content }) {
  return (
    <Linear start={{ x: 0, y: 0 }} end={{ x: 1, y: 3 }} colors={['#007aff', '#00ff77']}>
      <Text>{content}</Text>
    </Linear>
  );
}

ButtonGradient.propTypes = {
  content: PropTypes.string.isRequired,
};

export default ButtonGradient;
