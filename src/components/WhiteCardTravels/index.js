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
  from, to, vehicle, pay, date,
  actionbtnPrimary, btnPrimary,
  actionbtnSecondary, btnSecondary,
  status, statusColor,
}) {
  return (
    <MainWrapper>
      <WrapperColumn>
        <WrapperDataLeft>
          <TextBold>De</TextBold>
          <NormalText>{from}</NormalText>
        </WrapperDataLeft>
        { vehicle != null ? (
          <WrapperData>
            <TextBold>Vehículo</TextBold>
            <NormalText>{vehicle}</NormalText>
          </WrapperData>
        ) : null }
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

      { status != null ? (
        <WrapperDate bgcolor={statusColor}>
          <TextDate color={statusColor}>{status}</TextDate>
        </WrapperDate>
      ) : <WrapperDate><TextDate>{date}</TextDate></WrapperDate>
      }

      <WrapperButtons>
        { btnSecondary != null ? (
          <TouchableDetails onPress={actionbtnSecondary}>
            <TextBlue>Ver más</TextBlue>
          </TouchableDetails>
        ) : null }
        { btnPrimary != null ? (
          <WrapperButton>
            <ButtonGradient press={actionbtnPrimary} content={btnPrimary} />
          </WrapperButton>
        ) : null }
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
  // add
  actionbtnPrimary: PropTypes.func.isRequired,
  btnPrimary: PropTypes.string.isRequired,
  btnSecondary: PropTypes.string.isRequired,
  actionbtnSecondary: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  statusColor: PropTypes.string.isRequired,

};

export default WhiteCardTravels;
