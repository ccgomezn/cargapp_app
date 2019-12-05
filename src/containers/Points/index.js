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
import PrizesActions from '../../redux/reducers/PrizesRedux';

class Points extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      reload: false,
      modalChallenge: false,
    };
  }

  componentDidMount() {
    const { getActivePrizes } = this.props;
    // get data
    getActivePrizes();
  }

  OnPressChallenge(data) {
    this.setState({ modalChallenge: true});
    alert(data.name);
  }

  handleSingleIndexSelect = (index) => {
    const { getActiveChallenge, getActivePrizes } = this.props;
    // handle tab selection for single Tab Selection SegmentedControlTab
    this.setState(prevState => ({ ...prevState, selectedIndex: index, reload: true }));
    console.log(index);
    if (index == 0) {
      // get prozes
      getActivePrizes();
    }
    if (index == 1) {
      // get challenge
      getActiveChallenge();
    }
    
  };

  render() {
    const { selectedIndex, reload } = this.state;
    const { challenge ,prizes } = this.props;

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
          prizes.activePrizes === null ? (
            <ContentView>
              <ActivityIndicator
                style={{ alignSelf: 'center', height: 'auto' }}
                size="large"
                color="#0000ff"
              />
            </ContentView>
          ) : (
            <ContentSection style={{ flexWrap: 'wrap' }}>
              { prizes.activePrizes.map(data =>(
                <CardAward
                  desc={data.name}
                  point={data.point}
                  // image={data.media}
                  image="https://image.freepik.com/vector-gratis/concepto-carga-imagen-pagina-destino_52683-22225.jpg"
                />
              ))}
              <CardAward
                desc="Descripción del premio conductor 3"
                point={350}
                status
                
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
                  press={() => this.OnPressChallenge(data)}
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
                textPoint={14.000}
                position={1}
              />
              <CardRanking
                title="Conductor 2"
                textKM={20.00}
                textPoint={14.000}
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
  const { challenge, prizes } = state;
  return {
    challenge,
    prizes,
  };
};

const mapDispatchToProps = dispatch => ({
  getActiveChallenge: params => dispatch(ChallengeActions.getActiveChallengeRequest(params)),
  getActivePrizes: params => dispatch(PrizesActions.getActivePrizesRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Points);
