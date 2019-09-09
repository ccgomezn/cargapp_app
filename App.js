/**
 * APP.js React Native CargAPp
 * https://github.com/cargappco/cargapp_app
 *
 */

import React from 'react';
import { Text } from 'react-native';
import Navigator from './src/navigation';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Navigator />
    );
  }
}

export default App;
