/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'native-base';

import {
  WrapperCard, WrapperContent, WrapperImage,
  WrapperText, TextDesc, TextPoint, WrapperCheck,
} from './style';

function CardAward({
  press, image, desc, point, status
}) {
  return (
    <WrapperCard onPress={press}>
      <WrapperContent>
        <WrapperImage />
        <WrapperText>
          <TextDesc>
            {desc}
          </TextDesc>
        </WrapperText>
        <TextPoint>
          {point}
          {' Puntos'}
        </TextPoint>
      </WrapperContent>
      <WrapperCheck>
        <Text>icon</Text>
      </WrapperCheck>
    </WrapperCard>
  );
}

CardAward.propTypes = {
  image: PropTypes.string.isRequired,
  press: PropTypes.func.isRequired,
  status: PropTypes.bool.isRequired,
  desc: PropTypes.string.isRequired,
  point: PropTypes.number.isRequired,
};

export default CardAward;
