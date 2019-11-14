import React, { Component } from 'react';
import Card from '../../../components/ComponentCard';
import ArrowBack from '../../../components/ArrowBack';
import {
  MainWrapper,
  TextBlack,
  TextBlue,
  TextGray,
  SvgUri,
  TextTerms,
  WrapperButtons,
  WrapperButtonsBottom,
  WrapperButtonGradient,
  WrapperDocument,
  RowDocument,
} from '../style';
import ButtonGradient from '../../../components/ButtonGradient';
import PopUpDialog from '../../../components/PopUpDialog';

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
    };
  }

  /* eslint-disable global-require */
  onPressButtonPopup() {
    this.setState({ alertVisible: false });
  }

  onPressButtonDoc() {
    this.setState({ alertVisible: true });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { navigation } = this.props;
    const { alertVisible } = this.state;
    return (
      <MainWrapper contentContainerStyle={{ flex: 1 }}>
        <WrapperButtons style={{ justifyContent: 'center', marginVertical: 0, marginBottom: '3%' }}>
          {/* eslint-disable-next-line react/prop-types */}
          <ArrowBack url={() => navigation.goBack()} />
          <SvgUri source={require('../../../Images/Logo3x.png')} />
        </WrapperButtons>
        <TextBlack>
                    Documentos para
          <TextBlue>
            {' '}
                        vinculación
          </TextBlue>
        </TextBlack>
        <TextGray>
                    Este es el último paso, para terminar su registro necesitamos...
        </TextGray>
        <WrapperDocument>
          <RowDocument>
            <Card
              logo="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/document.svg"
              background="white"
              mainText="Agregar tarjeta de propiedad"
              icon={false}
              colorText="black"
              borderColorProp="#ecf0f1"
              press={() => this.onPressButtonDoc()}
            />
          </RowDocument>
          <RowDocument>
            <Card
              logo="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/document.svg"
              background="white"
              mainText="Agregar Cedúla"
              icon={false}
              colorText="black"
              borderColorProp="#ecf0f1"
              press={() => this.onPressButtonDoc()}
            />
          </RowDocument>
        </WrapperDocument>
        <WrapperButtonsBottom>
          <WrapperButtonGradient>
            {/* eslint-disable-next-line react/prop-types */}
            <ButtonGradient content="Continuar" press={() => navigation.navigate('ScreenHome')} />
          </WrapperButtonGradient>
        </WrapperButtonsBottom>
        <TextTerms>© Todos los derechos reservados. Cargapp 2019</TextTerms>
        <PopUpDialog
          visible={alertVisible}
          textBlack="Se subió con éxito su tarjeta de propiedad."
          textButton="Entendido"
          onTouchOutside={() => this.onPressButtonPopup()}
          pressButton={() => this.onPressButtonPopup()}
        />
      </MainWrapper>
    );
  }
}

export default Registration;
