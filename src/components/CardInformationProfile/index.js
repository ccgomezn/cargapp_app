import React from 'react';
import PropTypes from 'prop-types';
import {
  MainWrapper, MainText, SubText, SecondWrapper, Linear,
} from './style';

function CardInformationProfile({ mainText, subText, description }) {
  return (
    <MainWrapper>
      <Linear
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#007aff', '#00ff77']}
      >
        <MainText>{mainText}</MainText>
        <SubText>{subText}</SubText>
      </Linear>
      <SecondWrapper>
        <SubText style={{ color: '#80849a' }}>{description}</SubText>
      </SecondWrapper>
    </MainWrapper>
  );
}

CardInformationProfile.propTypes = {
  mainText: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CardInformationProfile;
