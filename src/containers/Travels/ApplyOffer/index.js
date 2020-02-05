/* eslint-disable react/no-unused-state */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable radix */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import MapView from 'react-native-maps';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import analytics from '@react-native-firebase/analytics';
import { View } from 'native-base';
import {
  MainWrapper, AddressesWrapper, WrapperModal, BlueText, WrapperTextModal,
} from './style';
import CardMapBeginTravel from '../../../components/CardMapBeginTravel';
import AddressesCardMap from '../../../components/AddressesCardMap';
import CompanyActions from '../../../redux/reducers/CompanyRedux';
import OffersActions from '../../../redux/reducers/OffersRedux';
import RateActions from '../../../redux/reducers/RateServiceRedux';
import PopUpNotification from '../../../components/PopUpNotifications';
import EmptyDialog from '../../../components/EmptyDialog';
import ButtonGradient from '../../../components/ButtonGradient';
import { formatPrice } from '../../../helpers/Utils';
import {
  ContentDialog, MainWrapperDialog, TextGray, TitleBlack,
} from '../../Profile/style';
import { ContentForm, WrapperButtonsBottom } from '../../HomeOffers/style';
import CardPermissions from '../../../components/CardPermissions';
import PermissionsActions from '../../../redux/reducers/PermissionsRedux';

const itemList = [
  {
    label: 'Perfil',
    url: 'ScreenProfile',
  },
  {
    label: 'Documentos',
    url: 'ScreenProfile',
  },
  {
    label: 'Mis Vehículos',
    url: 'ScreenVehicle',
  },
  {
    label: '¿Dónde te pagamos?',
    url: 'BankAccount',
  },
];

class ApplyOffer extends Component {
  constructor() {
    super();
    this.state = {
      offer: null,
      successNotification: false,
      errorFalse: false,
      fetch: false,
      fetchList: false,
      fetchError: false,
      fetchSuccess: false,
      fetchID: false,
      valueApplyOffer: null,
      showTravel: false,
      modalFinish: false,
      modalRate: false,
      modalApply: false,
      modalPermission: false,
      permissionApply: false,
      listview: ['profiles', 'documents', 'vehicles', 'bank_accounts'],
    };
  }

  componentDidMount() {
    analytics().setCurrentScreen('mis_viajes_detalle');
    const {
      navigation, getCompanies, getServices, offers, getRateServices, getPermission,
    } = this.props;
    const dataOffer = navigation.getParam('dataOffer');
    const booked = navigation.getParam('booked');
    const share = navigation.getParam('share');
    const idShare = navigation.getParam('idShare');
    if (share) {
      offers.data.map((services) => {
        if (services.id === idShare) {
          this.setState({ offer: services });
        }
      });
    }
    if (dataOffer) {
      this.setState({ offer: dataOffer });
    }
    if (dataOffer.statu_id === 10 && booked) {
      this.setState({ modalFinish: true });
    }
    getRateServices();
    getCompanies();
    getServices();
    getPermission();
  }

  componentWillUnmount() {
    this.setState({ modalPermission: false });
  }

  onPressCancel() {
    analytics().logEvent('boton_detalles_volver');
    const { navigation } = this.props;
    navigation.goBack();
  }

  onPressQualification() {
    analytics().logEvent('boton_ver_calificacion');
    this.setState({ modalRate: true });
  }

  onPressReturn() {
    analytics().logEvent('boton_detalles_volver');
    const { navigation } = this.props;
    // navigation.navigate('MyTravels');
    navigation.goBack();
  }

  nameButton() {
    const { profile } = this.props;
    const { offer, showTravel } = this.state;
    if (profile.data[0].user.id === offer.user_driver_id) {
      if (offer.statu_id === 10) {
        return 'Esperando respuesta';
      }
      if (!showTravel) {
        this.setState({ showTravel: true });
      }
      return 'Iniciar viaje';
    }
    return 'Aplicar a viaje';
  }

  modalBack() {
    const { navigation } = this.props;
    this.setState({ modalFinish: false });
    setTimeout(() => {
      navigation.goBack();
    }, 100);
  }

