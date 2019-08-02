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

function AddressesCardMap({ firstAddress, secondAddress, nameAddress }) {
  return (
    <MainWrapper>
      <WrapperCard>
        <WrapperIcon>
          <Icon />
        </WrapperIcon>
        <WrapperInfo>
          <BoldText>Ubicación actual</BoldText>
          <NormalText>{firstAddress}</NormalText>
        </WrapperInfo>
      </WrapperCard>
      <Line />
      <WrapperCard>
        <WrapperIcon>
          <Icon />
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
  firstAddress: PropTypes.string.isRequired,
  secondAddress: PropTypes.string.isRequired,
  nameAddress: PropTypes.string.isRequired,
};

export default AddressesCardMap;
