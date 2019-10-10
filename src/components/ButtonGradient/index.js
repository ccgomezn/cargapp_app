import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { Text, Touch } from './style';

function ButtonGradient({ content, press, disabled }) {
  return (
    <Touch onPress={press} disabled={disabled}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 3 }}
        colors={
          disabled
            ? ['#ece9f1', '#ece9f1']
            : ['#007aff', '#00ff77']}
      >
        <Text
          style={{ color: disabled ? '#d0c9d6' : 'white' }}
        >
          {content}
        </Text>
      </LinearGradient>
    </Touch>
  );
}

ButtonGradient.propTypes = {
  content: PropTypes.string.isRequired,
  press: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default ButtonGradient;
