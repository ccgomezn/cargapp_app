/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';

import {
  WrapperCard, ContentCard, ContentText, TextTitle,
  ContentSecond, RowLeft, RowRight, IconCircle, CircleBorder,
  SecondText, Position, TextPosition, ImageContent, ImageUser,
} from './style';

function CardRanking({
  press, title, textKM, textPoint, position, icon, isMe,
}) {
  return (
    <WrapperCard style={isMe ? { backgroundColor: '#0088f1', marginBottom: '2%' } : null}>
      <ContentCard>
        <ImageContent>
          <CircleBorder
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#fff', '#320d8e']}
          >
            <ImageUser
              source={require('../../Images/profile.jpg')}
            />
          </CircleBorder>
        </ImageContent>
        <ContentText>
          <TextTitle style={isMe ? { color: '#fff' } : null}>
            {title}
          </TextTitle>
          <ContentSecond>
            <RowLeft>
              <IconCircle
                source={require('../../icons/blueCircle.png')}
              />
              <SecondText style={isMe ? { color: '#fff' } : null}>
                {textKM}
                {' KM'}
              </SecondText>
            </RowLeft>
            <RowRight>
              <IconCircle
                source={require('../../icons/purpleCircle.png')}
              />
              <SecondText style={isMe ? { color: '#fff' } : null}>
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
  isMe: PropTypes.bool.isRequired,
};

export default CardRanking;
