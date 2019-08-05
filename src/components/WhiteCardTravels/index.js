import React from 'react';
import PropTypes from 'prop-types';
import {
  MainWrapper,
  TextBold,
  NormalText,
  WrapperData,
  WrapperDataLeft,
  WrapperDate,
  TextDate,
  WrapperColumn,
  TouchableDetails,
  TextBlue,
  WrapperButton,
  WrapperButtons,
} from './style';
import ButtonGradient from '../ButtonGradient';

function WhiteCardTravels({
  from, to, vehicle, pay, date, press,
}) {
  return (
    <MainWrapper>
      <WrapperColumn>
        <WrapperDataLeft>
          <TextBold>De</TextBold>
          <NormalText>{from}</NormalText>
        </WrapperDataLeft>
        <WrapperData>
          <TextBold>Vehículo</TextBold>
          <NormalText>{vehicle}</NormalText>
        </WrapperData>
      </WrapperColumn>

      <WrapperColumn>
        <WrapperDataLeft>
          <TextBold>A</TextBold>
          <NormalText>{to}</NormalText>
        </WrapperDataLeft>
        <WrapperData>
          <TextBold>Flete</TextBold>
          <NormalText>
            $
            {pay}
          </NormalText>
        </WrapperData>
      </WrapperColumn>

      <WrapperDate>
        <TextDate>{date}</TextDate>
      </WrapperDate>

      <WrapperButtons>
        <TouchableDetails>
          <TextBlue>Ver más</TextBlue>
        </TouchableDetails>
        <WrapperButton>
          <ButtonGradient press={press} content="Aplicar" />
        </WrapperButton>
      </WrapperButtons>
    </MainWrapper>
  );
}

WhiteCardTravels.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  vehicle: PropTypes.string.isRequired,
  pay: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  press: PropTypes.func.isRequired,
};

export default WhiteCardTravels;
