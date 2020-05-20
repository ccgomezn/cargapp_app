/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import {
  MainWrapper,
  WrapperHeader,
  WrapperBody,
  WrapperFooter,
  WrapperIcon,
  Icon,
  WrapperInfo,
  BoldText,
  NormalText,
  TouchableQualification,
  BlueText,
  WrapperColumn,
  WrapperInfoBody,
  WrapperButton,
} from './style';
import { Line } from '../TopCardTravel/style';
import ButtonWhite from '../ButtonWhite';
import ButtonGradient from '../ButtonGradient';

function CardMapBeginTravel({
  company, normalText, amount, extra,
  vehicle, content, packing, loadWeight, loadVolume,
  onPressBW, onPressBG, mainButton, onPressQA, button,
  status, disabled,
}) {
  return (
    <MainWrapper>
      <WrapperHeader>
        <WrapperIcon>
          <Icon
            source={require('../../Images/compani.png')}
          />
        </WrapperIcon>
        <WrapperInfo>
          <BoldText>{company}</BoldText>
          <NormalText>
            {normalText}
          </NormalText>
        </WrapperInfo>
        {/* <TouchableQualification onPress={onPressQA}>
          <BlueText>
            Ver calificación
          </BlueText>
        </TouchableQualification> */}
      </WrapperHeader>
      <Line />
      <WrapperBody>
        <WrapperColumn>
          <WrapperInfoBody>
            <BoldText>Vehículo</BoldText>
            <NormalText>
              {vehicle}
            </NormalText>
          </WrapperInfoBody>
          <WrapperInfoBody>
            <BoldText>Valor del flete</BoldText>
            <NormalText>
              {'$ '}
              {amount}
            </NormalText>
          </WrapperInfoBody>
        </WrapperColumn>
        <WrapperColumn>
          <WrapperInfoBody>
            <BoldText>Contenido</BoldText>
            <NormalText>{content}</NormalText>
          </WrapperInfoBody>
          <WrapperInfoBody>
            <BoldText>Empaque de la carga</BoldText>
            <NormalText>{packing}</NormalText>
          </WrapperInfoBody>
        </WrapperColumn>
        <WrapperColumn>
          <WrapperInfoBody>
            <BoldText>Peso</BoldText>
            <NormalText>
              {loadWeight}
              {' '}
              {loadWeight !== 'N/A' ? 'Ton.' : ''}
            </NormalText>
          </WrapperInfoBody>
          <WrapperInfoBody>
            <BoldText>Volumen</BoldText>
            <NormalText>
              {loadVolume}
              {' '}
              {loadVolume !== 'N/A' ? 'm³' : ''}
            </NormalText>
          </WrapperInfoBody>
        </WrapperColumn>
        <WrapperColumn>
          <WrapperInfoBody>
            <BoldText>Observaciones</BoldText>
            <NormalText>{extra}</NormalText>
          </WrapperInfoBody>
        </WrapperColumn>
      </WrapperBody>
      { status !== 11 ? (
        <WrapperFooter>
          <WrapperButton>
            <ButtonWhite press={onPressBW} content="Volver" />
          </WrapperButton>
          {button ? (
            <WrapperButton>
              <ButtonGradient disabled={disabled} press={onPressBG} content={mainButton} />
            </WrapperButton>
          ) : null}
        </WrapperFooter>
      ) : <WrapperFooter><WrapperButton><ButtonWhite press={onPressBW} content="Volver" /></WrapperButton></WrapperFooter>}
    </MainWrapper>
  );
}
CardMapBeginTravel.propTypes = {
  company: PropTypes.string.isRequired,
  normalText: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  extra: PropTypes.string.isRequired,
  onPressBW: PropTypes.func.isRequired,
  onPressBG: PropTypes.func.isRequired,
  onPressQA: PropTypes.func.isRequired,
  mainButton: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
  vehicle: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  packing: PropTypes.string.isRequired,
  loadWeight: PropTypes.string.isRequired,
  loadVolume: PropTypes.string.isRequired,
  button: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default CardMapBeginTravel;
