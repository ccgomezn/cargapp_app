/**
 * APP.js React Native CargAPp
 * https://github.com/cargappco/cargapp_app
 *
 */

import React, { Fragment } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
          >
            <View>
              <View>
                <Text>CargApp</Text>
                <Text>
                      Edit
                  {' '}
                  <Text>App.js</Text>
                  {' '}
                      Init Proyect
                </Text>
              </View>

            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

export default App;
