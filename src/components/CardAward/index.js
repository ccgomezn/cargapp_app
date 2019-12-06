/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'native-base';

import {
  WrapperCard, WrapperContent, WrapperImage,
  WrapperText, TextDesc, TextPoint, WrapperCheck, ImageView,
} from './style';

function CardAward({
  press, image, desc, point, status,
}) {
  return (
    <WrapperCard onPress={press}>
      <WrapperContent>
        <WrapperImage>
          { image ? (
            <ImageView
              resizeMode="contain"
              source={{ uri: image }}
            />
          ) : null }
        </WrapperImage>
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
      { status ? (
        <WrapperCheck style={{ alignContent: 'center', alignSelf: 'center' }}>
          <Text>OK</Text>
        </WrapperCheck>
      ) : null }
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
