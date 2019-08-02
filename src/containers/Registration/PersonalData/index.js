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
  WrapperButtonGradient,
  TextTerms,
  WrapperButtons,
  WrapperButtonsBottom,
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
        <WrapperButtons style={{ justifyContent: 'center', marginVertical: 0, marginBottom: '3%' }}>
          {/* eslint-disable-next-line react/prop-types */}
          <ArrowBack url={() => navigation.goBack()} />
          <SvgUri source={require('../../../Images/Logo3x.png')} />
        </WrapperButtons>
        <TextBlack>
                    Datos
          <TextBlue>
            {' '}
                        personales
          </TextBlue>
        </TextBlack>
        <TextGray>
                    Excelente! su camión es perfecto, ahora queremos conocer un poco más de usted
        </TextGray>
        <WrapperInputs>
          <Input title="Número de cédula" />
          <Input title="Dato 1" />
          <Input title="Dato 2" />
          <Input title="Dato 2" />
        </WrapperInputs>
        <WrapperButtonsBottom>
          <WrapperButtonGradient>
            {/* eslint-disable-next-line react/prop-types */}
            <ButtonGradient content="Continuar" press={() => navigation.navigate('documents')} />
          </WrapperButtonGradient>
        </WrapperButtonsBottom>
        <TextTerms>© Todos los derechos reservados. Cargapp 2019</TextTerms>
      </MainWrapper>
    );
  }
}

export default Registration;
