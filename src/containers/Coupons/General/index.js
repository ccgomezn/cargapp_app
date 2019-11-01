/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { MainWrapper } from './style';
import CardCoupons from '../../../components/CardCoupons';

export default class General extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { navigation } = this.props;
    return (
      <MainWrapper>
        <CardCoupons
          subText="10% en todos los productos"
          text="Starbucks"
          press={() => navigation.navigate('CommerceCoupons')}
          button
          fullCard={false}
        />
        <CardCoupons
          subText="50% en las Mc Donal's"
          text="Mc Donal's"
          press={() => navigation.navigate('CommerceCoupons')}
          fullCard={false}
          button
        />
      </MainWrapper>
    );
  }
}
