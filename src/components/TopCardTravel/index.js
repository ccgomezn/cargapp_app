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
  TouchableDoc,
  Principal,
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
  status, aprox, touchableAction,
}) {
  if (arrive) {
    return (
      <Principal>
        <TouchableDoc onPress={touchableAction}>
          <Image source={require('../../Images/Docs.png')} />
        </TouchableDoc>
        <MainWrapper style={!isConfirmLoad ? { paddingTop: 5 } : null}>
          { aprox && isConfirmLoad ? (
            {/* <Line /> */}
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
      </Principal>
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
  touchableAction: PropTypes.func.isRequired,
};

export default TopCardTravel;
