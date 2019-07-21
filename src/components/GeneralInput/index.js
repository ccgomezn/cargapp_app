import React from 'react';
import PropTypes from 'prop-types';
import {
  MainWrapper, Text, Input, lineActive,
} from './style';

class GeneralInput extends React.Component {
  constructor() {
    super();
    this.state = {
      press: false,
    };
  }

  render() {
    const { press } = this.state;
    const { title } = this.props;

    const handleFocus = () => {
      this.setState({ press: true });
    };

    const handleBlur = () => {
      this.setState({ press: false });
    };

    return (
      <MainWrapper style={press ? lineActive : null}>
        <Text>{title}</Text>
        <Input
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </MainWrapper>
    );
  }
}

GeneralInput.propTypes = {
  title: PropTypes.string.isRequired,
};

export default GeneralInput;
