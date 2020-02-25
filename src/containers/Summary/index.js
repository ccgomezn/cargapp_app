import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import analytics from '@react-native-firebase/analytics';
import { ActivityIndicator } from 'react-native';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import {
  MainContainer,
  Map,
  Icon,
  Line,
  ColumnContainer,
  RowContainerAddresses,
  RowContainer,
  Title,
  SubTitle,
  NormalTitle,
  WrapperModal,
  BlueText,
  WrapperTextModal,
  GrayText,
  Check, WrapperButton,
  Touchable,
} from './style';
import ButtonGradient from '../../components/ButtonGradient';
import SummaryActions from '../../redux/reducers/SummaryRedux';
import EmptyDialog from '../../components/EmptyDialog';
import DocumentActions from '../../redux/reducers/DocumentRedux';
import OffersActions from '../../redux/reducers/OffersRedux';
import RateTypes from '../../redux/reducers/RateServiceRedux';
import Spinner from '../../components/Spinner';

class ScreenSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalRating: false,
      modalCheck: false,
      check1: false,
      check2: false,
      check3: false,
      load: false,
    };
  }

  componentDidMount() {
    moment.locale('es');
    analytics().setCurrentScreen('resumen_viaje');
    const { getSummary, navigation } = this.props;
    const offer = navigation.getParam('offer');
    getSummary(offer.id);
  }

  async onRegisterDoc(source, name, id) {
    const { registerDocument, profile } = this.props;
    const userId = profile.data[0].user.id;
    let photoName = source.fileName;
    if (source.fileName === '' || source.fileName === null) {
      photoName = `img_${source.fileSize}.jpg`;
    }
    const data = new FormData();
    data.append('service_document[document_type]', 'foto');
    data.append('service_document[document]', {
      name: photoName,
      uri: source.uri,
      type: source.type,
    });
    data.append('service_document[user_id]', userId);
    data.append('service_document[name]', name);
    data.append('service_document[active]', 1);
    data.append('service_document[service_id]', id);
    data.append('service_document[document_type_id]', 17);
    await registerDocument(data);
    this.setState({ modalRating: true, load: false });
  }

  rating(value, id) {
    analytics().logEvent('boton_encuesta');
    const { postRateServices, profile } = this.props;
    this.setState({ modalRating: false });
    if (value <= 3) {
      this.setState({ modalCheck: true });
    } else {
      this.confirmTest();
    }
    const data = {
      rate_service: {
        service_point: value,
        service_id: id,
        user_id: profile.data[0].user.id,
        driver_id: profile.data[0].user.id,
        active: true,
      },
    };
    setTimeout(() => {
      postRateServices(data);
    }, 1000);
  }

  async imageDocument(name, id) {
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
        this.onRegisterDoc(response, name, id);
      }
    }));
  }

  checked(value) {
    const { check1, check2, check3 } = this.state;
    if (value === 'check1') {
      this.setState({ check1: !check1 });
    } else if (value === 'check2') {
      this.setState({ check2: !check2 });
    } else if (value === 'check3') {
      this.setState({ check2: !check3 });
    }
  }

  confirmTest(id) {
    const { putStateOriginTravel, navigation } = this.props;
    const data = {
      service: {
        statu_id: 11,
      },
    };
    putStateOriginTravel(id, data);
    this.setState({ modalRating: false, modalCheck: false, load: true });
    setTimeout(() => {
      // navigation.navigate('Third');
      navigation.navigate('First');
    }, 1500);
  }

  render() {
    const { summary } = this.props;
    const {
      modalRating, modalCheck, check1, check2, check3, load,
    } = this.state;
    const starCount = 4;
    if (summary.data !== null) {
      console.log(summary.data);
      return (
        <MainContainer>
          <Spinner view={load} />
          <RowContainer>
            <Title>Resumen </Title>
            <Title>{moment(summary.data.service.updated_at).format('ll')}</Title>
          </RowContainer>
          <Map pitchEnabled={false} rotateEnabled={false} zoomEnabled={false} scrollEnabled={false}>
            <Map.Polyline
              coordinates={[
                {
                  latitude: summary.data.service.origin_latitude,
                  longitude: summary.data.service.origin_longitude,
                },
                {
                  latitude: summary.data.service.destination_latitude,
                  longitude: summary.data.service.destination_longitude,
                },
              ]}
              strokeWidth={4}
              strokeColor="#007aff"
            />
          </Map>
          <RowContainerAddresses>
            {/* eslint-disable-next-line global-require */}
            <Icon source={require('../../Images/Summary.png')} />
            <ColumnContainer>
              <ColumnContainer>
                <SubTitle>Inicio</SubTitle>
                <Title>
                  {summary.data.origin.name}
                </Title>
              </ColumnContainer>
              <ColumnContainer>
                <SubTitle>Detino</SubTitle>
                <Title>
                  {summary.data.destination.name}
                </Title>
              </ColumnContainer>
            </ColumnContainer>
          </RowContainerAddresses>
          <Line />
          <>
            <RowContainer>
              <SubTitle>Flete</SubTitle>
              <NormalTitle>
                $
                {summary.data.service.price}
              </NormalTitle>
            </RowContainer>
            <RowContainer>
              <SubTitle>Anticipo</SubTitle>
              <NormalTitle>$ 20'000.000</NormalTitle>
            </RowContainer>
            <RowContainer>
              <SubTitle>Saldo por pagar</SubTitle>
              <NormalTitle>$ 280'000.000</NormalTitle>
            </RowContainer>
          </>
          <Line />
          <ColumnContainer>
            <SubTitle>Generador de carga</SubTitle>
            <NormalTitle>
              {summary.data.generator.firt_name}
              {' '}
              {summary.data.generator.last_name}
            </NormalTitle>
          </ColumnContainer>
          <ColumnContainer>
            <SubTitle>Tipo de carga</SubTitle>
            <NormalTitle>{summary.data.service.description}</NormalTitle>
          </ColumnContainer>
          <RowContainer>
            <ColumnContainer>
              <SubTitle>Peso</SubTitle>
              <NormalTitle>{summary.data.service.load_weight}</NormalTitle>
            </ColumnContainer>
            <ColumnContainer>
              <SubTitle>Volumen</SubTitle>
              <NormalTitle>{summary.data.service.load_volume ? summary.data.service.load_volume : '000'}</NormalTitle>
            </ColumnContainer>
          </RowContainer>
          <EmptyDialog visible={modalCheck}>
            <WrapperModal>
              <WrapperTextModal>
                <BlueText>¿Por qué?</BlueText>
                <Touchable onPress={() => this.checked('check1')}>
                  <Check checked={check1} />
                  <GrayText>Mala comunicación</GrayText>
                </Touchable>
                <Touchable onPress={() => this.checked('check2')}>
                  <Check checked={check2} />
                  <GrayText>Confusión con carga</GrayText>
                </Touchable>
                <Touchable onPress={() => this.checked('check3')}>
                  <Check checked={check3} />
                  <GrayText>Problemas con el anticipo</GrayText>
                </Touchable>
                <ButtonGradient press={() => this.confirmTest(summary.data.service.id)} content="Aceptar" disabled={false} />
              </WrapperTextModal>
            </WrapperModal>
          </EmptyDialog>
          <EmptyDialog visible={modalRating}>
            <WrapperModal>
              <WrapperTextModal>
                <BlueText>Acabas de finalizar el viaje exitosamente</BlueText>
                <BlueText>¿Que tal estuvo tu viaje?</BlueText>
              </WrapperTextModal>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={starCount}
                selectedStar={rating => this.rating(rating, summary.data.service.id)}
                fullStarColor="#0068ff"
              />
            </WrapperModal>
          </EmptyDialog>
          <WrapperButton>
            <ButtonGradient press={() => this.imageDocument('Confimación cumplido', summary.data.service.id)} content="Subir cumplido" disabled={false} />
          </WrapperButton>
        </MainContainer>
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

ScreenSummary.propTypes = {
  getSummary: PropTypes.string.isRequired,
  postRateServices: PropTypes.string.isRequired,
  profile: PropTypes.string.isRequired,
  navigation: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  registerDocument: PropTypes.string.isRequired,
  putStateOriginTravel: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const {
    summary, rateService, profile, user, document, offers,
  } = state;
  return {
    summary,
    rateService,
    profile,
    user,
    document,
    offers,
  };
};

const mapDispatchToProps = dispatch => ({
  getSummary: id => dispatch(SummaryActions.getSummaryRequest(id)),
  postRateServices: data => dispatch(RateTypes.postRateServiceRequest(data)),
  registerDocument: params => dispatch(DocumentActions.postRegisterDocServiceRequest(params)),
  putStateOriginTravel:
    (id, data) => dispatch(
      OffersActions.putStateInTravelOriginRequest(id, data),
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScreenSummary);
