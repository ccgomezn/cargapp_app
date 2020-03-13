/* eslint-disable global-require */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ActivityIndicator, Alert } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-tiny-toast';
import EmptyDialog from '../../components/EmptyDialog';
import {
  MainWrapper, ContentView, TextBlack, ContentBlock, ContentForm,
  WrapperInputs, RowContent, WrapperButtonsBottom, WrapperButtonGradient,
  ContentInitial, WrapperColumn, SecondWrapper, WrapperImage,
  WrapperInfo, BoldText, NormalText,
  MainWrapperDialog, TouchModal, TitleBlack, TextGray,
  WrapperMap,
} from './style';

import Input from '../../components/GeneralInput';

import ButtonGradient from '../../components/ButtonGradient';
import ButtonWhite from '../../components/ButtonWhite';
import IconProfile from '../../components/IconProfile';
import ProfileActions from '../../redux/reducers/ProfileRedux';
import PasswordActions from '../../redux/reducers/PasswordRedux';
import PopUpNotification from '../../components/PopUpNotifications';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      modalPassword: false,
      name: '',
      lastName: '',
      fetch: true,
      notification: false,
      previousPassword: null,
      newPassword: null,
      repeatPassword: null,
      loadingAvatar: false,
      id: '',
      avatarUser: '',
    };
  }

  componentDidMount() {
    analytics().setCurrentScreen('mi_perfil');
    const { getProfile } = this.props;
    getProfile();
  }

  onPressButtonPassword() {
    analytics().setCurrentScreen('boton_perfil_cambiar_contrasena');
    this.setState({ modalPassword: true });
  }

  // eslint-disable-next-line react/sort-comp
  OnHideModal() {
    analytics().logEvent('boton_cancelar_cambio_contrasena');
    this.setState({ modalPassword: false });
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
    analytics().logEvent('boton_confirmar_cambio_contrasena');
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

  navigate(screen) {
    const { navigation } = this.props;
    if (screen === 'BankAccount') {
      navigation.navigate(screen);
      analytics().logEvent('boton_perfil_cuenta_bancaria');
    } else if (screen === 'DocumentsAccount') {
      analytics().logEvent('boton_perfil_documentos');
      navigation.navigate(screen);
    } else if (screen === 'Points') {
      analytics().logEvent('boton_ver_retos');
      navigation.navigate(screen);
    }
  }

  changeImage() {
    const { editProfile } = this.props;
    const { id } = this.state;
    const options = {
      title: 'Actualizar avatar',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tomar Foto',
      chooseFromLibraryButtonTitle: 'Elige de la biblioteca',
      customButtons: [],
      tintColor: '#010935',
      quality: 0.5,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, ((response) => {
      if (response.didCancel) {
        console.log(response);
      } else if (response.error) {
        console.log(response);
      } else {
        this.setState({ loadingAvatar: true });

        const data = new FormData();
        let photoName = response.fileName;
        if (response.fileName === '' || response.fileName === null) {
          photoName = `img_${response.fileSize}.jpg`;
        }
        data.append('profile[avatar]', {
          name: photoName,
          uri: response.uri,
          type: response.type,
        });

        editProfile(id, data);
      }
    }));
  }

  render() {
    const {
      modalPassword,
      name,
      lastName,
      fetch,
      notification,
      previousPassword,
      newPassword,
      repeatPassword,
      loadingAvatar,
      avatarUser,
    } = this.state;
    const { profile } = this.props;

    console.log('avatar', avatarUser);

    if (loadingAvatar) {
      if (!profile.fetching) {
        console.log('profile-load', profile);
        if (profile.edit && !profile.error) {
          // register ok
          this.setState({
            avatarUser: profile.edit.avatar,
            loadingAvatar: false,
          });
        } else if (profile.error) {
          this.setState({ loadingAvatar: false, error: 'Tienes 1 o más documentos no validos.' });
        }
      }
    }

    if (profile.data !== null) {
      profile.data.map((data) => {
        if (name === '' && lastName === '') {
          this.setState({
            name: data.profile.firt_name,
            lastName: data.profile.last_name,
            fetch: false,
            id: data.profile.id,
            avatarUser: data.profile.avatar,
          });
        }
      });
    }
    if (profile.data !== null && !fetch) {
      profile.data.map((data) => {
        if (avatarUser === '') {
          this.setState({ avatarUser: data.profile.avatar });
        }
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
                    <IconProfile
                      // icon="https://avatars1.githubusercontent.com/u/25873769?s=460&u=4852b9c1d777bc1dbca820c1dca5bf1e86aa2b15&v=4"
                      icon={avatarUser}
                      edit
                      press={() => this.changeImage()}
                    />
                  </WrapperImage>
                  <WrapperInfo>
                    <BoldText>{data.profile.firt_name}</BoldText>
                    <NormalText>Conductor</NormalText>
                  </WrapperInfo>
                </WrapperColumn>
              </ContentInitial>

              <SecondWrapper>

                <ContentView>
                  <RowContent style={{ marginRight: '2%' }}>
                    <ButtonWhite border content="Cambiar contraseña" press={() => this.onPressButtonPassword()} />
                  </RowContent>
                  <RowContent>
                    <ButtonWhite border content="Cuenta Bancaria" press={() => this.navigate('BankAccount')} />
                  </RowContent>
                </ContentView>

                <ContentView>
                  <RowContent style={{ marginRight: '2%' }}>
                    <ButtonWhite border content="Documentación" press={() => this.navigate('DocumentsAccount')} />
                  </RowContent>
                </ContentView>

                <ContentView>
                  <ContentBlock>
                    <TextBlack>Información de perfil</TextBlack>
                  </ContentBlock>
                </ContentView>

                <ContentForm>
                  <WrapperInputs>
                    <Input
                      title="Correo electrónico"
                      type="email-address"
                      value={data.user.email}
                      editable={false}
                    />
                    <Input
                      title="Nombre"
                      value={name}
                      onChangeText={text => this.setState({ name: text })}
                    />
                    <Input
                      title="Apellido"
                      value={lastName}
                      onChangeText={text => this.setState({ lastName: text })}
                    />
                    <Input
                      title="Cédula"
                      holder="Ingrese número de documento"
                      type="numeric"
                      value={data.user.identification}
                      editable={false}
                    />
                    <Input
                      title="Celular"
                      holder="Ingrese número de documento"
                      value={data.profile.phone ? data.profile.phone.slice(2, 12) : data.profile.phone}
                      editable={false}
                    />
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
          <Toast
            visible={loadingAvatar}
            position={0}
            loading
            shadow
            animation
          >
            Actualizando Perfil...
          </Toast>
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
