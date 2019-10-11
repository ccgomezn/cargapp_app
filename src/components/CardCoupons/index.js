import React from 'react';
import PropTypes from 'prop-types';
import {
  MainWrapper,
  SubContainer,
  SubImage,
  WrapperText, Button, BlueText, WhiteOpacityText, WhiteText,
} from './style';

function CardCoupons({
  img, text, subText, subImg, press, button,
}) {
  return (
    <MainWrapper>
      <SubContainer>
        <SubImage />
        <WrapperText>
          <WhiteText>{text}</WhiteText>
          <WhiteOpacityText>{subText}</WhiteOpacityText>
        </WrapperText>
        {button ? (
          <Button onPress={press}>
            <BlueText>Obtener</BlueText>
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
};

export default CardCoupons;
