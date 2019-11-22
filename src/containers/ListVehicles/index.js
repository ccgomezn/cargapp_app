/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';

import {
  MainWrapper, ContentView, TextBlack, ContentBlock,
  WrapperButtonsBottom, WrapperButtonGradient,
} from './style';

import ButtonGradient from '../../components/ButtonGradient';
import CardVehicle from '../../components/CardVehicle';

export default class ListVehicles extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { navigate } = this.props.navigation;

    return (
      <MainWrapper>
        <ContentView>
          <ContentBlock>
            <TextBlack>Mis Vehículos</TextBlack>
          </ContentBlock>
        </ContentView>

        <ContentView style={{ flexDirection: 'column' }}>
          <CardVehicle />
          <CardVehicle />
          <CardVehicle />
          <CardVehicle />
        </ContentView>

        <WrapperButtonsBottom>
          <WrapperButtonGradient>
            <ButtonGradient content="Añadir Vehículo" press={() => navigate('DetailVehicle')} />
          </WrapperButtonGradient>
        </WrapperButtonsBottom>

      </MainWrapper>
    );
  }
}
