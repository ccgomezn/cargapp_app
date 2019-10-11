import React, { Component } from 'react';
import { MainWrapper } from './style';
import CardCoupons from '../../../components/CardCoupons';

export default class General extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <MainWrapper>
        <CardCoupons subText="10% en todos los productos" text="Starbucks" subImg="10% en todos los productos" />
        <CardCoupons subText="10% en todos los productos" text="Starbucks" subImg="10% en todos los productos" />
        <CardCoupons subText="10% en todos los productos" text="Starbucks" subImg="10% en todos los productos" />
      </MainWrapper>
    );
  }
}
