/* eslint-disable dot-notation */
import React from 'react';
import PropTypes from 'prop-types';
import Dialog, { SlideAnimation } from 'react-native-popup-dialog';
import {
  MainWrapper,
  Text,
  lineActive,
  disabledInput,
  MainDialog,
  MainCountries,
  ButtonCountrie,
  IconFlag,
  TextFlag,
  ScrollCountries,
  TouchableFlag,
  IconFlagInit,
  TextCode,
} from './style';

// eslint-disable-next-line import/no-unresolved
const countries = require('./countries.json');

class InputPickercountries extends React.Component {
  constructor() {
    super();
    this.state = {
      press: false,
      itemSel: 'CO',
      codeSel: '+57',
      modalVisible: false,
    };
  }

  componentDidMount() {
    const { defaultSelect, defaultCode } = this.props;
    if (defaultSelect != null) {
      this.setState({ itemSel: defaultSelect });
    }
    if (defaultCode != null) {
      this.setState({ codeSel: `+${defaultCode}` });
    }
  }

  onPressTouch(valueItem, flag) {
    const { onChange } = this.props;
    this.setState({ modalVisible: false, itemSel: flag, codeSel: `+${valueItem}` });
    onChange(valueItem);
  }

  onTouchOutside() {
    this.setState({ modalVisible: false });
  }

  render() {
    const {
      press, itemSel, modalVisible, codeSel,
    } = this.state;
    const { title, listdata, editable } = this.props;

    return (
      <MainWrapper style={[press ? lineActive : null, editable === false ? disabledInput : null]}>
        <Text>{title}</Text>
        <TouchableFlag onPress={() => this.setState({ modalVisible: true })}>
          { countries[itemSel] != null ? (
            <IconFlagInit
              source={{ uri: countries[itemSel].flag }}
            />
          ) : <IconFlagInit /> }
          <TextCode>{codeSel}</TextCode>
        </TouchableFlag>
        <Dialog
          onTouchOutside={() => this.onTouchOutside()}
          visible={modalVisible}
          dialogStyle={MainDialog}
          dialogAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          onHardwareBackPress={() => this.onTouchOutside()}
          overlayOpacity={0.6}
        >
          <ScrollCountries>
            <MainCountries>
              <ButtonCountrie onPress={() => this.onPressTouch('51', 'PE')}>
                <IconFlag
                  source={{ uri: countries['PE'].flag }}
                />
                <TextFlag> Perú (+51)</TextFlag>
              </ButtonCountrie>
              <ButtonCountrie onPress={() => this.onPressTouch('56', 'CL')}>
                <IconFlag
                  source={{ uri: countries['CL'].flag }}
                />
                <TextFlag> Chile (+56)</TextFlag>
              </ButtonCountrie>
              <ButtonCountrie onPress={() => this.onPressTouch('33', 'FR')}>
                <IconFlag
                  source={{ uri: countries['FR'].flag }}
                />
                <TextFlag> Francia (+33)</TextFlag>
              </ButtonCountrie>
              {listdata.data.map((dtcountrie) => {
                const fullcontent = `${dtcountrie.name} (+${dtcountrie.code})`;
                const cioc = dtcountrie.cioc.slice(0, 2);
                return (
                  <ButtonCountrie onPress={() => this.onPressTouch(dtcountrie.code, cioc)}>
                    { countries[cioc] != null ? (
                      <IconFlag
                        source={{ uri: countries[cioc].flag }}
                      />
                    ) : <IconFlag /> }
                    <TextFlag>
                      {fullcontent}
                    </TextFlag>
                  </ButtonCountrie>
                );
              })}
            </MainCountries>
          </ScrollCountries>
        </Dialog>
      </MainWrapper>
    );
  }
}

InputPickercountries.propTypes = {
  title: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  listdata: PropTypes.array.isRequired,
  defaultSelect: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultCode: PropTypes.string.isRequired,
};

export default InputPickercountries;
