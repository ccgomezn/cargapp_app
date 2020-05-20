/* eslint-disable import/no-named-as-default-member */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Alert } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import {
  MainWrapper,
  TouchableCreate,
  MainText,
  MainTextOpacity,
  MainTextCard,
  WrapperCardAccount,
  TouchableCreateNewAccount,
  MainWrapperScroll,
} from './style';
import CardBank from '../../components/ComponentCardBank';
import BankActions from '../../redux/reducers/BankAccountRedux';
import ParametersActions from '../../redux/reducers/ParametersRedux';
import EmptyDialog from '../../components/EmptyDialog';
import {
  ContentDialog,
  ContentForm,
  MainWrapperDialog,
  TextGray,
  TitleBlack, TouchModal, WrapperInputs,
} from '../Profile/style';
import Input from '../../components/GeneralInput';
import InputPicker from '../../components/InputPicker';
import ButtonGradient from '../../components/ButtonGradient';
import ButtonWhite from '../../components/ButtonWhite';
import PopUpNotification from '../../components/PopUpNotifications';

class BankAccount extends Component {
  constructor() {
    super();
    this.state = {
      modalAccount: false,
      numberAccount: '',
      bankType: '',
      accountType: '',
      popUp: false,
      modalData: null,
      modify: false,
      id: null,
    };
  }

  componentDidMount() {
    analytics().setCurrentScreen('tarjetas_registradas');
    const { getBankAccount, getParameters, getSecondParameters } = this.props;
    getBankAccount();
    getParameters('BANK');
    getSecondParameters('ACCOUNT_TYPE');
  }

  onPressButtonAccount() {
    analytics().logEvent('boton_confirmar_datos_bancarios');
    const { postBankAccount, putBankAccount, profile, getBankAccount } = this.props;
    const {
      numberAccount, accountType, bankType, modify, id,
    } = this.state;
    if (numberAccount !== '' && accountType !== '' && bankType !== '') {
      const data = {
        bank_account: {
          account_number: numberAccount,
          account_type: accountType,
          bank: bankType,
          user_id: profile.data[0].user.id,
          statu_id: 15,
          active: true,
        },
      };
      if (modify) {
        putBankAccount(id, data);
        getBankAccount();
        setTimeout(() => {
          this.componentDidMount();
        }, 1200);
      } else {
        postBankAccount(data);
        getBankAccount();
        setTimeout(() => {
          this.componentDidMount();
        }, 1200);
      }
      this.setState({
        modalAccount: false,
        popUp: true,
        accountType: '',
        bankType: '',
        numberAccount: '',
        modify: false,
        id: '',
        modalData: null,
      });
      analytics().logEvent('registro_cuenta_exitoso');
    } else Alert.alert('Advertencia...', 'Revisa todos los campos');
  }

  OnHideModal() {
    analytics().logEvent('boton_cancelar_datos_bancarios');
    this.setState({
      modalAccount: false,
      accountType: '',
      bankType: '',
      numberAccount: '',
      modify: false,
      id: '',
      modalData: null,
    });
  }

  openModal() {
    analytics().setCurrentScreen('datos_bancarios');
    analytics().logEvent('boton_agregar_cuenta');
    this.setState({ modalAccount: true });
  }

