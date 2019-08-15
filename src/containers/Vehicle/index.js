import React, { Component } from 'react';

import {
  MainWrapper, ContentView, TextBlack, ContentBlock,
} from './style';

export default class Vehicle extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <MainWrapper>

        <ContentView subcontent>
          <ContentBlock>
            <TextBlack>Mi vehículo</TextBlack>
          </ContentBlock>
        </ContentView>

      </MainWrapper>
    );
  }
}
