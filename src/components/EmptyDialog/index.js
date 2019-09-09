import React from 'react';
import Dialog, { SlideAnimation } from 'react-native-popup-dialog';
import PropTypes from 'prop-types';
import { MainWrapperDialog } from './style';

const EmptyDialog = ({
  visible, children, onTouchOutside, animation, opacity, styleWrapper,
}) => (
  <Dialog
    onTouchOutside={onTouchOutside}
    visible={visible}
    dialogStyle={styleWrapper == null ? MainWrapperDialog : styleWrapper}
    dialogAnimation={new SlideAnimation({
      slideFrom: animation == null ? 'bottom' : animation,
    })}
    onHardwareBackPress={onTouchOutside}
    overlayOpacity={opacity == null ? 0.8 : opacity}
  >
    {children}
  </Dialog>
);

EmptyDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
  onTouchOutside: PropTypes.func.isRequired,
  animation: PropTypes.string.isRequired,
  opacity: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  styleWrapper: PropTypes.any.isRequired,
};

export default EmptyDialog;