  render() {
    const {
      modalAccount,
      numberAccount,
      bankType,
      accountType,
      popUp,
      modalData,
    } = this.state;
    const { bank, parameters } = this.props;
    const arrayBanks = [];
    const arrayAccounts = [];
    console.log(this.props);
    if (parameters.data !== null && parameters.second !== null && bank.data !== null) {
      parameters.second.parameters.map((banks) => {
        arrayAccounts.push({ textItem: banks.name, valueItem: banks.code });
      });
      parameters.data.parameters.map((banks) => {
        arrayBanks.push({ textItem: banks.name, valueItem: banks.code });
      });
      if (modalData) {
        this.setState({
          accountType: modalData.account_type,
          bankType: modalData.bank,
          numberAccount: modalData.account_number.toString(),
          modify: true,
          id: modalData.id,
          modalData: null,
        });
      }
      return (
        <MainWrapper>
          {bank.data.length > 0 ? (
            <MainWrapperScroll>
              <MainTextCard>Tarjetas registradas</MainTextCard>
              <WrapperCardAccount>
                {bank.data.map(dataAccount => (
                  <CardBank
                    subTitle={`Banco ${dataAccount.bank}`}
                    title={`Tarjeta ${dataAccount.account_type} terminada en ${dataAccount.account_number.toString().slice(0, 4)}`}
                    press={() => this.setState({ modalAccount: true, modalData: dataAccount })}
                    disable={false}
                  />
                ))}
              </WrapperCardAccount>
            </MainWrapperScroll>
          ) : (
            <TouchableCreate onPress={() => this.openModal()}>
              <MainTextOpacity>No tienes cuentas bancarias por el momento</MainTextOpacity>
              <MainText>¿Deseas agregar una?</MainText>
            </TouchableCreate>
          )
          }
          {popUp ? (
            <PopUpNotification
              onTouchOutside={() => this.setState({ popUp: false })}
              mainText="Perfecto!"
              subText="La cuenta ha sido agregada correctamente y estará siendo validada"
            />
          ) : null}
          <EmptyDialog
            visible={modalAccount}
            onTouchOutside={() => this.setState({ modalAccount: false })}
          >
            <MainWrapperDialog>
              <ContentDialog>
                <TitleBlack>Datos bancarios</TitleBlack>
                <TextGray>Registra o modifica tu cuenta bancaria.</TextGray>
                <ContentForm>
                  <WrapperInputs>
                    <Input
                      title="Cuenta bancaria"
                      holder="Ingrese tu número de cuenta"
                      type="phone-pad"
                      value={numberAccount}
                      onChangeText={text => this.setState({ numberAccount: text })}
                      maxLength={20}
                    />
                    <InputPicker
                      title="Tipo de cuenta"
                      listdata={arrayAccounts}
                      onChangeValue={text => this.setState({ accountType: text })}
                      defaultSelect={accountType}
                    />
                    <InputPicker
                      title="Banco"
                      listdata={arrayBanks}
                      onChangeValue={text => this.setState({ bankType: text })}
                      defaultSelect={bankType}
                    />
                  </WrapperInputs>
                </ContentForm>
                <TouchModal>
                  <ButtonGradient content="Confirmar" press={() => this.onPressButtonAccount()} />
                </TouchModal>
                <TouchModal>
                  <ButtonWhite content="Cancelar" press={() => this.OnHideModal()} />
                </TouchModal>
              </ContentDialog>
            </MainWrapperDialog>
          </EmptyDialog>
          <TouchableCreateNewAccount onPress={() => this.openModal()}>
            <MainText>¿Deseas agregar una nueva cuenta?</MainText>
          </TouchableCreateNewAccount>
        </MainWrapper>
      );
    }
    return (
      <ActivityIndicator
        style={{ alignSelf: 'center', height: '100%' }}
        size="large"
        color="#0000ff"
      />
    );
  }
}

const mapStateToProps = (state) => {
  const {
    profile, bank, parameters,
  } = state;
  return {
    profile,
    bank,
    parameters,
  };
};

const mapDispatchToProps = dispatch => ({
  getBankAccount: (params = {}) => dispatch(BankActions.getBankAccountRequest(params)),
  postBankAccount: data => dispatch(BankActions.postBankAccountRequest(data)),
  putBankAccount: (id, data) => dispatch(BankActions.putBankAccountRequest(id, data)),
  getParameters: data => dispatch(ParametersActions.parametersRequest(data)),
  getSecondParameters: data => dispatch(ParametersActions.parametersSecondRequest(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BankAccount);
