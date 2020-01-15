import React from 'react';
import PropTypes from 'prop-types';
import { 
  Container, 
  CircleAvatar, 
  Avatar,
  AvatarText
} from './style';

function AvatarProfile(
  {
    avatar,
    press,
    text,
  },
) {
  return (
    <Container>
      <CircleAvatar onPress={press}>
        <Avatar source={avatar}/>
      </CircleAvatar>
      <AvatarText>
        {text}
      </AvatarText>
    </Container>
  );
}

AvatarProfile.propTypes = {
  avatar: PropTypes.bool.isRequired,
  press: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default AvatarProfile;
