/* eslint-disable global-require */
/* eslint-disable no-else-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
  MainWrapper, ContentView, TextBlack, ContentBlock, ContentServices,
} from './style';
import IconService from '../../components/IconService';

import UserActions from '../../redux/reducers/UserRedux';

class Service extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {

  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <MainWrapper>
        <ContentView>
          <ContentBlock>
            <TextBlack>Nuestros Servicios</TextBlack>
          </ContentBlock>
        </ContentView>

        <ContentView style={{ flexDirection: 'column' }}>
          <ContentServices>
            <IconService
              // icon="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-premios.svg"
              icon={require('../../icons/IconService_Combustibles.png')}
              text="Combustible"
            />
            <IconService
              // icon="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-lubricant.svg"
              icon={require('../../icons/IconService_Lubricantes.png')}
              text="Lubricantes"
            />
            <IconService
              // icon="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-soat.svg"
              icon={require('../../icons/IconService_Soat.png')}
              text="SOAT"
            />
            <IconService
              // icon="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-premios.svg"
              icon={require('../../icons/IconService_Asistencia.png')}
              text="Asistencia"
            />
            <IconService
              // icon="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-soat.svg"
              icon={require('../../icons/IconService_Hospedaje.png')}
              text="Hospedaje"
            />
            <IconService
              // icon="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-premios.svg"
              icon={require('../../icons/IconService_Alimentacion.png')}
              text="Alimentación"
            />
          </ContentServices>
        </ContentView>
      </MainWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user,
  };
};

const mapDispatchToProps = dispatch => ({
  onUserLogout: params => dispatch(UserActions.onUserLogout(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Service);
