/* eslint-disable no-else-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toast from 'react-native-tiny-toast';
import {
  MainWrapper, ContentView, TextBlack, ContentBlock, WrapperButtonGradient,
} from './style';

import ButtonGradient from '../../components/ButtonGradient';
import UserActions from '../../redux/reducers/UserRedux';
import CardMapBeginTravel from '../../components/CardMapBeginTravel';

class Config extends Component {
  constructor() {
    super();
    this.state = {
      loadinglogout: false,
    };
  }

  componentDidMount() {

  }

  async onLogout() {
    const { onUserLogout } = this.props;
    this.setState({ loadinglogout: true });
    onUserLogout();
  }

  render() {
    const { loadinglogout } = this.state;
    const { user } = this.props;
    const { navigate } = this.props.navigation;

    console.log(user);
    if (loadinglogout) {
      if (user.isLogged === false) {
        this.setState({ loadinglogout: false });
        setTimeout(() => {
          navigate('LoginEmail');
        }, 150);
      }
    }

    return (
      <MainWrapper>
        <ContentView>
          <ContentBlock>
            <TextBlack>Configuración</TextBlack>
          </ContentBlock>
        </ContentView>

        <ContentView style={{ flexDirection: 'column' }}>
          <WrapperButtonGradient>
            <ButtonGradient
              content="Cerrar Sesión"
              press={() => this.onLogout()}
            />
          </WrapperButtonGradient>

          {/* <CardMapBeginTravel
            company="company"
            amount="00000"
            extra="extra"
            vehicle="vehicle"
            content="content"
            packing="packing"
            loadVolume="volumen"
            loadWeight="weight"
            mainButton="mainButton"
            normalText="normalText"
          /> */}
        </ContentView>
        <Toast
          visible={loadinglogout}
          position={0}
          loading
          shadow
          animation
        >
        Cargando
        </Toast>
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
)(Config);
