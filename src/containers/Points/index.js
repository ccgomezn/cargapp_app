import React, { Component } from 'react';

import {
  MainWrapper, ContentView, TextBlack, ContentBlock,
} from './style';

export default class Points extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <MainWrapper>
        <ContentView>
          <ContentBlock>
            <TextBlack>Retos</TextBlack>
          </ContentBlock>
        </ContentView>
      </MainWrapper>
    );
  }
}
