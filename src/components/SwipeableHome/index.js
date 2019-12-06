import React from 'react';
import PropTypes from 'prop-types';
import { WrapperButton, TextBlue } from './style';

function SwipeableHome({ text }) {
  return (
    <WrapperButton>
      <TextBlue>{text}</TextBlue>
    </WrapperButton>
  );
}

SwipeableHome.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SwipeableHome;
