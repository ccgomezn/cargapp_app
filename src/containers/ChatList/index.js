/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import RNFirebase from 'react-native-firebase';
import {
  MainWrapper, ContentView, TextBlack, ContentBlock,
} from './style';

import ChatActions from '../../redux/reducers/ChatRedux';
import OfferActions from '../../redux/reducers/OffersRedux';
import CardChat from '../../components/CardChat';

const Analytics = RNFirebase.analytics();

class ListChat extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
    const { getMineChats, getActiveChats, getOffers } = this.props;
    getMineChats();
    getActiveChats();
    getOffers();
  }


  onViewDetail(data) {
    const { navigate } = this.props.navigation;
    navigate('InnerChat', { data });
  }

  transformInputData(data, key) {
    const real_data = {};
    data.forEach((data) => {
      real_data[data[key]] = data;
    });
    return real_data;
  }

  render() {
    Analytics.setCurrentScreen('chat');
    const { chat, offers } = this.props;

    if (!chat.fetching && chat.myRooms !== null
    && chat.activeRooms !== null
    && !offers.fetching && offers.data !== null) {
      const real_offers = this.transformInputData(offers.data, 'id');
      const chatsId = [];
      chat.myRooms.forEach((chat) => {
        chatsId.push(chat.room_id);
      });
      const realChats = [];

      chat.activeRooms.forEach((chat) => {
        if (chatsId.includes(chat.id)) {
          chat.service = real_offers[chat.service_id];
          realChats.push(chat);
        }
      });

      return (
        <MainWrapper>
          <ContentView>
            <ContentBlock>
              <TextBlack>Mis chats</TextBlack>
            </ContentBlock>
          </ContentView>

          <ContentView style={{ flexDirection: 'column' }}>
            { realChats.map(data => (
              <CardChat
                data={data}
                press={() => this.onViewDetail(data)}
              />
            ))}
          </ContentView>


        </MainWrapper>
      );
      // eslint-disable-next-line no-else-return
    } else {
      return (
        <ActivityIndicator
          style={{ alignSelf: 'center', height: '100%' }}
          size="large"
          color="#0000ff"
        />
      );
    }
  }
}

const mapStateToProps = (state) => {
  const { user, chat, offers } = state;
  return {
    user,
    chat,
    offers,
  };
};

const mapDispatchToProps = dispatch => ({
  getMineChats: params => dispatch(ChatActions.getMeChatsRequest(params)),
  getActiveChats: params => dispatch(ChatActions.getActiveChatsRequest(params)),
  getOffers: params => dispatch(OfferActions.getOffersRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListChat);
