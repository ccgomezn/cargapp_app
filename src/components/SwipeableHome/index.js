import React from 'react';
import PropTypes from 'prop-types';
import { WrapperButton, TextBlue } from './style';

function SwipeableHome({ text, press }) {
  return (
    <WrapperButton onPress={press}>
      <TextBlue>{text}</TextBlue>
    </WrapperButton>
  );
}

SwipeableHome.propTypes = {
  text: PropTypes.string.isRequired,
  press: PropTypes.func.isRequired,
};

export default SwipeableHome;
