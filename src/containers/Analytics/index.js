import React, { Component } from 'react';
import { View } from 'react-native';

import {
  MainWrapper, ContentView, TextBlack, ContentBlock,
} from './style';

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
            <TextBlack>Estadisticas</TextBlack>
          </ContentBlock>
        </ContentView>

        <ContentView>
          <View style={{ alignContent: 'center', justifyContent: 'center' }}>
            <TextBlack>.</TextBlack>
          </View>
        </ContentView>
      </MainWrapper>
    );
  }
}
