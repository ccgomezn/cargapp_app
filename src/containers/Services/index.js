/* eslint-disable global-require */
/* eslint-disable no-else-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
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
              icon="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/IconService_Combustibles.png"
              text="Combustible"
              press={() => navigate('CommerceCoupons', { idCategory: 'Combustible' })}
            />
            <IconService
              icon="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/IconService_Lubricantes.png"
              text="Lubricantes"
              press={() => navigate('CommerceCoupons', { idCategory: 'Lubricantes' })}
            />
            <IconService
              icon="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/IconService_Soat.png"
              text="SOAT"
              press={() => navigate('CommerceCoupons', { idCategory: 'Soat' })}
            />
            <IconService
              icon="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/IconService_Asistencia.png"
              text="Asistencia"
              press={() => navigate('CommerceCoupons', { idCategory: 'Asistencia' })}
            />
            <IconService
              icon="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/IconService_Hospedaje.png"
              text="Hospedaje"
              press={() => navigate('CommerceCoupons', { idCategory: 'Hospedaje' })}
            />
            <IconService
              icon="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/IconService_Alimentacion.png"
              text="Alimentación"
              press={() => navigate('CommerceCoupons', { idCategory: 'Alimentación' })}
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
