import React from 'react';
import Dialog, { ScaleAnimation } from 'react-native-popup-dialog';
import PropTypes from 'prop-types';
import {
  MainWrapper, TextBlack, Wrapper, TextGray, Svg, SvgUri, TouchModal, TextWhite, WrapperText,
} from './Style';

const PopUpDialog = ({
  visible, onTouchOutside, textGray, textBlack, textButton, pressButton,
}) => (
  <Dialog
    onTouchOutside={onTouchOutside}
    visible={visible}
    dialogStyle={MainWrapper}
    dialogAnimation={new ScaleAnimation()}
    onHardwareBackPress={onTouchOutside}
    overlayOpacity={0.6}
  >
    <Wrapper>
      {/* eslint-disable-next-line global-require */}
      <Svg source={require('../../icons/oval3x.png')}>
        <SvgUri source={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/shape_like.svg' }} />
      </Svg>
      <WrapperText>
        <TextBlack>{textBlack}</TextBlack>
        <TextGray>{textGray}</TextGray>
      </WrapperText>
      <TouchModal onPress={pressButton}>
        <TextWhite>{textButton}</TextWhite>
      </TouchModal>
    </Wrapper>
  </Dialog>
);

PopUpDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onTouchOutside: PropTypes.func.isRequired,
  textGray: PropTypes.string.isRequired,
  textBlack: PropTypes.string.isRequired,
  textButton: PropTypes.string.isRequired,
  pressButton: PropTypes.string.isRequired,
};

export default PopUpDialog;
