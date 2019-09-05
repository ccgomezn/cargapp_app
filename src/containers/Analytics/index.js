import React, { Component } from 'react';

import {
  MainWrapper, ContentView, TextBlack, ContentBlock, ContentForm, RowContent,
} from './style';
import CardSquareInfo from '../../components/CardSquareInfo';

import CardInformationProfile from '../../components/CardInformationProfile';

export default class Analytics extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <MainWrapper>
        <ContentView>
          <ContentBlock>
            <TextBlack>Estadísticas</TextBlack>
          </ContentBlock>
        </ContentView>

        <ContentView>
          <ContentForm>
            <CardInformationProfile
              mainText="285"
              subText="Andres Rodriguez"
              description="Esta es su calificación actual. Ha realizado un total de 285 viajes."
            />
          </ContentForm>
        </ContentView>

        <ContentView>
          <RowContent style={{ marginRight: '2%' }}>
            <CardSquareInfo
              value="1.233"
              description="Viajes Realizados"
              // eslint-disable-next-line global-require
              icon={require('../../icons/check-gradient.png')}
            />
          </RowContent>
          <RowContent>
            <CardSquareInfo
              value="2.500"
              description="KM recorridos"
              // eslint-disable-next-line global-require
              icon={require('../../icons/map-gradient.png')}
            />
          </RowContent>
        </ContentView>

        <ContentView>
          <RowContent style={{ marginRight: '2%', width: '100%' }}>
            <CardSquareInfo
              value="3.555"
              description="Puntos obtenidos"
            />
          </RowContent>
        </ContentView>

        <ContentView>
          <RowContent style={{ marginRight: '2%' }}>
            <CardSquareInfo
              value="19"
              description="Retos completados"
            />
          </RowContent>
          <RowContent>
            <CardSquareInfo
              value="9,5/10"
              description="Calificación"
            />
          </RowContent>
        </ContentView>

      </MainWrapper>
    );
  }
}
