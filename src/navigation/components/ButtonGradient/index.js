import React from 'react';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { Text, Touch } from './style';

function ButtonGradient({ content }) {
  return (
    <Touch>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 3 }}
        colors={['#007aff', '#00ff77']}
        style={{ borderRadius: 13 }}
      >
        <Text>
          {content}
        </Text>
      </LinearGradient>
    </Touch>
  );
}

ButtonGradient.propTypes = {
  content: PropTypes.string.isRequired,
};

export default ButtonGradient;
