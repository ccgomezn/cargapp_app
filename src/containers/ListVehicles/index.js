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

class ListVehicles extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { getListVehicles } = this.props;
    getListVehicles();
  }

  render() {
    const { vehicles } = this.props;
    const { navigate } = this.props.navigation;

    console.log(vehicles);

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
              />
            ))}
          </ContentView>

          <WrapperButtonsBottom>
            <WrapperButtonGradient>
              <ButtonGradient content="Añadir Vehículo" press={() => navigate('DetailVehicle')} />
            </WrapperButtonGradient>
          </WrapperButtonsBottom>

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
