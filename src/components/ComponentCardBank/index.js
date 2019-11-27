import React from 'react';
import PropTypes from 'prop-types';
import {
  MainWrapper, TextWrapper, MainText, SubText,
} from './style';

const CardBank = ({
  title, subTitle, press,
}) => (
  <MainWrapper onPress={press}>
    <TextWrapper>
      <MainText>{title}</MainText>
      <SubText>{subTitle}</SubText>
    </TextWrapper>
  </MainWrapper>
);
CardBank.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  press: PropTypes.func.isRequired,
};

export default CardBank;
