import React, { Component } from 'react';
import { View } from 'native-base';
import { ScrollView } from 'react-native';
import {
  MainWrapper, ContentView, TextBlack, ContentBlock,
  ContentFilter, ContentOffer,
} from './style';
import WhiteCardTravels from '../../components/WhiteCardTravels';
import ButtonLink from '../../components/ButtonLink';
import IconService from '../../components/IconService';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <MainWrapper>
        <ContentView style={{ flexDirection: 'row', paddingLeft: 0, paddingTop: 5 }}>
          <View style={{ }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <IconService
                // eslint-disable-next-line global-require
                icon={require('../../icons/oval3x.png')}
                text="Premios"
              />
              <IconService
                // eslint-disable-next-line global-require
                icon={require('../../icons/oval3x.png')}
                text="Lubricantes"
              />
              <IconService
                // eslint-disable-next-line global-require
                icon={require('../../icons/oval3x.png')}
                text="Combustible"
              />
              <IconService
                // eslint-disable-next-line global-require
                icon={require('../../icons/oval3x.png')}
                text="SOAT"
              />
              <IconService
                // eslint-disable-next-line global-require
                icon={require('../../icons/oval3x.png')}
                text="Otros"
              />
            </ScrollView>
          </View>
        </ContentView>

        <ContentView>
          <View style={{ padding: '20%', backgroundColor: 'gray' }}>
            <TextBlack>{'\n'}</TextBlack>
          </View>
        </ContentView>

        <ContentView subcontent>
          <ContentBlock>
            <TextBlack>Viajes</TextBlack>
            <ContentFilter>
              <ButtonLink
                text="Filtrar viajes disponibles"
                icon
              />
            </ContentFilter>
          </ContentBlock>
        </ContentView>

        <ContentOffer subcontent>
          <WhiteCardTravels
            from="Bogota"
            to="Medellin"
            vehicle="Tractomula"
            pay="2.300.000"
            date="hoy"
            actionbtnPrimary=""
            btnPrimary="Aplicar"
            btnSecondary
          />

          <WhiteCardTravels
            from="Buenaventura"
            to="Bogotá D.C"
            vehicle="Tractomula"
            pay="2.300.000"
            date="hoy"
            actionbtnPrimary=""
            btnPrimary="Ver detalle"
          />

          <WhiteCardTravels
            from="Bogota"
            to="Medellin"
            vehicle="Tractomula"
            pay="2.300.000"
            date="hoy"
            actionbtnPrimary=""
            btnPrimary="Aplicar"
            btnSecondary
          />

        </ContentOffer>

      </MainWrapper>
    );
  }
}
