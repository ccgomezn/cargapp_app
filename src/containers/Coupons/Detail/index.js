import React, { Component } from 'react';
import {
  MainWrapper, MainText, BlueText, WrapperCode, BoldText,
} from './style';
import CardCoupons from '../../../components/CardCoupons';
import { TextTerms, WrapperText } from '../Commerce/style';

export default class DetailCoupon extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <MainWrapper>
        <CardCoupons
          text="Mc Donald`s"
          fullCard
          subText="10% en auto mac"
          button={false}
        />
        <MainText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            In vel enim non purus maximus commodo tortor.
        </MainText>
        <BlueText>Código de mi cupón</BlueText>
        <WrapperCode>
          <BoldText>njd19374m</BoldText>
        </WrapperCode>
        <WrapperText>
          <TextTerms>© Todos los derechos reservados. Cargapp 2019</TextTerms>
        </WrapperText>
      </MainWrapper>
    );
  }
}
