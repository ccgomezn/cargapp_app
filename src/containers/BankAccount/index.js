import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MainWrapper } from './style';
import CardBank from '../../components/ComponentCardBank';
import BankActions from '../../redux/reducers/BankAccountRedux';
import ParametersActions from '../../redux/reducers/ParametersRedux';

class AccountBank extends Component {
  constructor() {
    super();
  }

  componentDidMount() {

  }

  render() {
    return (
      <MainWrapper>
        <CardBank subTitle="as" title="us" />
      </MainWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    profile, bank,
  } = state;
  return {
    profile,
    bank,
  };
};

const mapDispatchToProps = dispatch => ({
  getBankAccount: (params = {}) => dispatch(BankActions.getBankAccountSuccess(params)),
  postBankAccount: data => dispatch(BankActions.postBankAccountSuccess(data)),
  putBankAccount: (id, data) => dispatch(BankActions.putBankAccountSuccess(id, data)),
  parameters: data => dispatch(ParametersActions.parametersRequest(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountBank);
