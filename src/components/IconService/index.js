import React from 'react';
import PropTypes from 'prop-types';
import {
  ContaintView,
  ContaintIcon,
  CicleIcon,
  ContaintText,
  TextIcon,
  DrawIcon,
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
            <DrawIcon
              source={icon}
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
