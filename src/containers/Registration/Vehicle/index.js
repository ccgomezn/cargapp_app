import React, { Component } from 'react';
import Input from '../../../components/GeneralInput';
import ButtonGradient from '../../../components/ButtonGradient';
import ArrowBack from '../../../components/ArrowBack';
import {
  MainWrapper,
  TextBlack,
  TextBlue,
  TextGray,
  SvgUri,
  WrapperInputs,
  WrapperButtonsBottom,
  TextTerms,
  WrapperButtons,
} from '../style';

class Registration extends Component {
  constructor() {
    super();
    this.state = {};
  }
  /* eslint-disable global-require */

  render() {
    // eslint-disable-next-line react/prop-types
    const { navigation } = this.props;
    return (
      <MainWrapper>
        <WrapperButtons>
          {/* eslint-disable-next-line react/prop-types */}
          <ArrowBack url={() => navigation.navigate('SignUp')} />
          <SvgUri source={require('../../../Images/Logo3x.png')} />
        </WrapperButtons>
        <TextBlack>
                    Registro de
          <TextBlue>
            {' '}
                        vehículo
          </TextBlue>
        </TextBlack>
        <TextGray>
            Bienvenido a Cargapp, necesitamos la siguiente información de su camión
            para continual el registro
        </TextGray>
        <WrapperInputs>
          <Input title="Placa del vehículo" />
          <Input title="Dato 1" />
          <Input title="Dato 2" />
        </WrapperInputs>
        <WrapperButtonsBottom>
          <ButtonGradient content="Continuar" />
        </WrapperButtonsBottom>
        <TextTerms>© Todos los derechos reservados. Cargapp 2019</TextTerms>
      </MainWrapper>
    );
  }
}

export default Registration;
