import React, { Component } from 'react';
import MapView from 'react-native-maps';
import {
  MainWrapper, NormalText, WrapperSwipeable, WrapperContent,
} from './style';
import SwipeableHome from '../../components/SwipeableHome';
import CardInfoStad from '../../components/CardInfoStad';

export default class Home extends Component {
  constructor() {
    super();
  }

  componentDidMount() {

  }

  render() {
    return (
      <MainWrapper>
        <MapView
          initialRegion={{
            latitude: 4.624335,
            longitude: -74.063644,
            latitudeDelta: 0.10,
            longitudeDelta: 0.10,
          }}
          showsUserLocation
          followsUserLocation
          showsIndoorLevelPicker
          style={{ height: '100%', width: '100%' }}
        />
        <WrapperContent>
          <CardInfoStad valuePoint="12000" textKm="Kms recorridos" valueKm="12000" textPoint="1222" title="¡Hola Ernesto!" />
          <NormalText>Buscar viajes disponibles</NormalText>
          <WrapperSwipeable>
            <SwipeableHome text="Cerca a tí" />
            <SwipeableHome text="Todos" />
            <SwipeableHome text="Filtros específicos" />
          </WrapperSwipeable>
        </WrapperContent>
      </MainWrapper>
    );
  }
}
