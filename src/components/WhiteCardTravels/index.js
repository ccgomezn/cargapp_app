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
  Line,
  WrapperTextIcon,
  Icon,
} from './style';
import ButtonGradient from '../ButtonGradient';
import images from '../../icons';

function WhiteCardTravels({
  from, to, vehicle, pay, date,
  actionbtnPrimary, btnPrimary,
  actionbtnSecondary,
  status, statusColor,
}) {
  return (
    <MainWrapper onPress={btnPrimary !== null ? actionbtnPrimary : null}>
      <WrapperColumn>
        <WrapperDataLeft>
          <WrapperTextIcon>
            <Icon source={images.locationOffer} />
            <TextBold>{to}</TextBold>
          </WrapperTextIcon>
          <NormalText>Origen</NormalText>
        </WrapperDataLeft>
        { vehicle != null ? (
          <WrapperData>
            <WrapperTextIcon>
              <Icon source={images.originPin} />
              <TextBold>{from}</TextBold>
            </WrapperTextIcon>
            <NormalText>Destino</NormalText>
          </WrapperData>
        ) : null }
      </WrapperColumn>
      <Line />
      <WrapperColumn>
        <WrapperDataLeft>
          <TextBold>{vehicle}</TextBold>
          <WrapperTextIcon>
            <Icon source={images.offers} />
            <NormalText>Vehículo</NormalText>
          </WrapperTextIcon>
        </WrapperDataLeft>
        <WrapperData>
          <TextBold>
            {'$ '}
            {pay}
          </TextBold>
          <WrapperTextIcon>
            <Icon source={images.moneyOffer} />
            <NormalText>Flete</NormalText>
          </WrapperTextIcon>
        </WrapperData>
      </WrapperColumn>

      { status != null ? (
        <WrapperDate bgcolor={statusColor}>
          <TextDate color={statusColor}>{status}</TextDate>
        </WrapperDate>
      ) : <WrapperDate><TextDate>{date}</TextDate></WrapperDate>
      }

      <WrapperButtons>
        { btnPrimary != null ? (
          <>
            <TouchableDetails onPress={actionbtnSecondary}>
              <TextBlue>Compartir</TextBlue>
            </TouchableDetails>
            <WrapperButton>
              <ButtonGradient press={actionbtnPrimary} content={btnPrimary} />
            </WrapperButton>
          </>
        ) : null }
      </WrapperButtons>
    </MainWrapper>
  );
}

WhiteCardTravels.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  vehicle: PropTypes.string.isRequired,
  pay: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  // add
  actionbtnPrimary: PropTypes.func.isRequired,
  btnPrimary: PropTypes.string.isRequired,
  actionbtnSecondary: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  statusColor: PropTypes.string.isRequired,

};

export default WhiteCardTravels;
