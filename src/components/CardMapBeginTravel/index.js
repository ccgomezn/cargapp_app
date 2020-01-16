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
  company, normalText, amount, delivery, extra,
  onPressBW, onPressBG, mainButton, onPressQA,
  status,
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
        <TouchableQualification onPress={onPressQA}>
          <BlueText>
            Ver calificación
          </BlueText>
        </TouchableQualification>
      </WrapperHeader>
      <Line />
      <WrapperBody>
        <WrapperColumn>
          <WrapperInfoBody>
            <BoldText>Valor del flete</BoldText>
            <NormalText>{amount}</NormalText>
          </WrapperInfoBody>
          <WrapperInfoBody>
            <BoldText>Descripción</BoldText>
            <NormalText>{delivery}</NormalText>
          </WrapperInfoBody>
        </WrapperColumn>
        <WrapperColumn>
          <WrapperInfoBody>
            <BoldText>Dato extra</BoldText>
            <NormalText>{extra}</NormalText>
          </WrapperInfoBody>
        </WrapperColumn>
      </WrapperBody>
      { status !== 11 ? (
        <WrapperFooter>
          <WrapperButton>
            <ButtonWhite press={onPressBW} content="Volver" />
          </WrapperButton>
          <WrapperButton>
            <ButtonGradient press={onPressBG} content={mainButton} />
          </WrapperButton>
        </WrapperFooter>
      ) : <WrapperFooter><WrapperButton><ButtonWhite press={onPressBW} content="Volver" /></WrapperButton></WrapperFooter>}
    </MainWrapper>
  );
}
CardMapBeginTravel.propTypes = {
  company: PropTypes.string.isRequired,
  normalText: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  delivery: PropTypes.string.isRequired,
  extra: PropTypes.string.isRequired,
  onPressBW: PropTypes.func.isRequired,
  onPressBG: PropTypes.func.isRequired,
  onPressQA: PropTypes.func.isRequired,
  mainButton: PropTypes.func.isRequired,
  status: PropTypes.number.isRequired,
};

export default CardMapBeginTravel;
