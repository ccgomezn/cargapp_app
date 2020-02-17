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
import images from '../../icons';

function AddressesCardMap(
  {
    nameCompany, firstAddress, secondAddress, nameAddress, iconOrigin, iconDestination,
  },
) {
  return (
    <MainWrapper>
      <WrapperCard>
        <WrapperIcon>
          <Icon
            source={iconOrigin || images.markerOrigin}
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
            source={iconDestination || images.markerDestination}
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
  iconOrigin: PropTypes.string.isRequired,
  iconDestination: PropTypes.string.isRequired,
};

export default AddressesCardMap;
