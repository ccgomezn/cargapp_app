/* eslint-disable global-require */
import React, { Component } from 'react';
import { Image } from 'react-native';
import { View, Text } from 'native-base';
import {
  MainWrapper, ContentView, TextBlack, TextGray,
  Section, PointRet,
} from './style';
import CardinfoStad from '../../components/CardInfoStad';

export default class Points extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <MainWrapper>

        <ContentView>
          <CardinfoStad
            title="Hola BJ"
            valueKm="15.999"
            textKm="Kms recorridos"
            valuePoint="120"
            textPoint="Puntos Acumulados"
          />
        </ContentView>

        <ContentView>
          <View style={{
            flex: 1,
            height: 'auto',
            backgroundColor: '',
            flexDirection: 'row',
            paddingVertical: 2,
            alignSelf: 'center',
            justifyContent: 'space-between',
          }}
          >
            <Section>
              <TextGray>Premios</TextGray>
            </Section>
            <Section style={{ backgroundColor: '#8a8c9d', alignContent: 'center' }}>
              <TextGray style={{ color: 'white', textAlign: 'center' }}>Mis retos</TextGray>
            </Section>
            <Section>
              <TextGray>Ranking</TextGray>
            </Section>
          </View>
        </ContentView>

        <ContentView>
          <View style={{ flexDirection: 'column', width: '100%' }}>
            <View style={{
              flex: 1,
              height: 'auto',
              borderRadius: 8,
              backgroundColor: 'white',
              flexDirection: 'column',
              paddingVertical: 10,
              paddingHorizontal: 20,
              marginBottom: 10,
              shadowColor: '#589b9b9b',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 3,
            }}
            >
              <TextBlack>Nombre del Reto</TextBlack>
              <TextGray>Descripción</TextGray>
              <View style={{ marginTop: 5, display: 'flex', alignContent: 'flex-end' }}>
                <Text style={{ fontSize: 10, alignContent: 'center', textAlign: 'right' }}>20%</Text>
              </View>
              <View style={{ marginTop: 2, display: 'flex', backgroundColor: 'gray', borderRadius: 4, height: 6 }}>
                <View style={{ width: '25%', backgroundColor: '#d200b9', height: 6, borderRadius: 4 }} />
              </View>
              <PointRet>
                <Text style={{ fontSize: 10, color: '#010935', letterSpacing: 0 }}>
                  300 puntos
                </Text>
              </PointRet>
            </View>
            <View style={{
              flex: 1,
              height: 'auto',
              borderRadius: 8,
              backgroundColor: 'white',
              flexDirection: 'column',
              paddingVertical: 10,
              paddingHorizontal: 20,
              alignContent: 'center',
            }}
            >
              <TextBlack>Nombre del Reto</TextBlack>
              <TextGray>Descripción</TextGray>
              <View style={{ marginTop: 5, display: 'flex', alignContent: 'flex-end' }}>
                <Text style={{ fontSize: 10, alignContent: 'center', textAlign: 'right' }}>70%</Text>
              </View>
              <View style={{ marginTop: 2, display: 'flex', backgroundColor: 'gray', borderRadius: 4, height: 6 }}>
                <View style={{ width: '75%', backgroundColor: '#d200b9', height: 6, borderRadius: 4 }} />
              </View>
            </View>
          </View>
        </ContentView>

      </MainWrapper>
    );
  }
}
