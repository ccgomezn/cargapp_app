import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { Text, Touch } from './style';

function ButtonGradient({ content, press }) {
  return (
    <Touch onPress={press}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 3 }}
        colors={['#007aff', '#00ff77']}
      >
        <Text>{content}</Text>
      </LinearGradient>
    </Touch>
  );
}

ButtonGradient.propTypes = {
  content: PropTypes.string.isRequired,
  press: PropTypes.func.isRequired,
};

export default ButtonGradient;
