/* eslint-disable no-else-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
  MainWrapper, ContentView, TextBlack, ContentBlock,
} from './style';

// import ButtonGradient from '../../components/ButtonGradient';

class DocumentAccount extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {

  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <MainWrapper>
        <ContentView>
          <ContentBlock>
            <TextBlack>Documentos</TextBlack>
          </ContentBlock>
        </ContentView>

      </MainWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const { user } = state;
  return {
    user,
  };
};

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DocumentAccount);
