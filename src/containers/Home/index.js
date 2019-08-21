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
        <ContentView>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <IconService
              // eslint-disable-next-line global-require
              icon={require('../../icons/icon-premios.svg')}
              text="Premios"
            />
            <IconService
              // eslint-disable-next-line global-require
              icon={require('../../icons/icon-lubricant.svg')}
              text="Lubricantes"
            />
            <IconService
              // eslint-disable-next-line global-require
              icon={require('../../icons/icon-premios.svg')}
              text="Combustible"
            />
            <IconService
              // eslint-disable-next-line global-require
              icon={require('../../icons/icon-soat.svg')}
              text="SOAT"
            />
            <IconService
              // eslint-disable-next-line global-require
              icon={require('../../icons/icon-premios.svg')}
              text="Otros"
            />
          </ScrollView>
        </ContentView>

        <ContentView>
          <View style={{ width: '100%', height: 110, backgroundColor: '#0068ff' }}>
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
            date="11/29/2019"
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
