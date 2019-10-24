/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ActivityIndicator } from 'react-native';
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
import CardSquareInfo from '../../components/CardSquareInfo';
import ButtonGradient from '../../components/ButtonGradient';
import ButtonWhite from '../../components/ButtonWhite';
import ProfileActions from '../../redux/reducers/ProfileRedux';

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
    };
  }

  componentDidMount() {
    const { getProfile } = this.props;
    getProfile();
  }

  onPressButtonPassword() {
    this.setState({ modalPassword: true });
  }

  // eslint-disable-next-line react/sort-comp
  OnHideModal() {
    this.setState({ modalPassword: false, modalAccount: false });
  }

  onPressButtonAccount() {
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
  }

  render() {
    const {
      modalPassword, modalAccount, name, lastName, fetch,
    } = this.state;
    const { profile } = this.props;
    console.log(this.props);
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
    if (profile.data !== null && !fetch) {
      profile.data.map((data) => {
        if (name === '' && lastName === '') {
          this.setState({ name: data.profile.firt_name, lastName: data.profile.last_name });
        }
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
                    <CardSquareInfo
                      value="1.233"
                      description="Viajes Realizados"
                            // eslint-disable-next-line global-require
                      icon={require('../../icons/check-gradient.png')}
                    />
                  </RowContent>
                  <RowContent>
                    <CardSquareInfo
                      value="9,5/10"
                            // eslint-disable-next-line global-require
                      icon={require('../../icons/map-gradient.png')}
                      description="Calificación"
                    />
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
                <WrapperButtonGradient>
                  <ButtonWhite border content="Confirmar" press={() => this.confirmProfile(data.profile.id, name, lastName)} />
                </WrapperButtonGradient>
                <WrapperButtonsBottom>
                  <WrapperButtonGradient>
                    <ButtonWhite border content="Cambiar contraseña" press={() => this.onPressButtonPassword()} />
                  </WrapperButtonGradient>
                  <WrapperButtonGradient>
                    <ButtonGradient content="Cuenta Bancaria" press={() => this.onPressButtonAccount()} />
                  </WrapperButtonGradient>
                </WrapperButtonsBottom>
              </SecondWrapper>
            </WrapperMap>
          ))}

          <EmptyDialog
            visible={modalAccount}
          >
            <MainWrapperDialog>
              <ScrollDialog>
                <ContentDialog>
                  <TitleBlack>Datos bancarios</TitleBlack>
                  <TextGray>Registra o modifica tu cuenta bancaria.</TextGray>
                  <ContentForm>
                    <WrapperInputs>
                      <Input title="Cuenta bancaria" holder="Ingrese tu número de cuenta" type="phone-pad" />
                      <InputPicker title="Tipo de cuenta" listdata={itemsAccount} />
                      <InputPicker title="Banco" listdata={itemsAccount} />
                    </WrapperInputs>
                  </ContentForm>
                  <TouchModal>
                    <ButtonGradient content="Confirmar" press={() => this.onPressButtonAccount()} />
                  </TouchModal>
                  <TouchModal>
                    <ButtonWhite content="Cancelar" press={() => this.OnHideModal()} />
                  </TouchModal>
                </ContentDialog>
              </ScrollDialog>
            </MainWrapperDialog>
          </EmptyDialog>

          <EmptyDialog
            visible={modalPassword}
          >
            <MainWrapperDialog style={{ height: '56%' }}>
              <ScrollDialog>
                <ContentDialog>
                  <TitleBlack>Cambiar tu contraseña</TitleBlack>
                  <TextGray>
                  Ingresa la contraseña anterior.
                  La nueva contraseña deberá tener entre 4 a 6 caracteres.
                  </TextGray>
                  <ContentForm>
                    <WrapperInputs>
                      <Input title="Clave anterior" holder="Ingrese la contraseña anterior" isPassword />
                      <Input title="Nueva clave" holder="Ingrese la contraseña nueva" isPassword />
                      <Input title="Confirmar clave" isPassword />
                    </WrapperInputs>
                  </ContentForm>
                  <TouchModal>
                    <ButtonGradient content="Confirmar" />
                  </TouchModal>
                  <TouchModal>
                    <ButtonWhite content="Cancelar" press={() => this.OnHideModal()} />
                  </TouchModal>
                </ContentDialog>
              </ScrollDialog>
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
  const { user, profile } = state;
  return {
    user,
    profile,
  };
};

const mapDispatchToProps = dispatch => ({
  getProfile: params => dispatch(ProfileActions.getProfileRequest(params)),
  editProfile: (id, data) => dispatch(ProfileActions.editProfileRequest(id, data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
