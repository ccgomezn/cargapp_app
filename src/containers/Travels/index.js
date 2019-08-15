import React, { Component } from 'react';

import {
  MainWrapper, ContentView, TextBlack, ContentBlock,
} from './style';

export default class Travels extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <MainWrapper>

        <ContentView subcontent>
          <ContentBlock>
            <TextBlack>Viajes</TextBlack>
          </ContentBlock>
        </ContentView>

      </MainWrapper>
    );
  }
}
