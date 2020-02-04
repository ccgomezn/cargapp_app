/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import {
  MainWrapper, ContentView, TextBlack, ContentBlock, ContentForm, RowContent,
} from './style';
import CardSquareInfo from '../../components/CardSquareInfo';
import CardInformationProfile from '../../components/CardInformationProfile';

import StaticsActions from '../../redux/reducers/StaticsRedux';

class Analytics extends Component {
  constructor() {
    super();
    this.state = {
      nameUser: '',
      lastNameUser: '',
    };
  }

  componentDidMount() {
    const { getMeStatics, profile } = this.props;
    getMeStatics();
    if (profile.data) {
      const firstName = profile.data ? profile.data[0].profile.firt_name : '';
      const lastName = profile.data ? profile.data[0].profile.last_name : '';
      const shortName = firstName.split(' ');
      const shortlastName = lastName.split(' ');
      this.setState({
        nameUser: shortName[0],
        lastNameUser: shortlastName[0],
      });
    }
  }

  render() {
    const { statiscs } = this.props;
    const { nameUser, lastNameUser } = this.state;

    console.log(statiscs);
    if (statiscs.meStatics !== null && !statiscs.fetching) {
      return (
        <MainWrapper>
          <ContentView>
            <ContentBlock>
              <TextBlack>Estadísticas</TextBlack>
            </ContentBlock>
          </ContentView>

          <ContentView>
            <ContentForm>
              <CardInformationProfile
                mainText={nameUser !== '' ? `${nameUser}` : '-'}
                subText={lastNameUser !== '' ? `${lastNameUser}` : '-'}
                description="Estos son tus números acumulados."
              />
            </ContentForm>
          </ContentView>

          <ContentView>
            <RowContent style={{ marginRight: '2%' }}>
              <CardSquareInfo
                value={statiscs.meStatics.total_services}
                description="Viajes Realizados"
                // icon={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/check-gradient.svg' }}
              />
            </RowContent>
            <RowContent>
              <CardSquareInfo
                value={statiscs.meStatics.kilometres}
                description="KM recorridos"
                // icon={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/map-gradient.svg' }}
              />
            </RowContent>
          </ContentView>

          <ContentView>
            <RowContent style={{ marginRight: '2%', width: '100%' }}>
              <CardSquareInfo
                value={statiscs.meStatics.point}
                description="Puntos obtenidos"
              />
            </RowContent>
          </ContentView>

          <ContentView>
            <RowContent style={{ marginRight: '2%' }}>
              <CardSquareInfo
                value={statiscs.meStatics.challenges}
                description="Retos completados"
              />
            </RowContent>
            <RowContent>
              <CardSquareInfo
                value={`${statiscs.meStatics.score}/5`}
                description="Calificación"
              />
            </RowContent>
          </ContentView>

        </MainWrapper>
      );
    } return (
      <ActivityIndicator
        style={{ alignSelf: 'center', height: '100%' }}
        size="large"
        color="#0000ff"
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { statiscs, user, profile } = state;
  return {
    statiscs,
    user,
    profile,
  };
};

const mapDispatchToProps = dispatch => ({
  getMeStatics: params => dispatch(StaticsActions.getStaticsMeRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Analytics);
