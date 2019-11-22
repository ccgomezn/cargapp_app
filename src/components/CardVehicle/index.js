/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import {
  MainWrapper, MainText, SubText,
  WrapperIcon, IconTruck, WrapperData, WrapperInfo, WrapperBtn, WrapperText, IconArrow,
} from './style';

function CardVehicle({ icon, press, data }) {
  return (
    <MainWrapper>
      <WrapperIcon>
        <IconTruck
          source={{ uri: 'https://raw.githubusercontent.com/cargappco/cargapp_lite_refac/master/src/Images/meTruck.png?token=AGFM22MMV75A5XZBXZGIMNK54BPN6' }}
        />
      </WrapperIcon>
      <WrapperData>
        <WrapperInfo>
          <WrapperText>
            <MainText>Placa: </MainText>
            <SubText>TTT265</SubText>
          </WrapperText>
          <WrapperText>
            <MainText>Tipo: </MainText>
            <SubText>Sencillo</SubText>
          </WrapperText>
          <WrapperText>
            <MainText>Carroceria: </MainText>
            <SubText>Tanque lamina</SubText>
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
};

export default CardVehicle;
