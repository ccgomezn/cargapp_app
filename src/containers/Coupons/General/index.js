import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MainWrapper } from './style';
import CardCoupons from '../../../components/CardCoupons';
import CouponsActions from '../../../redux/reducers/CouponsRedux';

class General extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { getCoupons } = this.props;
    getCoupons();
  }

  render() {
    const { navigation } = this.props;
    console.log(this.props);
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

const mapStateToProps = (state) => {
  const { coupons } = state;
  return coupons;
};

const mapDispatchToProps = dispatch => ({
  getCoupons: params => dispatch(CouponsActions.getCouponsRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(General);
