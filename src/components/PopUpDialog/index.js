import React from 'react';
import Dialog, { ScaleAnimation, DialogContent } from 'react-native-popup-dialog';
import PropTypes from 'prop-types';
import {
  MainWrapper, Text, Wrapper, TextGray, Svg, SvgUri
} from './Style';
import ButtonGradient from '../ButtonGradient';


const PopUpDialog = ({ visible, onTouchOutside }) => (
  <Dialog
    onTouchOutside={onTouchOutside}
    visible={visible}
    dialogStyle={MainWrapper}
    dialogAnimation={new ScaleAnimation()}
    onHardwareBackPress={onTouchOutside}
    overlayOpacity={0.6}
  >
    <Wrapper>
      <Svg source={require('../../icons/oval3x.png')}>
        <SvgUri source={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/shape_like.svg' }} />
      </Svg>
      <Text>¡Excelente trabajo!</Text>
      <TextGray>Califica al generador de carga</TextGray>
      <ButtonGradient press={() => onTouchOutside} content="Reclamar saldo" />
    </Wrapper>
  </Dialog>
);

PopUpDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  onTouchOutside: PropTypes.func.isRequired,
};

export default PopUpDialog;
