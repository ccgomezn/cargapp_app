/* eslint-disable global-require */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ActivityIndicator, Alert, Modal } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import PDFView from 'react-native-view-pdf';
import ImagePicker from 'react-native-image-picker';
import EmptyDialog from '../../components/EmptyDialog';
import {
  MainWrapper, ContentView, TextBlack, ContentBlock, ContentForm,
  WrapperInputs, RowContent, WrapperButtonsBottom, WrapperButtonGradient,
  ContentInitial, WrapperColumn, SecondWrapper, WrapperImage, Image,
  WrapperInfo, BoldText, NormalText, ContentButton,
  MainWrapperDialog, TouchModal, TitleBlack, TextGray,
  WrapperMap, ImageUser,
} from './style';

import Input from '../../components/GeneralInput';
import ButtonGradient from '../../components/ButtonGradient';
import ButtonWhite from '../../components/ButtonWhite';
import ProfileActions from '../../redux/reducers/ProfileRedux';
import PasswordActions from '../../redux/reducers/PasswordRedux';
import PopUpNotification from '../../components/PopUpNotifications';
import { Indicator, WrapperButtonImage } from '../Summary/style';
import { BlueTextPDF } from '../Travels/StartTravel/styles';
import Spinner from '../../components/Spinner';

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
      avatar: false,
      load: false,
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
      title: 'Vincular Documento',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tomar Foto',
      chooseFromLibraryButtonTitle: 'Elige de la biblioteca',
      customButtons: [],
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
        this.setState({ load: true });

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

        setTimeout(() => {
          this.setState({ load: false });
        }, 5000);
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
      avatar,
      load,
      avatarUser,
    } = this.state;
    const { profile } = this.props;
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
        if (avatarUser === '') {
          this.setState({ avatarUser: data.avatar });
        }
        if (name === '' && lastName === '') {
          this.setState({ name: data.profile.firt_name, lastName: data.profile.last_name });
        }
      });
      return (
        <MainWrapper>
          <Modal visible={avatar} style={{ zIndex: 1800 }}>
            <BlueTextPDF>Foto de perfil</BlueTextPDF>
            <ImageUser source={require('../../Images/profile.jpg')} />
            <PDFView
              fadeInDuration={0}
              style={{ flex: 1, marginTop: 10, zIndex: 100 }}
              resource={avatarUser}
              resourceType="url"
              onLoad={resourceType => console.log(`PDF rendered from ${resourceType}`)}
            />
            <Spinner view={load} />
            <WrapperButtonImage>
              <ButtonGradient press={() => this.changeImage()} content="Cambiar foto" disabled={false} />
              <ButtonWhite press={() => this.setState({ avatar: false })} content="Volver" border={false} />
            </WrapperButtonImage>
          </Modal>
          {profile.data.map(data => (
            <WrapperMap>
              <ContentInitial>
                <WrapperColumn>
                  /* <WrapperImage onPress={() => this.setState({ avatar: true, id: data.profile.id })} style={{ alignItems: 'center' }}> */
                  <WrapperImage>
                    <Image
                      source={require('../../Images/profile.jpg')}
                    />
                    /* <TextBlack style={{ fontSize: 14, color: '#0068ff', marginLeft: 25 }}>Editar</TextBlack> */
                  </WrapperImage>
                  <WrapperInfo>
                    <BoldText>{data.profile.firt_name}</BoldText>
                    <NormalText>Conductor</NormalText>
                  </WrapperInfo>
                  <ContentButton>
                    <ButtonGradient
                      content="Ver retos"
                      press={() => this.navigate('Points')}
                    />
                  </ContentButton>
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
