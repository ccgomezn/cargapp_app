import React from 'react';
import PropTypes from 'prop-types';
import { Linear, Text, Touch } from './style';

function ButtonGradient({ content, press }) {
  return (
    <Touch onPress={press}>
      <Linear
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 3 }}
        colors={['#007aff', '#00ff77']}
      >
        <Text>{content}</Text>
      </Linear>
    </Touch>
  );
}

ButtonGradient.propTypes = {
  content: PropTypes.string.isRequired,
  press: PropTypes.func.isRequired,
};

export default ButtonGradient;
