/* eslint-disable global-require */
import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import {
  MainWrapper, WrapperLogo, Logo, WrapperText, MainText, SubText, LogoCheck, LogoError,
} from './style';

function Card({
  mainText, subText, background, colorText, borderColorProp, icon, press, status,
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
          <WrapperLogo style={{ flex: 1 }}>
            { status === 'correct' ? (
              <LogoCheck
                source={require('../../icons/icon-check.png')}
              />
            ) : null }
            { status === 'fail' ? (
              <LogoCheck
                source={require('../../icons/icon-fail.png')}
              />
            ) : null }
            { status === 'error' ? (
              <LogoError
                source={require('../../icons/icon-error.png')}
              />
            ) : null }
            { status === 'loading' ? (
              <ActivityIndicator
                size={28}
                color="#0068ff"
                style={{ }}
              />
            ) : null }
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
  status: PropTypes.string.isRequired,
};

export default Card;
