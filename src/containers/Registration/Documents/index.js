/* eslint-disable global-require */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-root-toast';

import Card from '../../../components/ComponentCard';
import ArrowBack from '../../../components/ArrowBack';
import {
  MainWrapper,
  TextBlack,
  TextBlue,
  TextGray,
  SvgUri,
  TextTerms,
  WrapperButtons,
  WrapperButtonsBottom,
  WrapperButtonGradient,
  WrapperDocument,
  RowDocument,
  WrapperError,
  TextError,
} from '../style';
import ButtonGradient from '../../../components/ButtonGradient';

// action - reducers
import DocumentActions from '../../../redux/reducers/DocumentRedux';

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      user_id: '',
      error: null,
      visible_error: false,
      loadingRegister: false,
      listStatus: [
        { id: '4', status: 'correct' },
        { id: '5', status: 'correct' },
        { id: '7', status: 'correct' },
        { id: '8', status: 'fail' },
      ],
      document_load: '',
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const dtuser = navigation.getParam('userdata', '');
    if (dtuser !== '') {
      this.setState({ user_id: dtuser.user.id });
    }
  }

  async onRegisterDoc(id_type, id_doc, source) {
    const { user_id, listStatus } = this.state;
    const { registerDocument } = this.props;
    const oldList = listStatus;
    if (user_id !== '') {
      let photoName = source.fileName;
      if (source.fileName === '' || source.fileName === null) {
        photoName = `img_${source.fileSize}.jpg`;
      }
      const data = new FormData();
      data.append('document[document_type_id]', id_doc);
      data.append('document[file]', {
        name: photoName,
        uri: source.uri,
        type: source.type,
      });
      data.append('document[statu_id]', 13);
      data.append('document[user_id]', user_id);
      data.append('document[expire_date]', 12292292);
      data.append('document[approved]', false);
      data.append('document[active]', 1);

      await registerDocument(data);
      this.setState({ loadingRegister: true });
      oldList[id_type].status = 'loading';
    } else {
      this.setState({ visible_error: true });
      oldList[id_type].status = 'fail';
    }
    this.setState({ listStatus: oldList, document_load: id_type });
  }

  onPressButtonDoc(id_type) {
    const { listStatus } = this.state;
    const oldList = listStatus;
    this.setState({ error: null });

    const options = {
      title: 'Vincular Documento',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tomar Foto',
      chooseFromLibraryButtonTitle: 'Elige de la biblioteca',
      customButtons: [],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        // user cancelled image picker
        oldList[id_type].status = 'fail';
        this.setState({ error: 'Tienes 1 o más documentos invalidos' });
      } else if (response.error) {
        // Error imagePicker
        oldList[id_type].status = 'fail';
        this.setState({ error: 'Tienes 1 o más documentos con formato incorrecto' });
      } else {
        // image ok
        const id_doc = oldList[id_type].id;
        oldList[id_type].status = 'loading';
        this.onRegisterDoc(id_type, id_doc, response);
      }

      // end process
      this.setState({ listStatus: oldList });
    });
  }

  onValidateForm() {
    const { listStatus } = this.state;
    const { navigate } = this.props.navigation;
    let countok = 0;
    this.setState({ error: null });
    // validate status correct
    listStatus.forEach((element) => {
      if (element.status === 'correct') {
        countok += 1;
      }
    });
    if (countok === 4) {
      navigate('ScreenHome');
    } else {
      this.setState({ error: `Faltan (${countok}) documentos por subir` });
    }
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { document } = this.props;
    const { goBack } = this.props.navigation;
    const {
      listStatus, loadingRegister, document_load, error, visible_error,
    } = this.state;

    const oldList = listStatus;

    // hide Toast
    if (visible_error) {
      setTimeout(() => this.setState({
        visible_error: false,
      }), 5000); // hide toast after 5s
    }

    // validate register User
    if (loadingRegister) {
      if (document.error && !document.fetching) {
        // error api
        oldList[document_load].status = 'error';
        this.setState({
          listStatus: oldList,
          loadingRegister: false,
          visible_error: true,
          error: 'Tienes 1 o más documentos erroneos.',
        });
      }
      if (document.status && !document.fetching) {
        if (document.status) {
          // register ok
          oldList[document_load].status = 'correct';
          this.setState({ listStatus: oldList, loadingRegister: false });
        } else if (loadingRegister && document.unprocess) {
          oldList[document_load].status = 'fail';
          this.setState({ listStatus: oldList, loadingRegister: false, error: 'Tienes 1 o más documentos no validos.' });
          this.setState({ loadingRegister: false });
        }
      }
    }

    return (
      <MainWrapper contentContainerStyle={{ flex: 1 }}>
        <WrapperButtons style={{ justifyContent: 'center', marginVertical: 0, marginBottom: '3%' }}>
          <ArrowBack url={() => goBack()} />
          <SvgUri source={require('../../../Images/Logo3x.png')} />
        </WrapperButtons>
        <TextBlack>
          Documentos para
          <TextBlue>
            {' '}
            vinculación
          </TextBlue>
        </TextBlack>
        <TextGray>
          Este es el último paso, para terminar su registro necesitamos...
        </TextGray>
        <WrapperDocument>
          <RowDocument>
            <Card
              logo="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/document.svg"
              background="white"
              mainText="Licencia de conducción"
              subText="(Cara frontal)"
              icon
              status={listStatus[0].status}
              colorText="black"
              borderColorProp="#ecf0f1"
              press={() => this.onPressButtonDoc(0)}
            />
          </RowDocument>
          <RowDocument>
            <Card
              logo="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/document.svg"
              background="white"
              mainText="Licencia de conducción"
              subText="(Cara trasera)"
              icon
              status={listStatus[1].status}
              colorText="black"
              borderColorProp="#ecf0f1"
              press={() => this.onPressButtonDoc(1)}
            />
          </RowDocument>
          <RowDocument>
            <Card
              logo="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/document.svg"
              background="white"
              mainText="Cedúla de ciudadania"
              subText="(Cara frontal)"
              icon
              status={listStatus[2].status}
              colorText="black"
              borderColorProp="#ecf0f1"
              press={() => this.onPressButtonDoc(2)}
            />
          </RowDocument>
          <RowDocument>
            <Card
              logo="https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/document.svg"
              background="white"
              mainText="Cedúla de ciudadania"
              subText="(Cara trasera)"
              icon
              status={listStatus[3].status}
              colorText="black"
              borderColorProp="#ecf0f1"
              press={() => this.onPressButtonDoc(3)}
            />
          </RowDocument>
        </WrapperDocument>
        <WrapperError>
          { error ? (
            <TextError>
              {error}
            </TextError>
          ) : null }
        </WrapperError>
        <WrapperButtonsBottom>
          <WrapperButtonGradient>
            <ButtonGradient content="Continuar" press={() => this.onValidateForm()} />
          </WrapperButtonGradient>
        </WrapperButtonsBottom>
        <TextTerms>© Todos los derechos reservados. Cargapp 2019</TextTerms>
        <Toast
          visible={visible_error}
          position={-50}
          duration={Toast.durations.LONG}
          opacity={0.8}
          shadow
          animation
        >
          Error, no se pudo procesar la solicitud
        </Toast>
      </MainWrapper>
    );
  }
}

// export default Registration;

const mapStateToProps = (state) => {
  const { user, document } = state;
  return {
    user,
    document,
  };
};

const mapDispatchToProps = dispatch => ({
  // registerUser: params => dispatch(UserActions.postRegisterRequest(params)),
  registerDocument: params => dispatch(DocumentActions.postRegisterDocRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
