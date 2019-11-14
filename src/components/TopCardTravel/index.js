import React from 'react';
import PropTypes from 'prop-types';
import {
  MainWrapper,
  WrapperColumn,
  WrapperImage,
  Image,
  WrapperInfo,
  BoldText,
  NormalText,
  TouchableContact,
  BlueText,
  Line,
  WrapperSection,
  LineVerical,
  Icon,
} from './style';

function TopCardTravel({
  company, travelsCount, amount, arrive, isConfirmLoad, unLoad,
}) {
  if (arrive) {
    return (
      <MainWrapper>
        <WrapperColumn>
          <WrapperImage>
            <Image />
          </WrapperImage>
          <WrapperInfo>
            <BoldText>{company}</BoldText>
            <NormalText>{travelsCount}</NormalText>
          </WrapperInfo>
          <TouchableContact>
            <BlueText>Contactar</BlueText>
          </TouchableContact>
        </WrapperColumn>
        <Line />
        {isConfirmLoad
          ? (
            <WrapperColumn>
              <WrapperSection>
                <BoldText>Anticipo consignado</BoldText>
                <NormalText>{amount}</NormalText>
              </WrapperSection>
              <LineVerical />
              <WrapperColumn>
                <Icon />
                <BlueText>Ver manifiesto</BlueText>
              </WrapperColumn>
            </WrapperColumn>
          )
          : (
            <WrapperColumn>
              <TouchableContact>
                <BlueText style={{ paddingVertical: 10 }}>
                  Confirmar
                  {' '}
                  {!unLoad ? 'cargue' : 'descargue' }
                </BlueText>
              </TouchableContact>
            </WrapperColumn>
          )
        }
      </MainWrapper>
    );
  } return (
    <MainWrapper style={{ paddingTop: 10 }}>
      <WrapperColumn>
        <WrapperImage>
          <Image />
        </WrapperImage>
        <WrapperInfo>
          <BoldText>{company}</BoldText>
          <NormalText>{travelsCount}</NormalText>
        </WrapperInfo>
        <TouchableContact>
          <BlueText>Contactar</BlueText>
        </TouchableContact>
      </WrapperColumn>
    </MainWrapper>
  );
}

TopCardTravel.propTypes = {
  company: PropTypes.string.isRequired,
  travelsCount: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  arrive: PropTypes.bool.isRequired,
  isConfirmLoad: PropTypes.bool.isRequired,
  unLoad: PropTypes.bool.isRequired,
};

export default TopCardTravel;
