import React from 'react';
import PropTypes from 'prop-types';
import {
  ContaintView,
  ContaintIcon,
  CircleIcon,
  DrawIcon,
  IconEdit,
  TouchSection,
} from './style';

/* eslint-disable global-require */

function IconProfile(
  {
    icon,
    press,
    edit,
  },
) {
  return (
    <ContaintView>
      <TouchSection onPress={press}>
        <ContaintIcon>
          <CircleIcon>
            <DrawIcon
              source={icon !== null ? { uri: icon } : require('../../Images/profile.jpg')}
            />
          </CircleIcon>
        </ContaintIcon>
        { edit != null ? (
          <IconEdit
            source={require('../../Images/Check.png')}
          />
        ) : null }
      </TouchSection>
    </ContaintView>
  );
}

IconProfile.propTypes = {
  press: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  edit: PropTypes.bool.isRequired,
};

export default IconProfile;
