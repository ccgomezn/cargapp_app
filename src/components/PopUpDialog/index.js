import React from 'react';
import Dialog, { ScaleAnimation } from 'react-native-popup-dialog';
import PropTypes from 'prop-types';
import {
  MainWrapper, TextBlack, Wrapper, TextGray, Svg, SvgUri, TouchModal, TextWhite,
} from './Style';

const PopUpDialog = ({
  visible, onTouchOutside, textGray, textBlack, textButton,
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
      <TextBlack>{textBlack}</TextBlack>
      <TextGray>{textGray}</TextGray>
      <TouchModal>
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
};

export default PopUpDialog;
