import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { EmptyWrapper, MainWrapper } from './style';

export default class Spinner extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { view } = this.props;
    if (view) {
      return (
        <MainWrapper>
          <ActivityIndicator
            style={{ alignSelf: 'center', height: '100%' }}
            size="large"
            color="#0000ff"
          />
        </MainWrapper>
      );
    }
    return (
      <EmptyWrapper />
    );
  }
}

Spinner.propTypes = {
  view: PropTypes.bool.isRequired,
};
