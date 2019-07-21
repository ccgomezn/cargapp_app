import React, { Component } from 'react';
import Input from '../../components/GeneralInput';
import ButtonWhite from '../../components/ButtonWhite';
import ButtonGradient from '../../components/ButtonGradient';
import {
  MainWrapper,
  TextBlack,
  TextBlue,
  TextGray,
  SvgUri,
  WrapperButtons,
  WrapperButton,
  ButtonText,
  ButtonSubText,
  containerPress,
  TextPress,
  Svg,
  Check,
  WrapperInputs,
  WrapperButtonsBottom,
  TextTerms,
} from './style';

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      pressState: true,
      pressStateTwo: false,
    };
  }
  /* eslint-disable global-require */

  render() {
    const handlePressButton = () => {
      const { pressState, pressStateTwo } = this.state;
      if (pressStateTwo) {
        this.setState({ pressStateTwo: !pressStateTwo });
        this.setState({ pressState: !pressState });
      }
    };
    const handlePressButtonTwo = () => {
      const { pressState, pressStateTwo } = this.state;
      if (pressState) {
        this.setState({ pressState: !pressState });
        this.setState({ pressStateTwo: !pressStateTwo });
      }
    };
    const { pressState, pressStateTwo } = this.state;
    // eslint-disable-next-line react/destructuring-assignment,react/prop-types
    const { navigate } = this.props.navigation;
    return (
      <MainWrapper>
        <SvgUri source={require('../../Images/Logo3x.png')} />
        <TextBlack>
            Bienvenido al
          <TextBlue>
            {' '}
            Futuro
          </TextBlue>
        </TextBlack>
        <TextGray>El mejor aliado para su operación</TextGray>
        <WrapperButtons>
          <WrapperButton
            onPress={handlePressButton}
            style={pressState ? containerPress : null}
          >
            {pressState && <Check source={require('../../Images/Check.png')} />}
            <Svg source={require('../../Images/group-2.svg')} />
            <ButtonText
              style={pressState ? TextPress : null}
            >
              Conductor
            </ButtonText>
            <ButtonSubText
              style={pressState ? TextPress : null}
            >
              Más trabajo más ingresos
            </ButtonSubText>
          </WrapperButton>
          <WrapperButton
            onPress={handlePressButtonTwo}
            style={pressStateTwo ? containerPress : null}
          >
            {pressStateTwo && <Check source={require('../../Images/Check.png')} />}
            <Svg source={require('../../Images/group-3.svg')} />
            <ButtonText
              style={pressStateTwo ? TextPress : null}
            >
              Conductor
            </ButtonText>
            <ButtonSubText
              style={pressStateTwo ? TextPress : null}
            >
              Más trabajo más ingresos
            </ButtonSubText>
          </WrapperButton>
        </WrapperButtons>
        <WrapperInputs>
          <Input title="Nombre" />
          <Input title="Correo electrónico" />
          <Input title="Contraseña" />
        </WrapperInputs>
        <WrapperButtonsBottom>
          {/* eslint-disable-next-line react/prop-types */}
          <ButtonWhite press={() => navigate('')} content="Iniciar sesión" />
          <ButtonGradient press={() => navigate('Vehicle')} content="Registrarse" />
        </WrapperButtonsBottom>
        <TextTerms>© Todos los derechos reservados. Cargapp 2019</TextTerms>
      </MainWrapper>
    );
  }
}

export default Registration;
