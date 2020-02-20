/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';

import {
  WrapperCard, Title, TextSub, TextPoint, RowPercentage, TextPercentage,
  BottomBar, LineBar, WrapperPoint, FullPoint,
} from './style';

function CardChellenge({
  press, title, desc, percentage, point, status,
}) {
  return (
    <WrapperCard onPress={press}>
      <Title>{title}</Title>
      <TextSub>{desc}</TextSub>
      <RowPercentage>
        <TextPercentage style={[percentage === 100 ? FullPoint : null]}>
          {percentage}
          {'%'}
        </TextPercentage>
      </RowPercentage>
      <BottomBar>
        <LineBar
          valuePer={percentage}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 3 }}
          colors={['#d200b9', '#896dd7']}
        />
      </BottomBar>
      <WrapperPoint>
        <TextPoint style={[percentage === 100 ? FullPoint : null]}>
          {point}
          {' Puntos'}
        </TextPoint>
      </WrapperPoint>
    </WrapperCard>
  );
}

CardChellenge.propTypes = {
  title: PropTypes.string.isRequired,
  press: PropTypes.func.isRequired,
  status: PropTypes.bool.isRequired,
  desc: PropTypes.string.isRequired,
  percentage: PropTypes.number.isRequired,
  point: PropTypes.number.isRequired,
};

export default CardChellenge;
