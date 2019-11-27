/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import {
  MainWrapper, MainText, SubText,
  WrapperIcon, IconTruck, WrapperData, WrapperInfo, WrapperBtn, WrapperText, IconArrow,
} from './style';

function CardChat({
  press, data,
}) {
  return (
    <MainWrapper onPress={press}>
      <WrapperIcon>
        <IconTruck
          source={{ uri: 'https://raw.githubusercontent.com/cargappco/cargapp_lite_refac/master/src/Images/meTruck.png?token=AGFM22MMV75A5XZBXZGIMNK54BPN6' }}
        />
      </WrapperIcon>
      <WrapperData>
        <WrapperInfo>
          <WrapperText>
            <MainText>Chat: </MainText>
            <SubText>{data.name}</SubText>
          </WrapperText>
          <WrapperText>
            <MainText>Servicio: </MainText>
            <SubText>
              {`${data.service.origin} - ${data.service.destination}`}
            </SubText>
          </WrapperText>
        </WrapperInfo>
        <WrapperBtn>
          <IconArrow
            source={require('../../Images/arrow-right.png')}
          />
        </WrapperBtn>
      </WrapperData>
    </MainWrapper>
  );
}

CardChat.propTypes = {
  data: PropTypes.string.isRequired,
  press: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
};

export default CardChat;
