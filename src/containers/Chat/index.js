import React, { Component } from 'react';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { firebase } from '@react-native-firebase/firestore';

import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import {
  WrapperFooter,
  Input,
  WrapperInput,
  WrapperTouch,
  MainWrapper,
  WrapperInfoUser,
  WrapperIcon,
  Icon,
  TextSend,
  WrapperInfo,
  BoldText,
  NormalText,
  TouchableCall,
  TextTouch,
} from './style';

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
    };
    this.onSend = this.onSend.bind(this);
  }

  // eslint-disable-next-line react/sort-comp
  enableFirestoreSubscription(uid) {
    firebase.firestore().collection(uid.toString())
      .onSnapshot({
        error: e => console.error(e),
        next: (documentSnapshot) => {
          const messages = [];
          // eslint-disable-next-line no-underscore-dangle
          documentSnapshot._docs.forEach((message) => {
            console.log(message);
            const data = message._data;
            messages.push({
              _id: message.id,
              text: data.message,
              createdAt: data.created_at.toDate(),
              user: {
                _id: data.user_id,
                name: data.user_name,
              },
            });
          });
          messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          this.setState({
            messages,
          });
        },
      });
  }

  componentDidMount() {
    const { navigation } = this.props;
    const chat = navigation.getParam('data', '');
    this.setState({
      chat_data: chat,

    });
    this.enableFirestoreSubscription(chat.id);
  }

  onSend(messages = []) {
    console.log(messages);
    firebase.firestore().collection(this.state.chat_data.id.toString()).add({
      message: messages[0].text,
      // eslint-disable-next-line no-underscore-dangle
      user_id: messages[0].user._id,
      user_name: messages[0].user.name,
      created_at: new Date(),
      message_type: 'text',
    });
  }


  renderSend(props) {
    return (
      <Send
        {...props}
      >
        <TextSend>
            Enviar
        </TextSend>
      </Send>
    );
  }

  render() {
    const { profile } = this.props;
    const { chat_data } = this.state;
    const name = `${profile.data[0].profile.firt_name} ${profile.data[0].profile.last_name}`;
    const { id } = profile.data[0].user;
    if (chat_data) {
      return (
        <MainWrapper>
          <WrapperInfoUser>
            <WrapperInfo>
              <BoldText>{chat_data.name}</BoldText>
            </WrapperInfo>

          </WrapperInfoUser>
          <GiftedChat
                /* eslint-disable-next-line react/destructuring-assignment */
            messages={this.state.messages}
            onSend={message => this.onSend(message)}
            loadEarlier={this.state.loadEarlier}
            onLoadEarlier={this.onLoadEarlier}
            isLoadingEarlier={this.state.isLoadingEarlier}
            user={{
              _id: id,
              name,
            }}
            scrollToBottom
            keyboardShouldPersistTaps="never"
            quickReplyStyle={{ borderRadius: 2 }}
            renderSend={props => this.renderSend(props)}
            placeholder="Escriba un mensaje..."
          />
        </MainWrapper>
      );
    }
    return (
      <ActivityIndicator
        style={{ alignSelf: 'center', height: '100%' }}
        size="large"
        color="#0000ff"
      />
    );
  }
}
const mapStateToProps = (state) => {
  const {
    user, profile,
  } = state;
  return {
    user, profile,
  };
};

export default connect(
  mapStateToProps,
  null,
)(Chat);
