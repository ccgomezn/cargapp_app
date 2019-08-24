import React from 'react';
import PropTypes from 'prop-types';
import {
  MainWrapper, Text, lineActive, InputPk, ItemPk,
} from './style';

class InputPicker extends React.Component {
  constructor() {
    super();
    this.state = {
      press: false,
      itemSel: 0,
    };
  }

  componentDidMount() {
    const { defaultSelect } = this.props;
    if (defaultSelect != null) {
      this.setState({ itemSel: defaultSelect });
    }
  }

  render() {
    const { press, itemSel } = this.state;
    const { title, listdata } = this.props;

    return (
      <MainWrapper style={press ? lineActive : null}>
        <Text>{title}</Text>
        <InputPk
          selectedValue={itemSel}
          onValueChange={item => this.setState({ itemSel: item })}
          mode="dropdown"
          itemStyle={ItemPk}
        >
          <InputPk.Item label="- Seleccionar -" value="0" />
          {
            listdata != null ? (
              listdata.map((data, i) => (
                // eslint-disable-next-line react/no-array-index-key
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
};

export default InputPicker;
