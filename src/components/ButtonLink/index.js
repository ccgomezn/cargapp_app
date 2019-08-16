import React from 'react';
import PropTypes from 'prop-types';
import { TouchFilter, TextFilter } from './style';

function ButtonLink(
  {
    text,
    press,
    align,
    icon,
  },
) {
  return (
    <TouchFilter onPress={press}>
      <TextFilter float={align}>
        { text }
        { icon != null ? ' >' : '' }
      </TextFilter>
    </TouchFilter>
  );
}

ButtonLink.propTypes = {
  text: PropTypes.string.isRequired,
  press: PropTypes.func.isRequired,
  align: PropTypes.string.isRequired,
  icon: PropTypes.bool.isRequired,
};

export default ButtonLink;
