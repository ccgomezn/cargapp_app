/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { MainWrapper, BlueText } from './style';
import CardCoupons from '../../../components/CardCoupons';
import CouponsActions from '../../../redux/reducers/CouponsRedux';
import CompanyActions from '../../../redux/reducers/CompanyRedux';

class General extends Component {
  constructor() {
    super();
    this.state = {
      companyID: 8888,
    };
  }

  componentDidMount() {
    const { getCoupons, getCompanies } = this.props;
    getCoupons();
    getCompanies();
  }

  render() {
    const { navigation, companies, coupons } = this.props;
    const { companyID } = this.state;
    console.log(companyID);
    if (companies.data !== null && coupons.data !== null) {
      return (
        <MainWrapper>
          {coupons.data.map(couponsData => companies.data.map((companiesData) => {
            if (companiesData.id === couponsData.company_id) {
              console.log(companyID !== couponsData.company_id)
              if (companyID !== couponsData.company_id) {
                this.setState({ companyID: companiesData.id });
                return (
                  <CardCoupons
                    subText={companiesData.description}
                    text={companiesData.name}
                    press={() => navigation.navigate('CommerceCoupons')}
                    button
                    fullCard={false}
                    img={companiesData.image}
                  />
                );
              }
            }
          }))}
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
  const { coupons, companies } = state;
  return {
    coupons,
    companies,
  };
};

const mapDispatchToProps = dispatch => ({
  getCoupons: params => dispatch(CouponsActions.getCouponsRequest(params)),
  getCompanies: params => dispatch(CompanyActions.getCompaniesRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(General);
