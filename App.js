/**
 * APP.js React Native CargAPp
 * https://github.com/cargappco/cargapp_app
 *
 */

import React, { Fragment } from 'react';
import Navigator from './src/navigation';

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Navigator />
      </Fragment>
    );
  }
}

export default App;
