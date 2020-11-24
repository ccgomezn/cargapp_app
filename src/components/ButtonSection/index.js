/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';

import {
  WrapperSection, TextGray, ActiveButton, ActiveTitle,
} from './style';

function ButtonSection({
  press, title, status,
}) {
  return (
    <WrapperSection
      onPress={press}
      style={[status ? ActiveButton : null]}
    >
      <TextGray style={[status ? ActiveTitle : null]}>
        {title}
      </TextGray>
    </WrapperSection>
  );
}

ButtonSection.propTypes = {
  title: PropTypes.string.isRequired,
  press: PropTypes.func.isRequired,
  status: PropTypes.bool.isRequired,
};

export default ButtonSection;
