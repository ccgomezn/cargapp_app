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

import { formatPrice } from '../../helpers/Utils';

function textStatus(status, aprox) {
  if (status === 6) {
    return 'Evidencia Inicio de Cargue';
  }
  if (status === 7) {
    return 'Evidencia Finalizar Cargue';
  }
  if (status === 18) {
    return 'Evidencia Inicio de Descargue';
  }
  if (status === 9) {
    return 'Evidencia Finalizar Descargue';
  }
  return '';
}

function TopCardTravel({
  company, travelsCount, amount,
  arrive, isConfirmLoad,
  actionBtnOk, actionMan, actionCall,
  status, aprox,
}) {
  if (arrive) {
    return (
      <MainWrapper style={!isConfirmLoad ? { paddingTop: 5 } : null}>
        {/* <WrapperColumn>
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
        { aprox || isConfirmLoad ? (
          <Line />
        ) : null } */}
        {isConfirmLoad
          ? (
            <WrapperColumn style={!aprox ? { marginTop: 6 } : null}>
              <WrapperSection>
                <BoldText>Anticipo consignado</BoldText>
                <NormalText>
                  {'$'}
                  {formatPrice(amount)}
                </NormalText>
              </WrapperSection>
              <LineVerical />
              <WrapperColumn>
                <TouchableContact onPress={actionMan}>
                  <BlueText>Ver manifiesto</BlueText>
                </TouchableContact>
              </WrapperColumn>
            </WrapperColumn>
          ) : null }
        { aprox && isConfirmLoad ? (
          <Line />
        ) : null }
        {aprox
          ? (
            <WrapperColumn>
              <TouchableContact onPress={actionBtnOk}>
                <BlueText style={{ /* paddingVertical: 10 */ }}>
                  { textStatus(status, aprox) }
                </BlueText>
              </TouchableContact>
            </WrapperColumn>
          ) : null }
      </MainWrapper>
    );
  } return null;
}

TopCardTravel.propTypes = {
  company: PropTypes.string.isRequired,
  travelsCount: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  arrive: PropTypes.bool.isRequired,
  isConfirmLoad: PropTypes.bool.isRequired,
  actionBtnOk: PropTypes.func.isRequired,
  actionMan: PropTypes.func.isRequired,
  actionCall: PropTypes.func.isRequired,
  //
  status: PropTypes.number.isRequired,
  aprox: PropTypes.bool.isRequired,
};

export default TopCardTravel;
