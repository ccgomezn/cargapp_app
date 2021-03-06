/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default-member */
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
  MainWrapperDialog, ContentDialog, WrapperImage,
  WrapperButtonsBottom, TextDesc, TitleDesc, ImageDetail, TextTop,
} from './style';

import {
  WrapperStad, StadLeft, StadRight,
  ViewRow, ViewFlex, IconCircle, ContentStad, TextSubt, TextGray,
} from '../../components/CardInfoStad/style';

import EmptyDialog from '../../components/EmptyDialog';
import CardInfoStad from '../../components/CardInfoStad';
import CardChallenge from '../../components/CardChallenge';
import CardRanking from '../../components/CardRanking';
import CardAward from '../../components/CardAward';
import ButtonGradient from '../../components/ButtonGradient';
import ButtonWhite from '../../components/ButtonWhite';

import ChallengeActions from '../../redux/reducers/ChallengeRedux';
import PrizesActions from '../../redux/reducers/PrizesRedux';
import TopActions from '../../redux/reducers/TopUsersRedux';
import analytics from '@react-native-firebase/analytics';

class Points extends Component {
  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
      reload: false,
      modalChallenge: false,
      activeChallenge: null,
      modalPrizes: false,
      activePrize: null,
      nameUser: '',
      avatarUser: null,
    };
  }

  componentDidMount() {
    analytics().setCurrentScreen('retos');
    const { getActivePrizes, getTopRanking, profile } = this.props;
    // get topRanking
    getTopRanking();
    // get data
    getActivePrizes();
    if (profile.data) {
      this.setState({
        nameUser: profile.data[0].profile.firt_name,
        avatarUser: profile.data[0].profile.avatar, 
      });
    }
  }

  OnPressChallenge(data) {
    this.setState({ modalChallenge: true, activeChallenge: data });
    analytics().setCurrentScreen('retos_como_ganar');
  }

  OnHideModal(e) {
    this.setState({ modalChallenge: false, modalPrizes: false });
    if (e === 'reclamar') {
      analytics().logEvent('boton_reclamar_premio');
    } else if (e === 'entendido') {
      analytics().logEvent('boton_entendido')
    } else if (e === 'cerrar') {
      analytics().logEvent('boton_cancelar_premio')
    }
  }

  OnPressPrizes(data) {
    analytics().setCurrentScreen('premio');
    this.setState({ modalPrizes: true, activePrize: data });
  }

  handleSingleIndexSelect = (index) => {
    const { getActiveChallenge, getActivePrizes, getTopRanking } = this.props;
    // handle tab selection for single Tab Selection SegmentedControlTab
    this.setState(prevState => ({ ...prevState, selectedIndex: index, reload: true }));
    if (index == 0) {
      // get prozes
      getActivePrizes();
      analytics().logEvent(`boton_retos_premios`);
    }
    if (index == 1) {
      // get challenge
      getActiveChallenge();
      analytics().logEvent(`boton_retos_mis_retos`);
    }
    if (index == 2) {
      // get topRanking
      getTopRanking();
      analytics().logEvent(`boton_retos_ranking`);
    }
  };

  render() {
    const {
      selectedIndex, reload, modalChallenge, activeChallenge,
      modalPrizes, activePrize, nameUser, avatarUser,
    } = this.state;
    const { navigation } = this.props;
    const { challenge, prizes, ranking } = this.props;

    if (reload) {
      setTimeout(() => this.setState({
        reload: false,
      }), 2000); // test
    }

    return (
      <MainWrapper>
        {ranking.topme !== null ? (
          <CardInfoStad
            title={nameUser !== '' ? `¡Hola ${nameUser}!` : '¡Hola!'}
            valueKm={ranking.topme.kilometres}
            textKm="Kms recorridos"
            valuePoint={ranking.topme.my_points}
            textPoint="Puntos Acumulados"
            // press={() => navigation.navigate('ScreenStats')}
          />
        ) : (
          <CardInfoStad
            title={nameUser !== '' ? `¡Hola ${nameUser}!` : '¡Hola!'}
            valueKm="-"
            textKm="Kms recorridos"
            valuePoint="-"
            textPoint="Puntos Acumulados"
          />
        )}

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
              { prizes.activePrizes.map(data => (
                <CardAward
                  desc={data.name}
                  point={data.point}
                  image={data.image}
                  press={() => this.OnPressPrizes(data)}
                />
              ))}
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
              { challenge.activeChallenge.map(data => (
                <CardChallenge
                  title={data.name}
                  desc={data.body}
                  point={data.point}
                  percentage={33}
                  press={() => this.OnPressChallenge(data)}
                />
              ))}

            </CardItems>
          ))}

        {selectedIndex === 2 && (
          ranking.toplist === null ? (
            <ContentView>
              <ActivityIndicator
                style={{ alignSelf: 'center', height: 'auto' }}
                size="large"
                color="#0000ff"
              />
            </ContentView>
          ) : (
            <View>
              { ranking.topme !== null ? (
                <CardRanking
                  isMe
                  title={'Mi Posición'}
                  icon={avatarUser}
                  textKM={ranking.topme.kilometres}
                  textPoint={ranking.topme.my_points}
                  position={ranking.topme.position}
                />
              ) : null }
              <TextTop>--- Top ---</TextTop>
              { ranking.toplist.map(data => (
                <CardRanking
                  icon={null}
                  title={data.name}
                  textKM={data.kilometres}
                  textPoint={data.points}
                  position={data.position}
                />
              ))}

            </View>
          ))}

        {/* Modal */}
        <EmptyDialog
          visible={modalPrizes}
          opacity={0.5}
          onTouchOutside={() => this.OnHideModal()}
        >
          <MainWrapperDialog>
            {activePrize !== null ? (
              <ContentDialog>
                <WrapperStad>
                  <StadLeft>
                    <ViewRow>
                      <ViewFlex>
                        <TitleDesc>
                          {activePrize.name}
                        </TitleDesc>
                        <TextSubt>
                          {`Premio ${activePrize.code}`}
                        </TextSubt>
                      </ViewFlex>
                    </ViewRow>
                  </StadLeft>
                  <StadRight>
                    <ViewRow>
                      <ViewFlex>
                        <IconCircle
                          source={require('../../icons/purpleCircle.png')}
                        />
                      </ViewFlex>
                      <ContentStad>
                        <TextGray>
                          {activePrize.point}
                        </TextGray>
                        <TextSubt>
                          {'Puntos requeridos'}
                        </TextSubt>
                      </ContentStad>
                    </ViewRow>
                  </StadRight>
                </WrapperStad>
                <WrapperImage>
                  <TextGray>
                    {activePrize.description}
                  </TextGray>
                  <ImageDetail
                    resizeMode="contain"
                    source={{
                      uri: activePrize.image
                    }}
                  />
                </WrapperImage>
                <TitleDesc>
                  {'Descripción'}
                </TitleDesc>
                <TextDesc>
                  {activePrize.body}
                </TextDesc>
                <WrapperButtonsBottom style={{ marginTop: 10 }}>
                  <ButtonGradient
                    content="Reclamar"
                    disabled
                    press={() => this.OnHideModal('reclamar')} />
                </WrapperButtonsBottom>
                <WrapperButtonsBottom style={{ marginTop: 0 }}>
                  <ButtonWhite
                    content="Cerrar"
                    border={{ }}
                    press={() => this.OnHideModal('cerrar')}
                  />
                </WrapperButtonsBottom>
              </ContentDialog>
            ) : null }
          </MainWrapperDialog>
        </EmptyDialog>

        <EmptyDialog
          visible={modalChallenge}
          opacity={0.5}
          onTouchOutside={() => this.OnHideModal()}
        >
          <MainWrapperDialog>
            {activeChallenge !== null ? (
              <ContentDialog>
                <WrapperStad>
                  <StadLeft>
                    <ViewRow>
                      <ViewFlex>
                        <TitleDesc>
                          {activeChallenge.name}
                        </TitleDesc>
                        <TextSubt>
                          {'Reto'}
                        </TextSubt>
                      </ViewFlex>
                    </ViewRow>
                  </StadLeft>
                  <StadRight>
                    <ViewRow>
                      <ViewFlex>
                        <IconCircle
                          source={require('../../icons/purpleCircle.png')}
                        />
                      </ViewFlex>
                      <ContentStad>
                        <TextGray>
                          {activeChallenge.point}
                        </TextGray>
                        <TextSubt>
                          {'Puntos adquiridos'}
                        </TextSubt>
                      </ContentStad>
                    </ViewRow>
                  </StadRight>
                </WrapperStad>
                <WrapperImage>
                  <ImageDetail
                    resizeMode="contain"
                    source={{ uri: activeChallenge.image }}
                  />
                </WrapperImage>
                <TitleDesc>
                  {'¿Como ganar?'}
                </TitleDesc>
                <TextDesc>
                  {activeChallenge.body}
                </TextDesc>
                <WrapperButtonsBottom style={{ marginTop: 10 }}>
                  <ButtonGradient content="Entendido" press={() => this.OnHideModal('entendido')} />
                </WrapperButtonsBottom>
              </ContentDialog>
            ) : null }
          </MainWrapperDialog>
        </EmptyDialog>
      </MainWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const { challenge, prizes , profile, ranking } = state;
  return {
    challenge,
    prizes,
    profile,
    ranking,
  };
};

const mapDispatchToProps = dispatch => ({
  getActiveChallenge: params => dispatch(ChallengeActions.getActiveChallengeRequest(params)),
  getActivePrizes: params => dispatch(PrizesActions.getActivePrizesRequest(params)),
  getTopRanking: params => dispatch(TopActions.getTopUsersRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Points);
