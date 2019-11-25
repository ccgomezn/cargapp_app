/**
 * APP.js React Native CargAPp
 * https://github.com/cargappco/cargapp_app
 *
 */

import React from 'react';
import { Text } from 'react-native';
import { connect, Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/lib/integration/react';
import { PersistGate } from 'redux-persist/integration/react';
import BackgroundGeolocation from 'react-native-background-geolocation';

import Navigator from './src/navigation';
import { store, persistor } from './src/redux/store';
import GeolocationActions from './src/redux/reducers/GeolocationRedux';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }




  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
