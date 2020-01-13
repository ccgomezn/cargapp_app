/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import {
  MainWrapper,
  WrapperColumn,
  WrapperImage,
  Image,
  WrapperInfo,
  BoldText,
  NormalText,
  TouchableContact,
  BlueText,
  Line,
  WrapperSection,
  LineVerical,
  Icon,
} from './style';

function TopCardTravel({
  company, travelsCount, amount, arrive, isConfirmLoad, unLoad, actionBtnOk, actionMan, actionCall
}) {
  if (arrive) {
    return (
      <MainWrapper>
        <WrapperColumn>
          <WrapperImage>
            <Image
              source={require('../../Images/compani.png')}
            />
          </WrapperImage>
          <WrapperInfo>
            <BoldText>{company}</BoldText>
            <NormalText>{travelsCount}</NormalText>
          </WrapperInfo>
          <TouchableContact onPress={actionCall}>
            <BlueText>Contactar</BlueText>
          </TouchableContact>
        </WrapperColumn>
        <Line />
        {isConfirmLoad
          ? (
            <WrapperColumn>
              <WrapperSection>
                <BoldText>Anticipo consignado</BoldText>
                <NormalText>{amount}</NormalText>
              </WrapperSection>
              <LineVerical />
              <WrapperColumn>
                <Icon />
                <TouchableContact onPress={actionMan}>
                  <BlueText>Ver manifiesto</BlueText>
                </TouchableContact>
              </WrapperColumn>
            </WrapperColumn>
          )
          : (
            <WrapperColumn>
              <TouchableContact onPress={actionBtnOk}>
                <BlueText style={{ paddingVertical: 10 }}>
                  Confirmar
                  {' '}
                  {!unLoad ? 'cargue' : 'descargue' }
                </BlueText>
              </TouchableContact>
            </WrapperColumn>
          )
        }
      </MainWrapper>
    );
  } return (
    <MainWrapper style={{ paddingTop: 10 }}>
      <WrapperColumn>
        <WrapperImage>
          <Image
            source={require('../../Images/compani.png')}
          />
        </WrapperImage>
        <WrapperInfo>
          <BoldText>{company}</BoldText>
          <NormalText>{travelsCount}</NormalText>
        </WrapperInfo>
        <TouchableContact>
          <BlueText>Contactar</BlueText>
        </TouchableContact>
      </WrapperColumn>
    </MainWrapper>
  );
}

TopCardTravel.propTypes = {
  company: PropTypes.string.isRequired,
  travelsCount: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  arrive: PropTypes.bool.isRequired,
  isConfirmLoad: PropTypes.bool.isRequired,
  unLoad: PropTypes.bool.isRequired,
  actionBtnOk: PropTypes.func.isRequired,
  actionMan: PropTypes.func.isRequired,
  actionCall: PropTypes.func.isRequired,
};

export default TopCardTravel;
