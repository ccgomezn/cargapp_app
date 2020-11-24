/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import {
  TextBlack, WrapperCard, ContentButton,
} from './style';
import ButtonWhite from '../ButtonWhite';

function CardPermissions({
  press, label, permission, textfail, textCorrect,
}) {
  return (
    <WrapperCard>
      <TextBlack>
        {label}
      </TextBlack>
      <ContentButton>
        {!permission ? (
          <ButtonWhite
            content={textfail}
            press={press}
            border={{ borderWidth: 1, borderStyle: 'inset' }}
          />
        ) : <ButtonWhite content={textCorrect} /> }
      </ContentButton>
    </WrapperCard>
  );
}

CardPermissions.propTypes = {
  label: PropTypes.string.isRequired,
  permission: PropTypes.bool.isRequired,
  press: PropTypes.func.isRequired,
  textfail: PropTypes.string.isRequired,
  textCorrect: PropTypes.string.isRequired,
};

export default CardPermissions;
