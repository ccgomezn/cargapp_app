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
    const { title, holder, value } = this.props;

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
          value={value != null ? value : ''}
          placeholder={holder != null ? holder : ''}
        />
      </MainWrapper>
    );
  }
}

GeneralInput.propTypes = {
  title: PropTypes.string.isRequired,
  holder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default GeneralInput;
