/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import {
  MainWrapper, ContentView, TextBlack, ContentBlock,
  WrapperButtonsBottom, WrapperButtonGradient,
} from './style';

import ButtonGradient from '../../components/ButtonGradient';
import CardVehicle from '../../components/CardVehicle';
import VehicleActions from '../../redux/reducers/VehicleRedux';
import PopUpDialog from '../../components/PopUpDialog';

class ListVehicles extends Component {
  constructor() {
    super();
    this.state = {
      modalVeh: false,
    };
  }

  componentDidMount() {
    const { getListVehicles } = this.props;
    getListVehicles();
  }


  onViewDetail(data) {
    const { navigate } = this.props.navigation;
    navigate('DetailVehicle', { dataVehicle: data });
  }

  onValidate() {
    const { navigate } = this.props.navigation;
    const { vehicles } = this.props;
    const items = vehicles.list.length;
    if (items > 3) {
      // mostrar msj
      this.setState({ modalVeh: true });
    } else {
      navigate('DetailVehicle');
    }
  }

  closeModal() {
    this.setState({ modalVeh: false });
  }

  render() {
    const { vehicles } = this.props;
    const { modalVeh } = this.state;

    if (vehicles.status && !vehicles.fetching) {
      return (
        <MainWrapper>
          <ContentView>
            <ContentBlock>
              <TextBlack>Mis Vehículos</TextBlack>
            </ContentBlock>
          </ContentView>

          <ContentView style={{ flexDirection: 'column' }}>
            { vehicles.list.map(data => (
              <CardVehicle
                data={data}
                press={() => this.onViewDetail(data)}
              />
            ))}
          </ContentView>

          <WrapperButtonsBottom>
            <WrapperButtonGradient>
              <ButtonGradient
                content="Añadir Vehículo"
                press={() => this.onValidate()}
              />
            </WrapperButtonGradient>
          </WrapperButtonsBottom>
          <PopUpDialog
            textBlack="Advertencia"
            textGray="Ya haz registrado mas de (3) vehículos."
            visible={modalVeh}
            textButton="Entendido"
            onTouchOutside={() => this.closeModal()}
            pressButton={() => this.closeModal()}
          />
        </MainWrapper>
      );
    // eslint-disable-next-line no-else-return
    } else {
      return (
        <ActivityIndicator
          style={{ alignSelf: 'center', height: '100%' }}
          size="large"
          color="#0000ff"
        />
      );
    }
  }
}

const mapStateToProps = (state) => {
  const { user, vehicles } = state;
  return {
    user,
    vehicles,
  };
};

const mapDispatchToProps = dispatch => ({
  getListVehicles: params => dispatch(VehicleActions.getMeVehiclesRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListVehicles);
