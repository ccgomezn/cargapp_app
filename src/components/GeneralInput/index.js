import React from 'react';
import PropTypes from 'prop-types';
import {
  MainWrapper, Text, Input, lineActive, disabledInput,
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
    const {
      title, holder, value, editable,
    } = this.props;

    const handleFocus = () => {
      this.setState({ press: true });
    };

    const handleBlur = () => {
      this.setState({ press: false });
    };

    return (
      <MainWrapper style={[press ? lineActive : null, editable === false ? disabledInput : null]}>
        <Text>{title}</Text>
        <Input
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value != null ? value : null}
          placeholder={holder != null ? holder : ''}
          editable={editable != null ? editable : true}
        />
      </MainWrapper>
    );
  }
}

GeneralInput.propTypes = {
  title: PropTypes.string.isRequired,
  holder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
};

export default GeneralInput;
