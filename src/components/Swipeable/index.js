import React from 'react';
import PropTypes from 'prop-types';
import SwipeablePanel from 'rn-swipeable-panel';
import { ContainerTitle, InnerContent, TextTitle } from './style';

const Swipeable = ({
  visible, children, onClose, onPressClose, title,
}) => (
  <SwipeablePanel
    fullWidth
    openLarge
    isActive={visible}
    onClose={onClose}
    onPressCloseButton={onPressClose}
  >
    <ContainerTitle>
      <InnerContent>
        <TextTitle>
          {title}
        </TextTitle>
      </InnerContent>
    </ContainerTitle>
    {children}
  </SwipeablePanel>
);

Swipeable.propTypes = {
  visible: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
  onPressClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Swipeable;
