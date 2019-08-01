import React from 'react';
import Dialog, { ScaleAnimation } from 'react-native-popup-dialog';
import PropTypes from 'prop-types';
import {
  MainWrapper,
  Wrapper,
  WrapperIcon,
  WrapperInformation,
  BoldText,
  NormalText,
  Icon,
} from './style';

const PopUpNotification = ({
  visible, onTouchOutside, mainText, subText,
}) => (
  <Dialog
    onTouchOutside={onTouchOutside}
    visible={visible}
    dialogStyle={MainWrapper}
    dialogAnimation={new ScaleAnimation()}
    onHardwareBackPress={onTouchOutside}
    overlayOpacity={0.6}
  >
    <Wrapper
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={['#ff2557', '#320d8e']}
    >
      <WrapperIcon>
        <Icon />
      </WrapperIcon>
      <WrapperInformation>
        <BoldText>{mainText}</BoldText>
        <NormalText>{subText}</NormalText>
      </WrapperInformation>
    </Wrapper>
  </Dialog>
);

PopUpNotification.propTypes = {
  visible: PropTypes.bool.isRequired,
  onTouchOutside: PropTypes.func.isRequired,
  mainText: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
};

export default PopUpNotification;
