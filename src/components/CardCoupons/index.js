/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import {
  MainWrapper,
  SubContainer,
  SubImage,
  WrapperText, Button, BlueText, WhiteOpacityText, WhiteText,
} from './style';

function CardCoupons({
  img, text, subText, subImg, press, button, fullCard,
}) {
  return (
    <MainWrapper style={fullCard && { borderRadius: 0 }} source={{ uri: img }}>
      <SubContainer>
        {subImg ? (
          <SubImage />
        ) : null }
        <WrapperText>
          <WhiteText>{text}</WhiteText>
          <WhiteOpacityText>{subText.length > 15 ? `${subText.slice(0, 28)}...` : subText}</WhiteOpacityText>
        </WrapperText>
        {button ? (
          <Button onPress={press}>
            <BlueText>Ver todos</BlueText>
          </Button>
        ) : null}
      </SubContainer>
    </MainWrapper>
  );
}

CardCoupons.propTypes = {
  img: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  subImg: PropTypes.string.isRequired,
  press: PropTypes.func.isRequired,
  button: PropTypes.bool.isRequired,
  fullCard: PropTypes.bool.isRequired,
};

export default CardCoupons;