  onNavigate(nameView) {
    analytics().logEvent('boton_diligenciar');
    const { navigate } = this.props.navigation;
    this.setState({ modalPermission: false });
    setTimeout(() => {
      navigate(nameView);
    }, 1000);
  }

  vehicleType(value, id) {
    analytics().logEvent('boton_aplicar_a_oferta');
    const { navigation } = this.props;
    const { showTravel, modalPermission } = this.state;
    const dataOffer = navigation.getParam('dataOffer');
    if (!modalPermission) {
      if (id) {
        this.applyOffer(id, value);
      } else if (showTravel) {
        navigation.navigate('StartTravel', { Offer: value });
        analytics().logEvent('boton_detalles_iniciar_viaje');
      } else {
        navigation.navigate('ListVehicle', { selectID: true, offer: dataOffer });
      }
    } else {
      analytics().setCurrentScreen('datos_faltantes');
      this.setState({ permissionApply: true });
    }
  }

  applyOffer(value, valueApplyOffer) {
    const { applyOffer, profile } = this.props;
    const data = {
      service_id: valueApplyOffer.id,
      user_id: profile.data[0].user.id,
      active: true,
    };
    applyOffer(data);
    this.setState({ modalApply: true });
  }

  onHideModal() {
    this.setState({ permissionApply: false });
  }

  missingViews(list) {
    const { listview } = this.state;
    return (
      <View style={{ flexDirection: 'column' }}>
        {list.map(pem => (
          (listview.includes(pem.name)) ? (
            <CardPermissions
              label={itemList[listview.lastIndexOf(pem.name)].label}
              permission={pem.permission}
              textfail="Diligenciar"
              textCorrect="OK"
              press={() => this.onNavigate(itemList[listview.lastIndexOf(pem.name)].url)}
            />
          ) : null
        ))
        }
        <WrapperButtonsBottom style={{ marginTop: 10 }}>
          <ButtonGradient content="Hazlo después" press={() => this.onHideModal()} />
        </WrapperButtonsBottom>
      </View>
    );
  }

