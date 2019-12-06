import React, { Component } from 'react';
import MapView from 'react-native-maps';
import MainWrapper from './style';
import CardHome from '../../components/CardHome';

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
        <CardHome points={500} km={1222} name="¡Hola Ernesto!" />
      </MainWrapper>
    );
  }
}
