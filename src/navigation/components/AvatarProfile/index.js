import React from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import {
  Container,
  CircleAvatar,
  Avatar,
  AvatarText,
  WrapText,
  SecondText,
} from './style';


function AvatarProfile(
  {
    avatar,
    press,
    text,
    secondText,
  },
) {
  return (
    <Container>
      <CircleAvatar onPress={press}>
        <Avatar
          style={Platform.OS === 'ios' ? { width: 75, height: 75 } : { width: 80, height: 80 }}
          source={avatar}
        />
      </CircleAvatar>
      <WrapText
        onPress={press}
      >
        <AvatarText>
          {text}
        </AvatarText>
        <SecondText>
          {secondText}
        </SecondText>
      </WrapText>
    </Container>
  );
}

AvatarProfile.propTypes = {
  avatar: PropTypes.bool.isRequired,
  press: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  secondText: PropTypes.string.isRequired,
};

export default AvatarProfile;
