/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
/* eslint-disable no-return-assign */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-else-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-tiny-toast';
import {
  MainWrapper, TextBlack, ContentBlock, TextGray,
  WrapperDocument, RowDocument, WrapperError, TextError,
  MainWrapperDialog, ContentDialog, WrapperImage, ImageDetail, TextModalGray,
  WrapperTitle, TitleDesc, WrapperButtonsBottom, WrapperButtonGradient, NextWrapperDialog,
} from './style';

import Card from '../../../components/ComponentCard';
import EmptyDialog from '../../../components/EmptyDialog';
import ButtonGradient from '../../../components/ButtonGradient';
import ButtonWhite from '../../../components/ButtonWhite';

import DocumentActions from '../../../redux/reducers/DocumentRedux';
import DocumentVehActions from '../../../redux/reducers/DocumentVehicleRedux';

class PhotoVehicle extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      visible_error: false,
      loadingRegister: false,
      loadingUpdate: false,
      listStatus: [],
      document_load: '',
      init: false,
      modalEdit: false,
      activeEdit: null,
      idVehicle: null,
      didMount: false,
      modalNext: false,
    };
  }

  componentDidMount() {
    const { getDocumentsTypes, getDocumentsVehicleMe } = this.props;
    const { navigation } = this.props;
    // get vehicle id
    const vehicleId = navigation.getParam('vehicleId', null);
    if (vehicleId !== null) {
      this.setState({ idVehicle: vehicleId });
    }
    console.log('didmountPhotos');
    getDocumentsTypes('VehiclePhotos');
    getDocumentsVehicleMe(vehicleId);
    this.setState({ didMount: true });
  }

  componentWillUnmount() {
    const { dropDocumentsState } = this.props;
    dropDocumentsState();
  }

  async onRegisterDoc(id_type, id_doc, source) {
    const { listStatus, idVehicle } = this.state;
    const { user, registerDocumentVeh } = this.props;
    const oldList = listStatus;
    const userId = user.info.user.id;

    if (userId !== '') {
      let photoName = source.fileName;
      if (source.fileName === '' || source.fileName === null) {
        photoName = `img_${source.fileSize}.jpg`;
      }
      const data = new FormData();
      data.append('vehicle_document[document_type_id]', id_doc);
      data.append('vehicle_document[file]', {
        name: photoName,
        uri: source.uri,
        type: source.type,
      });
      data.append('vehicle_document[statu_id]', 13);
      data.append('vehicle_document[user_id]', userId);
      data.append('vehicle_document[expire_date]', 1705507702);
      data.append('vehicle_document[approved]', false);
      data.append('vehicle_document[active]', 1);
      data.append('vehicle_document[vehicle_id]', idVehicle);

      console.log(data);
      await registerDocumentVeh(data);
      this.setState({ loadingUpdate: false, loadingRegister: true });
      oldList[id_type].status = 'loading';
    } else {
      this.setState({ visible_error: true });
      oldList[id_type].status = 'fail';
    }
    this.setState({ listStatus: oldList, document_load: id_type });
  }

  onPressEdit(item) {
    this.setState({ modalEdit: true, activeEdit: item });
  }

  onPressButtonDoc(item) {
    const { deleteDocVehicle } = this.props;
    const { listStatus, activeEdit } = this.state;
    const oldList = listStatus;
    this.setState({ error: null, modalEdit: false });

    const options = {
      title: activeEdit === null ? 'Vincular Documento' : 'Actualizar Documento',
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

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        // user cancelled image picker
        if (activeEdit === null) {
          oldList[item].status = 'fail';
          this.setState({ error: 'Tienes 1 o más documentos invalidos' });
        }
      } else if (response.error) {
        // Error imagePicker
        oldList[item].status = 'fail';
        this.setState({ error: 'Tienes 1 o más documentos con formato incorrecto' });
      } else {
        // image ok
        const idDoc = oldList[item].id;
        oldList[item].status = 'loading';
        if (activeEdit !== null) {
          const idItem = listStatus[activeEdit].dataEdit.id;
          this.setState({ loadingUpdate: true });
          deleteDocVehicle(idItem);
        }
        this.onRegisterDoc(item, idDoc, response);
      }

      // end process
      this.setState({ listStatus: oldList });
    });
  }

  onRemoveDoc() {
    const { activeEdit } = this.state;
    this.setState({ error: null });
    this.onPressButtonDoc(activeEdit);
  }

  OnHideModal() {
    this.setState({
      modalEdit: false,
      activeEdit: null,
      error: null,
      modalNext: false,
    });
  }

  nextStep() {
    this.setState({ modalNext: true });
  }

  finalyStep() {
    const { navigation } = this.props;
    this.setState({ modalNext: false });
    setTimeout(() => {
      navigation.replace('ListVehicle');
    });
  }

  render() {
    const { document, getDocumentsVehicleMe, documentVehicle } = this.props;
    const {
      init, listStatus, error, visible_error, loadingRegister, document_load,
      modalEdit, activeEdit, loadingUpdate, idVehicle, didMount, modalNext,
    } = this.state;
    const initStatus = [];
    const oldList = listStatus;

    console.log('documentPhotoRender', documentVehicle);

    // hide Toast
    if (visible_error) {
      setTimeout(() => this.setState({
        visible_error: false,
      }), 5000); // hide toast after 5s
    }

    // validate register User
    if (loadingRegister) {
      if (documentVehicle.error && !documentVehicle.fetching) {
        // error api
        oldList[document_load].status = 'error';
        this.setState({
          listStatus: oldList,
          loadingRegister: false,
          visible_error: true,
          error: 'Tienes 1 o más documentos erroneos.',
        });
      }
      if (documentVehicle.status && !documentVehicle.fetching) {
        if (documentVehicle.status && !documentVehicle.unprocess) {
          // register ok
          oldList[document_load].status = 'correct';
          this.setState({
            listStatus: oldList,
            loadingRegister: false,
            init: false,
            didMount: true,
          });
          getDocumentsVehicleMe(idVehicle);
        } else if (loadingRegister && documentVehicle.unprocess) {
          oldList[document_load].status = 'fail';
          this.setState({ listStatus: oldList, loadingRegister: false, error: 'Tienes 1 o más documentos no validos.' });
          this.setState({ loadingRegister: false });
        }
      }
    }

    if (document.listTypes !== null
      && !document.fetchingTypes
      && !documentVehicle.fetchingList
      && documentVehicle.listDocuments !== null
      && (didMount)) {
      if (!init) {
        { document.listTypes.map(data => (
          initStatus[data.id] = {
            id: data.id,
            status: '',
            edit: false,
            dataEdit: null,
            title: data.name,
          }
        )); }
        const titleData = initStatus;

        // docs me
        { documentVehicle.listDocuments.map((datalist) => {
          if (titleData[datalist.document_type_id] !== undefined) {
            initStatus[datalist.document_type_id] = {
              id: datalist.document_type_id,
              status: 'correct',
              edit: true,
              dataEdit: datalist,
              title: titleData[datalist.document_type_id].title,
            };
          }
        }); }
        this.setState({ init: true, listStatus: initStatus });
      }

      return (
        <MainWrapper>
          <ContentBlock>
            <TextBlack>Fotografías</TextBlack>
            <TextGray>
              Fotos requeridas para validar tu vehículo.
            </TextGray>
          </ContentBlock>

          <WrapperError>
            { error ? (
              <TextError>
                {error}
              </TextError>
            ) : null }
          </WrapperError>

          <WrapperDocument>
            { document.listTypes.map(data => (
              <RowDocument>
                <Card
                  key={data.id}
                  background="white"
                  mainText={data.name}
                  subText={data.description}
                  icon
                  status={listStatus.length === 0 ? '' : listStatus[data.id] === undefined ? '' : listStatus[data.id].status}
                  colorText="black"
                  borderColorProp="#ecf0f1"
                  press={() => this.onPressButtonDoc(data.id)}
                  edit={listStatus.length === 0 ? false : listStatus[data.id] === undefined ? false : listStatus[data.id].edit}
                  pressEdit={() => this.onPressEdit(data.id)}
                />
              </RowDocument>
            ))}
          </WrapperDocument>

          <WrapperButtonsBottom style={{ marginBottom: 35 }}>
            <WrapperButtonGradient>
              <ButtonGradient content="Finalizar" press={() => this.nextStep()} />
            </WrapperButtonGradient>
          </WrapperButtonsBottom>

          <Toast
            visible={visible_error}
            position={-50}
            duration={Toast.duration.LONG}
            shadow
            animation
          >
            Error, no se pudo procesar la solicitud
          </Toast>
          <Toast
            visible={loadingRegister}
            position={0}
            loading
            shadow
            animation
          >
            Subiendo Foto...
          </Toast>
          <Toast
            visible={loadingUpdate}
            position={0}
            loading
            shadow
            animation
          >
            Eliminado Foto...
          </Toast>

          <EmptyDialog
            visible={modalEdit}
            opacity={0.5}
            onTouchOutside={() => this.OnHideModal()}
          >
            <MainWrapperDialog>
              { modalEdit ? (
                <ContentDialog>
                  <WrapperTitle>
                    <TitleDesc>
                      {listStatus[activeEdit].title}
                    </TitleDesc>
                  </WrapperTitle>
                  <WrapperImage>
                    <ImageDetail
                      resizeMode="contain"
                      source={{ uri: listStatus[activeEdit].dataEdit.file }}
                    />
                  </WrapperImage>
                  <WrapperButtonsBottom style={{ marginTop: 10 }}>
                    <ButtonGradient
                      content="Actualizar"
                      press={() => this.onRemoveDoc()}
                    />
                  </WrapperButtonsBottom>
                  <WrapperButtonsBottom style={{ marginTop: 0 }}>
                    <ButtonWhite
                      content="Cerrar"
                      border={{ }}
                      press={() => this.OnHideModal()}
                    />
                  </WrapperButtonsBottom>
                </ContentDialog>
              ) : null }
            </MainWrapperDialog>
          </EmptyDialog>

          <EmptyDialog
            visible={modalNext}
            opacity={0.5}
            onTouchOutside={() => this.OnHideModal()}
          >
            <NextWrapperDialog>
              <ContentDialog>
                <WrapperTitle>
                  <TitleDesc>
                    Recuerda!!
                  </TitleDesc>
                  <TextModalGray>
                    Todas las fotografías son requeridas
                    {'\n'}
                    para verificar el vehículo.
                    {'\n'}
                    En cualquier momento puedes actualizar
                    {'\n'}
                    todos los documentos.
                    {'\n'}
                  </TextModalGray>
                </WrapperTitle>
                <WrapperButtonsBottom style={{ marginTop: 10 }}>
                  <ButtonGradient
                    content="Finalizar"
                    press={() => this.finalyStep()}
                  />
                </WrapperButtonsBottom>
                <WrapperButtonsBottom style={{ marginTop: 0 }}>
                  <ButtonWhite
                    content="Cerrar"
                    press={() => this.OnHideModal()}
                  />
                </WrapperButtonsBottom>
              </ContentDialog>
            </NextWrapperDialog>
          </EmptyDialog>
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
  const { user, document, documentVehicle } = state;
  return {
    user,
    document,
    documentVehicle,
  };
};

const mapDispatchToProps = dispatch => ({
  getDocumentsTypes: category => dispatch(DocumentActions.getDocsTypesRequest(category)),
  dropDocumentsState: params => dispatch(DocumentActions.dropInitialState(params)),
  registerDocumentVeh: params => dispatch(DocumentVehActions.postRegisterDocVehicleRequest(params)),
  getDocumentsVehicleMe: idVehicle => dispatch(DocumentVehActions.getDocsVehicleMeRequest(idVehicle)),
  deleteDocVehicle: id => dispatch(DocumentVehActions.removeDocVehicleRequest(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PhotoVehicle);
