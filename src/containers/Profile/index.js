/* eslint-disable array-callback-return */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ActivityIndicator, Alert } from 'react-native';
import EmptyDialog from '../../components/EmptyDialog';
import InputPicker from '../../components/InputPicker';
import {
  MainWrapper, ContentView, TextBlack, ContentBlock, ContentForm,
  WrapperInputs, RowContent, WrapperButtonsBottom, WrapperButtonGradient,
  ContentInitial, WrapperColumn, SecondWrapper, WrapperImage, Image,
  WrapperInfo, BoldText, NormalText, ContentButton,
  MainWrapperDialog, TouchModal, TitleBlack, TextGray, ScrollDialog, ContentDialog,
  WrapperMap,
} from './style';

import Input from '../../components/GeneralInput';
import ButtonGradient from '../../components/ButtonGradient';
import ButtonWhite from '../../components/ButtonWhite';
import ProfileActions from '../../redux/reducers/ProfileRedux';
import PasswordActions from '../../redux/reducers/PasswordRedux';
import ParametersActions from '../../redux/reducers/BankAccountRedux';
import PopUpNotification from '../../components/PopUpNotifications';

const itemsAccount = [
  {
    textItem: 'Cuenta de ahorros',
    valueItem: 'tipo1',
  },
  {
    textItem: 'Cuenta corriente',
    valueItem: 'tipo2',
  },
];

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      modalPassword: false,
      modalAccount: false,
      name: '',
      lastName: '',
      fetch: true,
      notification: false,
      previousPassword: null,
      newPassword: null,
      repeatPassword: null,
      numberAccount: null,
    };
  }

  componentDidMount() {
    const { getProfile, parameters } = this.props;
    parameters('BANK');
    parameters('ACCOUNT_TYPE');
    getProfile();
  }

  onPressButtonPassword() {
    this.setState({ modalPassword: true });
  }

  // eslint-disable-next-line react/sort-comp
  OnHideModal() {
    this.setState({ modalPassword: false, modalAccount: false });
  }

  onPressButtonAccount(value) {
    const { postBankAccount, profile } = this.props;
    const { numberAccount, accountType, bankType } = this.state;
    if (value) {
      alert(value)
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
      postBankAccount(data);
    }
    this.setState({ modalAccount: true });
  }

  confirmProfile(id, name, lastName) {
    const { editProfile } = this.props;
    const data = {
      profile: {
        firt_name: name,
        last_name: lastName,
      },
    };
    editProfile(id, data);
    this.componentDidMount();
    this.setState({ notification: true });
  }

  refreshPassword() {
    const { previousPassword, newPassword, repeatPassword } = this.state;
    const { putPassword } = this.props;
    if (repeatPassword === newPassword) {
      const data = {
        user: {
          password: newPassword,
          password_confirmation: repeatPassword,
          current_password: previousPassword,
        },
      };
      putPassword(data);
    } else {
      Alert.alert('Error', 'Las contraseñas no coinciden');
    }
  }

  render() {
    const {
      modalPassword,
      modalAccount,
      name,
      lastName,
      fetch,
      notification,
      previousPassword,
      newPassword,
      repeatPassword,
      numberAccount,
      bankType,
      accountType,
    } = this.state;
    const { profile, bank } = this.props;
    const arrayBanks = [];
    const arrayAccounts = [];
    if (profile.data !== null) {
      profile.data.map((data) => {
        if (name === '' && lastName === '') {
          this.setState({
            name: data.profile.firt_name,
            lastName: data.profile.last_name,
            fetch: false,
          });
        }
      });
    }
    console.log(this.props);
    if (profile.data !== null
        && !fetch && bank.data.parameters !== null && bank.banks.parameters !== null) {
      profile.data.map((data) => {
        if (name === '' && lastName === '') {
          this.setState({ name: data.profile.firt_name, lastName: data.profile.last_name });
        }
      });
      bank.banks.parameters.map((banks) => {
        arrayAccounts.push({ textItem: banks.name, valueItem: banks.code });
      });
      bank.parameters.parameters.map((banks) => {
        arrayBanks.push({ textItem: banks.name, valueItem: banks.code });
      });
      return (
        <MainWrapper>
          {profile.data.map(data => (
            <WrapperMap>
              <ContentInitial>
                <WrapperColumn>
                  <WrapperImage>
                    <Image />
                  </WrapperImage>
                  <WrapperInfo>
                    <BoldText>{data.profile.firt_name}</BoldText>
                    <NormalText>Conductor nivel 7</NormalText>
                  </WrapperInfo>
                  <ContentButton>
                    <ButtonGradient content="Ver retos" />
                  </ContentButton>
                </WrapperColumn>
              </ContentInitial>

              <SecondWrapper>

                <ContentView>
                  <RowContent style={{ marginRight: '2%' }}>
                    <ButtonWhite border content="Cambiar contraseña" press={() => this.onPressButtonPassword()} />
                  </RowContent>
                  <RowContent>
                    <ButtonWhite border content="Cuenta Bancaria" press={() => this.onPressButtonAccount()} />
                  </RowContent>
                </ContentView>

                <ContentView>
                  <ContentBlock>
                    <TextBlack>Información de perfil</TextBlack>
                  </ContentBlock>
                </ContentView>

                <ContentForm>
                  <WrapperInputs>
                    <Input title="Correo electrónico" type="email-address" value={data.user.email} editable={false} />
                    <Input title="Nombre" value={name} onChangeText={text => this.setState({ name: text })} />
                    <Input title="Apellido" value={lastName} onChangeText={text => this.setState({ lastName: text })} />
                    <Input title="Cedula" holder="Ingrese número de documento" type="numeric" value={data.user.identification} editable={false} />
                    <Input title="Celular" holder="Ingrese número de documento" value={data.profile.phone ? data.profile.phone.slice(2, 12) : data.profile.phone} editable={false} />
                  </WrapperInputs>
                </ContentForm>
                <WrapperButtonsBottom>
                  <WrapperButtonGradient>
                    <ButtonGradient content="Confirmar" press={() => this.confirmProfile(data.profile.id, name, lastName)} />
                  </WrapperButtonGradient>
                </WrapperButtonsBottom>
              </SecondWrapper>
            </WrapperMap>
          ))}
          {notification && (
            <PopUpNotification
              subText="Tus cambios se han realizado correctamente"
              mainText="¡Muy bien!"
              onTouchOutside={() => this.setState({ notification: false })}
              visible={notification}
            />
          )}
          <EmptyDialog
            visible={modalAccount}
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
                  <ButtonGradient content="Confirmar" press={() => this.onPressButtonAccount('post')} />
                </TouchModal>
                <TouchModal>
                  <ButtonWhite content="Cancelar" press={() => this.OnHideModal()} />
                </TouchModal>
              </ContentDialog>
            </MainWrapperDialog>
          </EmptyDialog>

          <EmptyDialog
            visible={modalPassword}
          >
            <MainWrapperDialog>
              <TitleBlack>Cambiar tu contraseña</TitleBlack>
              <TextGray>
                  Ingresa la contraseña anterior.
                  La nueva contraseña deberá tener entre 4 a 6 caracteres.
              </TextGray>
              <ContentForm>
                <WrapperInputs>
                  <Input
                    title="Clave anterior"
                    holder="Ingrese la contraseña anterior"
                    value={previousPassword}
                    onChangeText={value => this.setState({ previousPassword: value })}
                    isPassword
                  />
                  <Input
                    title="Nueva clave"
                    holder="Ingrese la contraseña nueva"
                    value={newPassword}
                    onChangeText={value => this.setState({ newPassword: value })}
                    isPassword
                  />
                  <Input
                    title="Confirmar clave"
                    value={repeatPassword}
                    onChangeText={value => this.setState({ repeatPassword: value })}
                    isPassword
                  />
                </WrapperInputs>
              </ContentForm>
              <TouchModal>
                <ButtonGradient content="Confirmar" press={() => this.refreshPassword()} />
              </TouchModal>
              <TouchModal>
                <ButtonWhite content="Cancelar" press={() => this.OnHideModal()} />
              </TouchModal>
            </MainWrapperDialog>
          </EmptyDialog>
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
    user, profile, password, bank,
  } = state;
  return {
    user,
    profile,
    password,
    bank,
  };
};

const mapDispatchToProps = dispatch => ({
  getProfile: params => dispatch(ProfileActions.getProfileRequest(params)),
  editProfile: (id, data) => dispatch(ProfileActions.editProfileRequest(id, data)),
  putPassword: data => dispatch(PasswordActions.putPasswordRequest(data)),
  postBankAccount: data => dispatch(ParametersActions.postBankAccountSuccess(data)),
  parameters: data => dispatch(ParametersActions.parametersRequest(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
