import React, { Component } from 'react';
import { GiftedChat, Send } from 'react-native-gifted-chat';
import { firebase } from '@react-native-firebase/firestore';

import { connect } from 'react-redux';
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
  }

  // eslint-disable-next-line react/sort-comp
  enableFirestoreSubscription() {
    firebase.firestore().collection('room_1234')
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
              text: data.text,
              createdAt: data.date.toDate(),
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
    this.enableFirestoreSubscription();
  }

  onSend(messages = []) {
    firebase.firestore().collection('room_1234').add({
      text: messages[0].text,
      user_id: messages[0].user._id,
      user_name: messages[0].user.name,
      date: new Date(),
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
    const name = `${profile.data[0].profile.firt_name} ${profile.data[0].profile.last_name}`;
    const id = profile.data[0].user.id;
    return (
      <MainWrapper>
        <WrapperInfoUser>
          <WrapperIcon />
          <WrapperInfo>
            <BoldText>Servicio CargApp</BoldText>
          </WrapperInfo>
          <TouchableCall>
            <TextTouch>Llamar</TextTouch>
          </TouchableCall>
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
            name: name,
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
