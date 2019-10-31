import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import {
  Dialog,
  Wrapper,
  WrapperIcon,
  WrapperInformation,
  BoldText,
  NormalText,
  Icon,
} from './style';

class PopUpNotification extends Component {
  constructor() {
    super();
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      },
    ).start();
  }

  render() {
    const {
      onTouchOutside, mainText, subText,
    } = this.props;
    const opacity = this.animatedValue.interpolate({
      inputRange: [1, 10],
      outputRange: [1, 100],
    });
    return (
      <Animated.View style={{
        opacity, height: '100%', width: '100%', position: 'absolute', zIndex: 1000,
      }}
      >
        <Dialog
          onPress={onTouchOutside}
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
      </Animated.View>
    );
  }
}

PopUpNotification.propTypes = {
  onTouchOutside: PropTypes.func.isRequired,
  mainText: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
};

export default PopUpNotification;
