import React from 'react';
import PropTypes from 'prop-types';
import {
  MainWrapper,
  SubContainer,
  SubImage,
  WrapperText, Button, BlueText, WhiteOpacityText, WhiteText,
} from './style';

function CardCoupons({
  img, text, subText, subImg,
}) {
  return (
    <MainWrapper>
      <SubContainer>
        <SubImage />
        <WrapperText>
          <WhiteText>{text}</WhiteText>
          <WhiteOpacityText>{subText}</WhiteOpacityText>
        </WrapperText>
        <Button>
          <BlueText>Obtener</BlueText>
        </Button>
      </SubContainer>
    </MainWrapper>
  );
}

CardCoupons.propTypes = {
  img: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  subImg: PropTypes.string.isRequired,
};

export default CardCoupons;
