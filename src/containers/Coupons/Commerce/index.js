/* eslint-disable import/no-named-as-default-member */
/* eslint-disable array-callback-return */
/* eslint-disable react/sort-comp */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import analytics from '@react-native-firebase/analytics';
import {
  MainWrapper, WrapperButton, WrapperCarousel, BlueText,
} from './style';
import CardCoupons from '../../../components/CardCoupons';
import ButtonGradient from '../../../components/ButtonGradient';
import CouponsActions from '../../../redux/reducers/CouponsRedux';

const Width = Dimensions.get('window').width;

class Commerce extends Component {
  constructor() {
    super();
    this.state = {
      sliderActive: 0,
      company: 0,
      category: null,
    };
  }

  renderItem({ item, index }) {
    return (
      <CardCoupons
        subText={item.description}
        text={item.name}
        button={false}
        key={index}
        fullCard={false}
        img={item.image}
      />
    );
  }

  componentDidMount() {
    analytics().setCurrentScreen('todos_los_cupones');
    const { navigation, getCoupons } = this.props;
    const dtcompany = navigation.getParam('idCompany', '');
    if (dtcompany !== '') {
      this.setState({ company: dtcompany });
    }
    const dtCat = navigation.getParam('idCategory', null);
    if (dtCat !== null) {
      this.setState({ category: dtCat });
    }
    getCoupons();
  }

  navigation(event, param) {
    const { navigation } = this.props;
    analytics().logEvent('boton_obtener_cupon');
    navigation.navigate(event, param);
  }

  render() {
    const { sliderActive, company, category } = this.state;
    const { coupons } = this.props;
    const newCoupons = new Set();

    if (coupons.data !== null && !coupons.featching) {
      coupons.data.map((couponsData) => {
        if (company !== '') {
          if (couponsData.company_id === company) {
            newCoupons.add(couponsData);
          }
        }
        if (category !== null) {
          if (couponsData.category === category) {
            newCoupons.add(couponsData);
          }
        }
      });
      const newCouponsArray = Array.from(newCoupons);
      return (
        <MainWrapper>
          { newCouponsArray.length > 0 ? (
            <View>
              <WrapperCarousel>
                <Carousel
                  data={newCouponsArray}
                  renderItem={this.renderItem}
                  ref={(c) => { this._carousel = c; }}
                  sliderWidth={Width}
                  itemWidth={Width - 50}
                  onSnapToItem={index => this.setState({ sliderActive: index })}
                />
              </WrapperCarousel>
              <Pagination
                dotsLength={newCouponsArray.length}
                activeDotIndex={sliderActive}
                dotColor="blue"
                inactiveDotColor="gray"
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                carouselRef={this._carousel}
                tappableDots={!!this._carousel}
              />
              <WrapperButton>
                <ButtonGradient
                  press={() => this.navigation('DetailsCoupons', { idItem: newCouponsArray[sliderActive] })}
                  content="Obtener cupón"
                  disabled={false}
                />
              </WrapperButton>
            </View>
          ) : <BlueText>No hay cupones en estos momentos</BlueText> }
          {/* <WrapperText>
            <TextTerms>© Todos los derechos reservados. Cargapp 2019</TextTerms>
          </WrapperText> */}
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
  const { coupons } = state;
  return {
    coupons,
  };
};

const mapDispatchToProps = dispatch => ({
  getCoupons: params => dispatch(CouponsActions.getCouponsRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Commerce);
