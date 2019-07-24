import React from 'react';
import PropTypes from 'prop-types';
import {
  WrapperTouchable, WrapperLogo, Logo, Text, WrapperText,
} from './style';

function ButtonSocial({
  logo, colorLogo, colorBackground, text,
}) {
  return (
    <WrapperTouchable style={{ backgroundColor: colorBackground }}>
      <WrapperLogo style={{ backgroundColor: colorLogo }}>
        <Logo source={logo} />
      </WrapperLogo>
      <WrapperText>
        <Text>{text}</Text>
      </WrapperText>
    </WrapperTouchable>
  );
}

ButtonSocial.propTypes = {
  logo: PropTypes.string.isRequired,
  colorLogo: PropTypes.string.isRequired,
  colorBackground: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ButtonSocial;
