/* eslint-disable global-require */
import React, { Component } from 'react';
import { View, Text } from 'native-base';
import { Image } from 'react-native';
import {
  MainWrapper, ContentView, TextGray, ContentSection, CardItems,
} from './style';
import CardinfoStad from '../../components/CardInfoStad';
import ButtonSection from '../../components/ButtonSection';
import CardChallenge from '../../components/CardChallenge';
import CardRanking from '../../components/CardRanking';

export default class Points extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <MainWrapper>
        <CardinfoStad
          title="¡Hola BJ!"
          valueKm="15.999"
          textKm="Kms recorridos"
          valuePoint="120"
          textPoint="Puntos Acumulados"
        />

        <ContentView style={{ marginTop: '5%' }}>
          <ContentSection>
            <ButtonSection
              title="Premios"
            />
            <ButtonSection
              title="Mis Retos"
              status
            />
            <ButtonSection
              title="Ranking"
            />
          </ContentSection>
        </ContentView>

        <CardItems>
          <CardChallenge
            title="Compartir App"
            desc="Descripción breve"
            point={400}
            percentage={30}
          />
          <CardChallenge
            title="Recorrer 100KM"
            desc="Descripción breve"
            point={200}
            percentage={70}
          />
          <CardChallenge
            title="Realizar 10 viajes"
            desc="Descripción breve"
            point={1200}
            percentage={100}
          />
        </CardItems>

        <View>
          <CardRanking
            title="Conductor 1"
            textKM={20.00}
            textPoint={140}
            position={1}
          />
          <CardRanking
            title="Conductor 2"
            textKM={20.00}
            textPoint={140}
            position={1}
          />
          <CardRanking
            title="Conductor 3"
            textKM={20.00}
            textPoint={140}
            position={1}
          />
        </View>

      </MainWrapper>
    );
  }
}
