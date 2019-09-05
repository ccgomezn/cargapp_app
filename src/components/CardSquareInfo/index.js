import React from 'react';
import PropTypes from 'prop-types';
import {
  MainWrapper, WrapperHeader, Icon, IconDefault, TextPrice, TextDescription,
} from './style';

function CardSquareInfo({ value, description, icon }) {
  return (
    <MainWrapper>
      <WrapperHeader>
        { icon != null ? (
          <Icon
            source={icon}
          />
        ) : <IconDefault /> }
        <TextPrice>{value}</TextPrice>
      </WrapperHeader>
      <TextDescription>{description}</TextDescription>
    </MainWrapper>
  );
}

CardSquareInfo.propTypes = {
  value: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default CardSquareInfo;
