import React from 'react';
import PropTypes from 'prop-types';
import {
  MainWrapper, WrapperLogo, Logo, WrapperText, MainText, SubText,
} from './style';

function Card({
  mainText, subText, background, colorText, borderColorProp, icon, press,
}) {
  return (
    <MainWrapper
      onPress={press}
      style={{ backgroundColor: background, borderColor: borderColorProp }}
    >
      <WrapperLogo>
        <Logo source={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/document.svg' }} />
      </WrapperLogo>
      <WrapperText>
        {mainText
          ? <MainText style={{ color: colorText }}>{mainText}</MainText>
          : null
          }

        {subText
          ? <SubText style={{ color: colorText }}>{subText}</SubText>
          : null
          }
      </WrapperText>
      {icon
        ? (
          <WrapperLogo>
            <Logo />
          </WrapperLogo>
        )
        : null
        }
    </MainWrapper>
  );
}

Card.propTypes = {
  mainText: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
  colorText: PropTypes.string.isRequired,
  borderColorProp: PropTypes.string.isRequired,
  icon: PropTypes.bool.isRequired,
  press: PropTypes.func.isRequired,
};

export default Card;
