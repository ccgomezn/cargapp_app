/* eslint-disable import/no-named-as-default-member */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';
import analytics from '@react-native-firebase/analytics';
import { ActivityIndicator, Modal } from 'react-native';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import PDFView from 'react-native-view-pdf';
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
  GrayText, Indicator,
  Check, WrapperButton,
  Touchable, WrapperButtonImage,
} from './style';
import ButtonGradient from '../../components/ButtonGradient';
import SummaryActions from '../../redux/reducers/SummaryRedux';
import EmptyDialog from '../../components/EmptyDialog';
import DocumentActions from '../../redux/reducers/DocumentRedux';
import OffersActions from '../../redux/reducers/OffersRedux';
import RateTypes from '../../redux/reducers/RateServiceRedux';
import Spinner from '../../components/Spinner';
import PopUpNotification from '../../components/PopUpNotifications';

import { formatPrice } from '../../helpers/Utils';

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
      documentConfirm: false,
      proofOfPayment: '',
      modalPDF: false,
      errorProofOfPayment: false,
    };
  }

  componentDidMount() {
    moment.locale('es');
    analytics().setCurrentScreen('resumen_viaje');
    const { getSummary, navigation, getDocsServiceRequest } = this.props;
    const offer = navigation.getParam('offer');
    if (offer.id) {
      getSummary(offer.id);
      getDocsServiceRequest(offer.id);
    }
  }

  async onRegisterDoc(source, name, id) {
    const { registerDocument, profile } = this.props;
    const userId = profile.data[0].user.id;
    let photoName = source.fileName;
    if (source.fileName === '' || source.fileName === null) {
      photoName = `img_${source.fileSize}.jpg`;
    }
    const data = new FormData();
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

  async imageDocument(name, id, bool) {
    const { modalRating } = this.state;
    if (!bool) {
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
    } else if (!modalRating) {
      this.setState({ modalRating: true });
    }
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
      navigation.navigate('Third', { isSummary: true });
    }, 1500);
  }

  openImage() {
    const { document } = this.props;
    const { serviceDocuments } = document;
    serviceDocuments.map((data) => {
      // Id document to read
      if (data.document_type_id === 38) {
        this.setState({ proofOfPayment: data.document, modalPDF: true });
      }
      return null;
    });
  }

  render() {
    const { summary, navigation } = this.props;
    const {
      modalRating, modalCheck,
      check1, check2, check3,
      load, documentConfirm, modalPDF,
      proofOfPayment, errorProofOfPayment,
    } = this.state;
    const starCount = 4;
    if (summary.data !== null && !summary.fetching) {
      const { document_services } = summary.data;
      document_services.map((doc) => {
        if (doc.name === 'Confimacion de cumplido' && !documentConfirm) {
          this.setState({ documentConfirm: true });
        }
        return null;
      });
      return (
        <MainContainer>
          {errorProofOfPayment && (
          <PopUpNotification
            onTouchOutside={() => this.setState({ errorProofOfPayment: false })}
            mainText="Algo falló"
            subText="Intentalo de nuevo más tarde"
          />
          )}
          <Modal visible={modalPDF}>
            <Indicator
              size="large"
              color="#0000ff"
            />
            <PDFView
              fadeInDuration={0}
              style={{ flex: 1, marginTop: 80, zIndex: 100 }}
              resource={proofOfPayment}
              resourceType="url"
              onLoad={resourceType => console.log(`PDF rendered from ${resourceType}`)}
              onError={() => this.setState({ errorProofOfPayment: true })}
            />
            <WrapperButtonImage>
              <ButtonGradient press={() => this.setState({ modalPDF: false })} content="Volver" disabled={false} />
            </WrapperButtonImage>
          </Modal>
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
                <SubTitle>
                  Inicio:
                  {moment(summary.data.service.created_at).format('ll')}
                </SubTitle>
                <Title>
                  {summary.data.origin.name}
                  {': '}
                  {summary.data.service.origin_address.length > 20 ? `${summary.data.service.origin_address.substring(0, 17)}...` : summary.data.service.origin_address }
                </Title>
              </ColumnContainer>
              <ColumnContainer>
                <SubTitle>
                  Detino:
                  {moment(summary.data.service.updated_at).format('ll')}
                </SubTitle>
                <Title>
                  {summary.data.destination.name}
                  {': '}
                  {summary.data.service.destination_address.length > 20 ? `${summary.data.service.destination_address.substring(0, 17)}...` : summary.data.service.destination_address }
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
                { formatPrice(summary.data.service.price)}
              </NormalTitle>
            </RowContainer>
            <RowContainer>
              <SubTitle>Anticipo</SubTitle>
              <NormalTitle>
                $
                { formatPrice(summary.data.service.price * 0.70)}
              </NormalTitle>
            </RowContainer>
            <RowContainer>
              <SubTitle>Saldo por pagar</SubTitle>
              <NormalTitle>
                $
                {summary.data.service.statu_id !== 50 ? formatPrice(summary.data.service.price * 0.30) : 0}
              </NormalTitle>
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
          <RowContainer style={{ justifyContent: 'flex-start' }}>
            <ColumnContainer style={{ marginRight: 10 }}>
              <SubTitle>Peso</SubTitle>
              <NormalTitle>{summary.data.service.load_weight}</NormalTitle>
            </ColumnContainer>
            <ColumnContainer>
              <SubTitle>Volumen</SubTitle>
              <NormalTitle>{summary.data.service.load_volume ? summary.data.service.load_volume : 'N/A'}</NormalTitle>
            </ColumnContainer>
          </RowContainer>
          <ColumnContainer>
            <SubTitle>Vehículo</SubTitle>
            <NormalTitle>
              {summary.data.vehicle.brand}
              {' '}
              {summary.data.vehicle.model}
              {'\n'}
              {summary.data.vehicle.plate}
            </NormalTitle>
          </ColumnContainer>
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
            {summary.data.service.statu_id === 19 && (
              <ButtonGradient press={() => this.imageDocument('Confimacion de cumplido', summary.data.service.id, documentConfirm)} content="Cargar cumplido" disabled={false} />
            ) }
            {summary.data.service.statu_id === 11 && (
              <ButtonGradient press={() => navigation.goBack()} content="Volver" disabled={false} />
            ) }
            {summary.data.service.statu_id === 50 && (
              <ButtonGradient press={() => this.openImage()} content="Ver comprobante de pago" disabled={false} />
            ) }
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
  serviceDocuments: PropTypes.string.isRequired,
  document: PropTypes.string.isRequired,
  getDocsServiceRequest: PropTypes.string.isRequired,
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
  getDocsServiceRequest: id => dispatch(DocumentActions.getDocsServiceRequest(id)),
  putStateOriginTravel:
    (id, data) => dispatch(
      OffersActions.putStateInTravelOriginRequest(id, data),
    ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScreenSummary);
