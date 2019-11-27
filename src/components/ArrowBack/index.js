import React from 'react';
import PropTypes from 'prop-types';
import { SvgAbsolute, TouchBack } from './style';


function ArrowBack({ url }) {
  return (
    <TouchBack onPress={url}>
      {/* eslint-disable-next-line global-require */}
      <SvgAbsolute source={require('../../Images/Back.png')} />
    </TouchBack>
  );
}

ArrowBack.propTypes = {
  url: PropTypes.func.isRequired,
};

export default ArrowBack;
