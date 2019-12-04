/* eslint-disable global-require */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'native-base';
import { ActivityIndicator } from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import {
  MainWrapper, ContentView, ContentSection, CardItems,
  WrapperTab, SegmentTab, TitleTab, ActiveTitleText,
  ActiveButtonTab, FirstTab, LastTab,
} from './style';

import CardinfoStad from '../../components/CardInfoStad';
import CardChallenge from '../../components/CardChallenge';
import CardRanking from '../../components/CardRanking';
import CardAward from '../../components/CardAward';

import ChallengeActions from '../../redux/reducers/ChallengeRedux';

class Points extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      reload: false,
    };
  }

  componentDidMount() {
    const { getActiveChallenge } = this.props;
    // get challenge
    getActiveChallenge();
  }

  handleSingleIndexSelect = (index) => {
    const { getActiveChallenge } = this.props;
    // handle tab selection for single Tab Selection SegmentedControlTab
    this.setState(prevState => ({ ...prevState, selectedIndex: index, reload: true }));
    console.log(index);
    if (index == 1) {
      // get challenge
      getActiveChallenge();
    }
    
  };

  render() {
    const { selectedIndex, reload } = this.state;
    const { challenge } = this.props;

    if (reload) {
      setTimeout(() => this.setState({
        reload: false,
      }), 2000); // test
    }

    return (
      <MainWrapper>
        <CardinfoStad
          title="¡Hola BJ!"
          valueKm="15.999"
          textKm="Kms recorridos"
          valuePoint="120"
          textPoint="Puntos Acumulados"
        />

        <SegmentedControlTab
          values={['Premios', 'Mis Retos', 'Ranking']}
          selectedIndex={selectedIndex}
          onTabPress={this.handleSingleIndexSelect}
          tabsContainerStyle={[WrapperTab]}
          tabStyle={[SegmentTab]}
          tabTextStyle={[TitleTab]}
          activeTabTextStyle={[ActiveTitleText]}
          activeTabStyle={[ActiveButtonTab]}
          firstTabStyle={[FirstTab]}
          lastTabStyle={[LastTab]}
        />

        {selectedIndex === 0 && (
          reload ? (
            <ContentView>
              <ActivityIndicator
                style={{ alignSelf: 'center', height: 'auto' }}
                size="large"
                color="#0000ff"
              />
            </ContentView>
          ) : (
            <ContentSection style={{ flexWrap: 'wrap' }}>
              <CardAward
                desc="Descripción del premio conductor 1"
                point={350}
              />
              <CardAward
                desc="Descripción del premio conductor 2"
                point={350}
              />
              <CardAward
                desc="Descripción del premio conductor 3"
                point={350}
              />
            </ContentSection>
          ))}

        {selectedIndex === 1 && (
          challenge.activeChallenge === null ? (
            <ContentView>
              <ActivityIndicator
                style={{ alignSelf: 'center', height: 'auto' }}
                size="large"
                color="#0000ff"
              />
            </ContentView>
          ) : (
            <CardItems>
              { challenge.activeChallenge.map(data =>(
                <CardChallenge
                  title={data.name}
                  desc={data.body}
                  point={data.point}
                  percentage={33}
                />
              ))}
              <CardChallenge
                title="Compartir App"
                desc="Descripción breve"
                point={400}
                percentage={0}
              />
              <CardChallenge
                title="Recorrer 100KM"
                desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
                point={200}
                percentage={100}
              />
            </CardItems>
          ))}

        {selectedIndex === 2 && (
          reload ? (
            <ContentView>
              <ActivityIndicator
                style={{ alignSelf: 'center', height: 'auto' }}
                size="large"
                color="#0000ff"
              />
            </ContentView>
          ) : (
            <View>
              <CardRanking
                title="Conductor 1"
                textKM={20.00}
                textPoint={140}
                position={1}
              />
              <CardRanking
                title="Conductor 2"
                textKM={20.00}
                textPoint={140}
                position={2}
              />
              <CardRanking
                title="Conductor 3"
                textKM={20.00}
                textPoint={140}
                position={3}
              />
            </View>
          ))}

      </MainWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const { challenge } = state;
  return {
    challenge,
  };
};

const mapDispatchToProps = dispatch => ({
  getActiveChallenge: params => dispatch(ChallengeActions.getActiveChallengeRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Points);
