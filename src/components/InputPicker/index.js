/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import {
  MainWrapper, Text, lineActive, InputPk, disabledInput,
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
      title, listdata, editable, onChangeValue, defaultSelect,
    } = this.props;

    return (
      <MainWrapper style={[press ? lineActive : null, editable === false ? disabledInput : null]}>
        <Text>{title}</Text>
        <InputPk
          selectedValue={defaultSelect}
          onValueChange={item => onChangeValue(item)}
          mode="dropdown"
          enabled={editable != null ? editable : true}
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
};

export default InputPicker;
