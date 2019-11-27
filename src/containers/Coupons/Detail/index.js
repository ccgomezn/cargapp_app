import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import CouponsActions from '../../../redux/reducers/CouponsRedux';
import {
  MainWrapper, MainText, BlueText, WrapperCode, BoldText,
} from './style';
import CardCoupons from '../../../components/CardCoupons';
import { TextTerms, WrapperText } from '../Commerce/style';

class DetailCoupon extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { navigation, postCoupon, profile } = this.props;
    const idCoupon = navigation.getParam('idItem');
    this.setState({ coupon: idCoupon });
    const data = {
      user_coupon: {
        coupon_id: idCoupon.id,
        user_id: profile.data[0].user.id,
        cargapp_model_id: 26,
      },
    };
    postCoupon(data);
  }

  render() {
    const { coupon } = this.state;
    console.log(this.props);
    if (coupon) {
      return (
        <MainWrapper>
          <CardCoupons
            text={coupon.name}
            fullCard
            subText={coupon.name}
            button={false}
          />
          <MainText>{coupon.description}</MainText>
          <BlueText>Código de mi cupón</BlueText>
          <WrapperCode>
            <BoldText>{coupon.code}</BoldText>
          </WrapperCode>
          <WrapperText>
            <TextTerms>© Todos los derechos reservados. Cargapp 2019</TextTerms>
          </WrapperText>
        </MainWrapper>
      );
    } return (
      <ActivityIndicator
        style={{ alignSelf: 'center', height: '100%' }}
        size="large"
        color="#0000ff"
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { coupons, profile, user } = state;
  return {
    coupons,
    profile,
    user,
  };
};

const mapDispatchToProps = dispatch => ({
  postCoupon: data => dispatch(CouponsActions.postCouponsRequest(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailCoupon);
