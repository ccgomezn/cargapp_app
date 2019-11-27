/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import {
  MainWrapper, ContentView, TextBlack, ContentBlock,
} from './style';

import ChatActions from '../../redux/reducers/ChatRedux';
import CardChat from '../../components/CardChat';

class ListChat extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
    const { getMineChats } = this.props;
    getMineChats();
  }


  onViewDetail(data) {
    const { navigate } = this.props.navigation;
    navigate('DetailVehicle', { dataVehicle: data });
  }

  render() {
    const { chat, user } = this.props;
    console.log(chat);

    if (chat.status && !chat.fetching && chat.myRooms !== null && chat.myRooms !== undefined) {
      return (
        <MainWrapper>
          <ContentView>
            <ContentBlock>
              <TextBlack>Mis chats</TextBlack>
            </ContentBlock>
          </ContentView>

          <ContentView style={{ flexDirection: 'column' }}>
            { chat.myRooms.list.map(data => (
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
  const { user, chat } = state;
  return {
    user,
    chat,
  };
};

const mapDispatchToProps = dispatch => ({
  getMineChats: params => dispatch(ChatActions.getMeChatsRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListChat);
