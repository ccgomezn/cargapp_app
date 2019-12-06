import React from 'react';
import PropTypes from 'prop-types';
import {
  MainWrapper,
  Text,
  WrapperRow,
  WrapperDataColumn,
  WrapperData,
  OpacityText,
  NormalText,
  Image,
  Line,
  WrapperImage,
} from './style';

function CardHome({ name, km, points }) {
  return (
    <MainWrapper>
      <Text>{name}</Text>
      <WrapperRow>
        <WrapperDataColumn>
          <Image />
          <WrapperData>
            <OpacityText>{km}</OpacityText>
            <NormalText>Kms recorridos</NormalText>
          </WrapperData>
        </WrapperDataColumn>
        <Line />
        <WrapperDataColumn>
          <Image />
          <WrapperData>
            <OpacityText>{points}</OpacityText>
            <NormalText>Puntos Acumulados</NormalText>
          </WrapperData>
        </WrapperDataColumn>
      </WrapperRow>
    </MainWrapper>
  );
}

CardHome.propTypes = {
  name: PropTypes.string.isRequired,
  km: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
};

export default CardHome;
