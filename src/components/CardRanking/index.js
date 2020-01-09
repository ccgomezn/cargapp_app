/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';

import {
  WrapperCard, ContentCard, ContentText, TextTitle,
  ContentSecond, RowLeft, RowRight, IconCircle,
  SecondText, Position, TextPosition, ImageContent,
} from './style';

function CardRanking({
  press, title, textKM, textPoint, position, icon
}) {
  return (
    <WrapperCard>
      <ContentCard>
        <ImageContent />
        <ContentText>
          <TextTitle>
            {title}
          </TextTitle>
          <ContentSecond>
            <RowLeft>
              <IconCircle
                source={require('../../icons/blueCircle.png')}
              />
              <SecondText>
                {textKM}
              </SecondText>
            </RowLeft>
            <RowRight>
              <IconCircle
                source={require('../../icons/purpleCircle.png')}
              />
              <SecondText>
                {textPoint}
                {' Puntos'}
              </SecondText>
            </RowRight>
          </ContentSecond>
        </ContentText>
      </ContentCard>
      <Position>
        <TextPosition>
          {position}
          {'º'}
        </TextPosition>
      </Position>
    </WrapperCard>
  );
}

CardRanking.propTypes = {
  title: PropTypes.string.isRequired,
  press: PropTypes.func.isRequired,
  textKM: PropTypes.string.isRequired,
  textPoint: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
};

export default CardRanking;
