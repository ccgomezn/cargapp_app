/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
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
  WrapperButtonGradient,
} from '../style';

class Registration extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    return (
      <MainWrapper>
        <WrapperButtons style={{ justifyContent: 'center', marginTop: '0%', marginBottom: '2%' }}>
          <ArrowBack url={() => goBack()} />
          <SvgUri source={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/logo3x.png' }} />
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
          <WrapperButtonGradient>
            {/* eslint-disable-next-line react/prop-types */}
            <ButtonGradient content="Continuar" press={() => navigate('Personal')} />
          </WrapperButtonGradient>
        </WrapperButtonsBottom>
        <TextTerms>© Todos los derechos reservados. Cargapp 2019</TextTerms>
      </MainWrapper>
    );
  }
}

export default Registration;
