/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';

import {
  MainWrapper, MainText, SubText,
  WrapperIcon, IconTruck, WrapperData, WrapperInfo, WrapperBtn, WrapperText, IconArrow,
} from './style';

function CardVehicle({
  icon, press, data, types,
}) {
  return (
    <MainWrapper onPress={press}>
      <WrapperIcon>
        <IconTruck
          source={require('../../icons/meTruck.png')}
        />
      </WrapperIcon>
      <WrapperData>
        <WrapperInfo>
          <WrapperText>
            <MainText>Placa: </MainText>
            <SubText>{data.plate}</SubText>
          </WrapperText>
          <WrapperText>
            <MainText>Marca: </MainText>
            <SubText>
              {data.brand}
              {' '}
              {data.model}
            </SubText>
          </WrapperText>
          <WrapperText>
            <MainText>Tipo: </MainText>
            <SubText>
              {types[data.vehicle_type_id]}
            </SubText>
          </WrapperText>
        </WrapperInfo>
        <WrapperBtn>
          <IconArrow
            source={require('../../Images/arrow-right.png')}
          />
        </WrapperBtn>
      </WrapperData>
    </MainWrapper>
  );
}

CardVehicle.propTypes = {
  icon: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  press: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  types: PropTypes.array.isRequired,
};

export default CardVehicle;
