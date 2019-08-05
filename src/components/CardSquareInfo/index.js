import React from 'react';
import PropTypes from 'prop-types';
import {
  MainWrapper, WrapperHeader, Icon, TextPrice, TextDescription,
} from './style';

function CardSquareInfo({ value, description }) {
  return (
    <MainWrapper>
      <WrapperHeader>
        <Icon />
        <TextPrice>{value}</TextPrice>
      </WrapperHeader>
      <TextDescription>{description}</TextDescription>
    </MainWrapper>
  );
}

CardSquareInfo.propTypes = {
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default CardSquareInfo;
