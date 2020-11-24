import React from 'react';
import PropTypes from 'prop-types';
import {
  MainWrapper, TextWrapper, MainText, SubText,
} from './style';

const CardBank = ({
  title, subTitle, press, disable,
}) => (
  <MainWrapper onPress={press} disabled={disable}>
    <TextWrapper style={disable && { opacity: 0.5 }}>
      <MainText>{title}</MainText>
      <SubText>{subTitle}</SubText>
    </TextWrapper>
  </MainWrapper>
);
CardBank.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  press: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
};

export default CardBank;
