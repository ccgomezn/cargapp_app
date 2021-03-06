/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import { MainWrapper, BlueText, Title } from './style';
import CardCoupons from '../../../components/CardCoupons';
import CouponsActions from '../../../redux/reducers/CouponsRedux';
import CompanyActions from '../../../redux/reducers/CompanyRedux';

class General extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    analytics().setCurrentScreen('cupones');
    const { getCoupons, getCompanies } = this.props;
    getCoupons();
    getCompanies();
  }

  navigation(event, param) {
    const { navigation } = this.props;
    analytics().logEvent('boton_ver_todos_cupones');
    navigation.navigate(event, param);
  }

  render() {
    const { companies, coupons } = this.props;
    const newCompanies = new Set();

    if (companies.data !== null && coupons.data !== null) {
      console.log('cupones', coupons.data);
      coupons.data.map(couponsData => companies.data.map((companiesData) => {
        if (companiesData.id === couponsData.company_id) {
          newCompanies.add(companiesData);
        }
      }));
      const newCompaniesArray = Array.from(newCompanies);
      if (newCompaniesArray) {
        console.log(newCompaniesArray);
        return (
          <MainWrapper>
            <Title>Cupones</Title>
            {newCompaniesArray.map(companiesData => (
              <CardCoupons
                subText={companiesData.description}
                text={companiesData.name}
                press={() => this.navigation('CommerceCoupons', { idCompany: companiesData.id })}
                button
                fullCard={false}
                img={companiesData.image}
              />
            ))}
          </MainWrapper>
        );
      } return (
        <BlueText>No hay cupones en estos momentos</BlueText>
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
