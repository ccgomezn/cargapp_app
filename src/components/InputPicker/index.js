/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import {
  MainWrapper, Text, lineActive, InputPk, disabledInput, errorInput,
} from './style';

class InputPicker extends React.Component {
  constructor() {
    super();
    this.state = {
      press: false,
    };
  }

  componentDidMount() {
  }

  render() {
    const { press } = this.state;
    const {
      title, listdata, editable, onChangeValue, defaultSelect, errorText,
    } = this.props;

    return (
      <MainWrapper style={[
        press ? lineActive : null,
        editable === false ? disabledInput : null,
        errorText ? errorInput : null,
      ]}
      >
        <Text>{title}</Text>
        <InputPk
          selectedValue={defaultSelect}
          onValueChange={item => onChangeValue(item)}
          mode="dropdown"
          enabled={editable != null ? editable : true}
          itemStyle={{ color: '#d00' }}
          iosHeader={title}
        >
          <InputPk.Item label="- Seleccionar -" value="0" />
          {
            listdata != null ? (
              listdata.map((data, i) => (
                <InputPk.Item key={i} label={data.textItem} value={data.valueItem} />
              ))
            ) : null
          }
        </InputPk>
      </MainWrapper>
    );
  }
}

InputPicker.propTypes = {
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  listdata: PropTypes.array.isRequired,
  defaultSelect: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  errorText: PropTypes.bool.isRequired,
};

export default InputPicker;
