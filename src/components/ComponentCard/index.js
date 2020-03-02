/* eslint-disable global-require */
import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import {
  MainWrapper, WrapperLogo, WrapperText, MainText, SubText, LogoCheck, LogoError,LogoIni,
} from './style';

function Card({
  mainText, subText, background, colorText, borderColorProp, icon,
  press, status, edit, pressEdit,
}) {
  return (
    <MainWrapper
      onPress={edit ? pressEdit : press}
      style={{ backgroundColor: background, borderColor: borderColorProp }}
    >
      <WrapperLogo style={{ flex: 1 }}>
        <LogoIni
          source={require('../../icons/icon_origin.png')}
        />
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
                source={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-check.png' }}
              />
            ) : null }
            { status === 'fail' ? (
              <LogoCheck
                source={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-fail.png' }}
              />
            ) : null }
            { status === 'error' ? (
              <LogoError
                source={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/icon-error.png' }}
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
  edit: PropTypes.bool.isRequired,
  pressEdit: PropTypes.func.isRequired,
};

export default Card;
