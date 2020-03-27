/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import {
  MainWrapper,
  WrapperColumn,
  Image,
  TouchableContact,
  BlueText,
  TouchableDoc,
  Principal,
  EmptyWrapper,
} from './style';

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
  return null;
}

function TopCardTravel({
  arrive, actionBtnOk,
  status, aprox, touchableAction,
}) {
  if (arrive) {
    return (
      <Principal>
        <TouchableDoc onPress={touchableAction}>
          <Image source={require('../../Images/Docs.png')} />
        </TouchableDoc>
        {aprox && status !== 8 && status !== 19
          ? (
            <MainWrapper>
              <WrapperColumn>
                <TouchableContact onPress={actionBtnOk}>
                  <BlueText>
                    { textStatus(status, aprox) }
                  </BlueText>
                </TouchableContact>
              </WrapperColumn>
            </MainWrapper>
          ) : <EmptyWrapper />}
      </Principal>
    );
  } return null;
}

TopCardTravel.propTypes = {
  arrive: PropTypes.bool.isRequired,
  actionBtnOk: PropTypes.func.isRequired,
  //
  status: PropTypes.number.isRequired,
  aprox: PropTypes.bool.isRequired,
  touchableAction: PropTypes.func.isRequired,
};

export default TopCardTravel;
