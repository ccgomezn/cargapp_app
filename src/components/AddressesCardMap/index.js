/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import {
  MainWrapper,
  WrapperCard,
  Icon,
  WrapperInfo,
  BoldText,
  NormalText,
  Line,
  WrapperIcon,
} from './style';

function AddressesCardMap(
  {
    nameCompany, firstAddress, secondAddress, nameAddress,
  },
) {
  return (
    <MainWrapper>
      <WrapperCard>
        <WrapperIcon>
          <Icon
            source={require('../../icons/icon_origin.png')}
          />
        </WrapperIcon>
        <WrapperInfo>
          <BoldText>{nameCompany}</BoldText>
          <NormalText>{firstAddress}</NormalText>
        </WrapperInfo>
      </WrapperCard>
      <Line />
      <WrapperCard>
        <WrapperIcon>
          <Icon
            source={require('../../icons/icon_destination.png')}
          />
        </WrapperIcon>
        <WrapperInfo>
          <BoldText>{nameAddress}</BoldText>
          <NormalText>{secondAddress}</NormalText>
        </WrapperInfo>
      </WrapperCard>
    </MainWrapper>
  );
}

AddressesCardMap.propTypes = {
  nameCompany: PropTypes.string.isRequired,
  firstAddress: PropTypes.string.isRequired,
  secondAddress: PropTypes.string.isRequired,
  nameAddress: PropTypes.string.isRequired,
};

export default AddressesCardMap;
