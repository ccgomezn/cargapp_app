import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ActivityIndicator} from 'react-native';
import {MainWrapper, MainTextCard, TextAbsolute, MainWrapperScroll} from './style';
import WhiteCardTravels from '../../components/WhiteCardTravels';
import DriverActions from "../../redux/reducers/DriverRedux";
import ProfileActions from "../../redux/reducers/ProfileRedux";
import OffersActions from "../../redux/reducers/OffersRedux";
import VehiclesActions from "../../redux/reducers/VehicleRedux";
import PermissionsActions from "../../redux/reducers/PermissionsRedux";
import DestinationsActions from "../../redux/reducers/DestinationsRedux";
import { formatPrice } from '../../helpers/Utils';

class FilterOffers extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount(): void {
        const {getMyOffersPostulation, profile} = this.props;
        getMyOffersPostulation(profile.data[0].user.id);
    }

    render() {
        const {filterOffers, navigation, vehicles, offers} = this.props;
        if (filterOffers.data !== null && offers.services) {
            const vehicle_data = {};
            vehicles.data.forEach((vehicle) => {
                vehicle_data[vehicle.id] = vehicle.name;
            });
            const mine_offers = [];
            offers.services.forEach((offer) => {
                mine_offers.push(offer.service_id);
            });
            let filter_real = [];
            filterOffers.data.forEach(offer => {
              if(!mine_offers.includes(offer.id)){
                filter_real.push(offer);
              }
            });
            return (
                <MainWrapper>
                    {filter_real.length >= 1 ? (
                        <MainWrapperScroll>
                            <MainTextCard>Ofertas encontradas</MainTextCard>
                            {filter_real.map(offers => (
                                <WhiteCardTravels
                                    from={offers.origin}
                                    to={offers.destination}
                                    vehicle={vehicle_data[offers.vehicle_type_id]}
                                    pay={formatPrice(offers.price)}
                                    date="hoy"
                                    actionbtnPrimary={() => navigation.navigate('ApplyTravels', {dataOffer: offers})}
                                    btnPrimary="Ver detalles"
                                    btnSecondary
                                />
                            ))
                            }
                        </MainWrapperScroll>
                    ) : (
                        <TextAbsolute>No hay ofertas disponibles con esas caracteristicas</TextAbsolute>
                    )}
                </MainWrapper>
            );
        }
        return (
            <ActivityIndicator
                style={{alignSelf: 'center', height: '100%'}}
                size="large"
                color="#0000ff"
            />
        );
    }
}

const mapStateToProps = (state) => {
    const {offers, filterOffers, vehicles, profile} = state;
    return {
        offers,
        filterOffers,
        vehicles,
        profile
    };
};


const mapDispatchToProps = dispatch => ({
    getMyOffersPostulation: params => dispatch(OffersActions.getServicesRequest(params)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FilterOffers);