  render() {
    const {
      offers, navigation, companies, rateService, permissions,
    } = this.props;
    const {
      offer,
      successNotification,
      errorFalse,
      fetch,
      fetchID,
      modalFinish,
      modalRate,
      modalApply,
      modalPermission,
      permissionApply,
      listview,
      fetchList,
    } = this.state;
    if (offers.service !== null && fetch) {
      this.setState({ successNotification: true, fetch: false });
    }
    if (offers.service === null && fetch) {
      this.setState({ errorFalse: true, fetch: false });
    }
    const selectID = navigation.getParam('selectID');
    if (selectID !== undefined && selectID !== null && fetchID === false) {
      this.setState({ fetchID: true });
    }
    if (permissions.data && !permissions.fetching && !fetchList) {
      // validate permisson
      let perm = 0;
      permissions.data.map((pem) => {
        if (listview.includes(pem.name)) {
          if (!pem.permission) {
            // eslint-disable-next-line no-plusplus
            perm++;
          }
        }
      });
      if (perm >= 1) {
        this.setState({ modalPermission: true });
      }
      this.setState({ fetchList: true });
    }
    if (
      offer !== null
      && companies.data !== null
      && rateService.rate !== null
      && permissions.data !== null
      && !permissions.fetching
    ) {
      const rateCompany = [];
      rateService.rate.map((rate) => {
        if (offer.id === rate.service_id) {
          rateCompany.push(rate.service_point);
        }
      });
      const totalRate = rateCompany.reduce((a, b) => a + b, 0);
      return (
        <MainWrapper>
          {fetchID && (
            <PopUpNotification
              subText="Ahora ya puedes postularte al viaje"
              mainText="Muy bien, seleccionaste tu vehículo!"
              onTouchOutside={() => this.setState({ fetchID: null })}
            />
          )}
          {modalApply && (
            <PopUpNotification
              subText="Ahora tendrás que esperar a que validen tus datos"
              mainText="Te postulaste a este viaje correctamente!"
              onTouchOutside={() => this.setState({ modalApply: null })}
            />
          )}
          <EmptyDialog visible={modalFinish}>
            <WrapperModal>
              <BlueText>{offer.statu_id === 11 ? 'Este viaje ya está finalizado' : offer.statu_id === 10 && 'Estamos esperando que acepten el viaje'}</BlueText>
              <ButtonGradient press={() => this.modalBack()} content="Volver" disabled={false} />
            </WrapperModal>
          </EmptyDialog>
          <EmptyDialog visible={modalRate}>
            <WrapperModal>
              <WrapperTextModal>
                <BlueText>
                  {totalRate === 0 ? 'Aún no tiene calificación el generador' : `El generador tiene ${totalRate} estrellas`}
                  {' '}
                </BlueText>
              </WrapperTextModal>
              <ButtonGradient press={() => this.setState({ modalRate: false })} content="cerrar" disabled={false} />
            </WrapperModal>
          </EmptyDialog>
          <MapView
            initialRegion={{
              latitude: 4.624335,
              longitude: -74.063644,
              latitudeDelta: 9.93,
              longitudeDelta: 9.94,
            }}
            style={{ height: '55%', width: '100%' }}
          >
            <MapView.Marker
              coordinate={{
                latitude: parseInt(offer.origin_latitude),
                longitude: parseInt(offer.origin_longitude),
              }}
              title="Origen del viaje"
            />
          </MapView>
          {successNotification && (
          <PopUpNotification
            subText="Pronto te darémos respuesta..."
            mainText="Has aplicado correctamente al viaje"
            onTouchOutside={() => this.setState({ successNotification: false })}
            visible={successNotification}
          />
          )}
          {errorFalse && (
          <PopUpNotification
            subText="Intentalo de nuevo más tarde"
            mainText="Ups! Algo ha fallado"
            onTouchOutside={() => this.setState({ errorFalse: false })}
            visible={errorFalse}
          />
          )}
          {companies.data.map((company) => {
            if (offer.company_id === company.id) {
              return (
                <AddressesWrapper>
                  <AddressesCardMap
                    nameCompany={offer.origin}
                    firstAddress={offer.origin_address}
                    nameAddress={offer.destination}
                    secondAddress={offer.destination_address}
                  />
                </AddressesWrapper>
              );
            }
          })}
          {companies.data.map((company) => {
            if (offer.company_id === company.id) {
              return (
                <CardMapBeginTravel
                  normalText={company.address}
                  amount={formatPrice(offer.price)}
                  onPressBG={() => this.vehicleType(offer, selectID)}
                  onPressBW={
                    () => (offer.statu_id === 11 ? this.onPressReturn() : this.onPressCancel())
                  }
                  content={offer.description}
                  extra={offer.note}
                  company={company.name}
                  packing={offer.packing}
                  loadVolume={offer.load_volume}
                  loadWeight={offer.load_weight}
                  mainButton={this.nameButton()}
                  onPressQA={() => this.onPressQualification()}
                  status={offer.statu_id}
                />
              );
            }
          })}
          <EmptyDialog
            visible={permissionApply}
            opacity={0.4}
            onTouchOutside={() => this.onHideModal()}
          >
            <MainWrapperDialog>
              <ContentDialog>
                <TitleBlack>Datos Faltantes</TitleBlack>
                <TextGray>
                  Para que puedas aplicar a este viaje, nos falta esta información:
                </TextGray>
                <ContentForm>
                  {this.missingViews(permissions.data)}
                </ContentForm>
              </ContentDialog>
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
    vehicles, companies, user, offers, profile, rateService, permissions,
  } = state;
  return {
    vehicles,
    companies,
    user,
    offers,
    profile,
    rateService,
    permissions,
  };
};

const mapDispatchToProps = dispatch => ({
  getCompanies: params => dispatch(CompanyActions.getCompaniesRequest(params)),
  applyOffer: service => dispatch(OffersActions.postApplyOfferRequest(service)),
  getServices: (params = {}) => dispatch(OffersActions.getServicesRequest(params)),
  getPermission: params => dispatch(PermissionsActions.getPermissionRequest(params)),
  getRateServices: (params = {}) => dispatch(RateActions.getRateServiceRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplyOffer);
