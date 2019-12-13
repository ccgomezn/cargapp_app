/* eslint-disable no-else-return */
/* eslint-disable no-lonely-if */
/* eslint-disable global-require */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-tiny-toast';
import { ActivityIndicator } from 'react-native';

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
import ParametersActions from '../../../redux/reducers/ParametersRedux';

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      user_id: '',
      error: null,
      visible_error: false,
      loadingRegister: false,
      listStatus: [
        { id: '4', status: '' },
        { id: '5', status: '' },
        { id: '7', status: '' },
        { id: '8', status: '' },
      ],
      document_load: '',
    };
  }

  componentDidMount() {
    const { navigation, getparameters } = this.props;
    const dtuser = navigation.getParam('userdata', '');
    // get documents
    getparameters('DOCUMENTS_LOGIN');
    if (dtuser !== '') {
      this.setState({ user_id: dtuser.user.id });
    }
  }

  onValidateStep() {
    const { user, navigation, parameters } = this.props;
    const { navigate } = this.props.navigation;
    // get step process
    const stepUser = navigation.getParam('stepUser', null);
    console.log(user);
    const { rol } = user.acount;
    console.log(stepUser);
    if (stepUser !== null) {
      if (stepUser === 3) {
        // documents ó data personal
        console.log(parameters);
        const docVisible = parameters.data.parameters[0].code;
        alert(`--${rol}----${docVisible}`);
        console.log(docVisible);
        if (docVisible === 'false') {
          navigate('Personal', { idrol: rol });
        }
        if (rol === 11 || rol === '') {
          // validar Document Active
        } else {
          // datarol: Generator
          // navigate('Personal', { idrol: datarol });
        }
      }
    } else {
      // validar Document Active
      const docVisible = parameters.data.parameters[0].code;
      if (!docVisible === 'true') {
        navigate('Personal', { idrol: rol });
      }
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
    let countfail = listStatus.length;
    this.setState({ error: null });
    // validate status correct
    listStatus.forEach((element) => {
      if (element.status === 'correct') {
        countok += 1;
        countfail -= 1;
      }
    });
    if (countok === 4) {
      navigate('Personal');
    } else {
      this.setState({ error: `Faltan (${countfail}) documentos por subir` });
    }
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { document, parameters } = this.props;
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
        if (document.status && !document.unprocess) {
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

    if (parameters.data !== null && !parameters.fetching) {
      console.log(parameters);
      this.onValidateStep();
      return (
        <MainWrapper>
          <WrapperButtons style={{ justifyContent: 'center', marginTop: '0%', marginBottom: '2%' }}>
            <ArrowBack url={() => goBack()} />
            <SvgUri source={{ uri: 'https://cargapplite2.nyc3.digitaloceanspaces.com/cargapp/logo3x.png' }} />
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
                mainText="Cédula de ciudadania"
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
                mainText="Cédula de ciudadania"
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
            duration={Toast.duration.LONG}
            shadow
            animation
          >
            Error, no se pudo procesar la solicitud
          </Toast>
        </MainWrapper>
      );
    } else {
      return (
        <ActivityIndicator
          style={{ alignSelf: 'center', height: '100%' }}
          size="large"
          color="#0000ff"
        />
      );
    }
  }
}

// export default Registration;
const mapStateToProps = (state) => {
  const { user, document, parameters } = state;
  return {
    user,
    document,
    parameters,
  };
};

const mapDispatchToProps = dispatch => ({
  // registerUser: params => dispatch(UserActions.postRegisterRequest(params)),
  registerDocument: params => dispatch(DocumentActions.postRegisterDocRequest(params)),
  getparameters: params => dispatch(ParametersActions.parametersRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
