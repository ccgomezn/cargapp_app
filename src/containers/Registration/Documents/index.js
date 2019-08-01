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
      <MainWrapper contentContainerStyle={{ flex: 1 }}>
        <WrapperButtons style={{ justifyContent: 'center', marginVertical: 0, marginBottom: '3%' }}>
          {/* eslint-disable-next-line react/prop-types */}
          <ArrowBack url={() => navigation.goBack()} />
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
                    Este es el último paso, para terminar su registro necesitamos...
        </TextGray>
        <Card
          logo="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/document.svg"
          background="white"
          mainText="Agregar tarjeta de propiedad"
          icon={false}
          colorText="black"
          borderColorProp="lightGray"
        />
        <TextTerms>© Todos los derechos reservados. Cargapp 2019</TextTerms>
      </MainWrapper>
    );
  }
}

export default Registration;
