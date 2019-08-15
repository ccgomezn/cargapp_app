import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import {
  ContaintView,
  ContaintIcon,
  CicleIcon,
  ContaintText,
  TextIcon,
} from './style';

function IconService(
  {
    text,
    icon,
    press,
  },
) {
  return (
    <ContaintView>
      <ContaintIcon onPress={press}>
        <CicleIcon>
          { icon != null ? (
            // eslint-disable-next-line react/jsx-no-undef
            <Image
              source={icon}
              style={{
                flex: 1, width: null, height: null, resizeMode: 'contain',
              }}
            />
          ) : null }
        </CicleIcon>
      </ContaintIcon>
      <ContaintText>
        <TextIcon>{text}</TextIcon>
      </ContaintText>
    </ContaintView>
  );
}

IconService.propTypes = {
  text: PropTypes.string.isRequired,
  press: PropTypes.func.isRequired,
  icon: PropTypes.bool.isRequired,
};

export default IconService;
