/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';

import {
  WrapperCard, TextGray, ContentTitle, Title,
  WrapperStad, StadLeft, StadRight, ViewRow, ViewFlex,
  IconCircle, ContentStad, TextSubt,
} from './style';

function CardInfoStad({
  press, title, valueKm, valuePoint, textKm, textPoint,
}) {
  return (
    <WrapperCard onPress={press}>
      <ContentTitle>
        <Title>
          {title}
        </Title>
      </ContentTitle>
      <WrapperStad>
        <StadLeft>
          <ViewRow>
            <ViewFlex>
              <IconCircle
                source={require('../../icons/circle2x.png')}
              />
            </ViewFlex>
            <ContentStad style={{
              borderRightWidth: 2,
              borderRightColor: '#f5f6fa',
              marginRight: 8,
            }}
            >
              <TextGray>{valueKm}</TextGray>
              <TextSubt>
                {textKm}
              </TextSubt>
            </ContentStad>
          </ViewRow>
        </StadLeft>
        <StadRight>
          <ViewRow>
            <ViewFlex>
              <IconCircle
                source={require('../../icons/circlem2x.png')}
              />
            </ViewFlex>
            <ContentStad>
              <TextGray>{valuePoint}</TextGray>
              <TextSubt>
                {textPoint}
              </TextSubt>
            </ContentStad>
          </ViewRow>
        </StadRight>
      </WrapperStad>
    </WrapperCard>
  );
}

CardInfoStad.propTypes = {
  title: PropTypes.string.isRequired,
  press: PropTypes.func.isRequired,
  valueKm: PropTypes.string.isRequired,
  valuePoint: PropTypes.string.isRequired,
  textKm: PropTypes.string.isRequired,
  textPoint: PropTypes.string.isRequired,
};

export default CardInfoStad;
