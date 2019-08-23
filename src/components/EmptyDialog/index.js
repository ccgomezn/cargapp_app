import React from 'react';
import Dialog, { ScaleAnimation } from 'react-native-popup-dialog';
import PropTypes from 'prop-types';
import { MainWrapperDialog } from './style';

const EmptyDialog = ({ visible, children }) => (
  <Dialog
    visible={visible}
    dialogStyle={MainWrapperDialog}
    dialogAnimation={new ScaleAnimation()}
    overlayOpacity={0.6}
  >
    {children}
  </Dialog>
);

EmptyDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};

export default EmptyDialog;
