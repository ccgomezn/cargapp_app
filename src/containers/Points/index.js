import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

import {
// MainWrapper, ContentView, TextBlack, ContentBlock,
} from './style';

export default class Points extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <WebView
        source={{ uri: 'https://previews.customer.envatousercontent.com/files/257305718/index.html' }}
        style={{ marginTop: 0, height: '100%', with: '100%' }}
      />
    );
  }
}
