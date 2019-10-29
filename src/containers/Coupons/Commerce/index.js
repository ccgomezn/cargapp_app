import React, { Component } from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import {
  MainWrapper, TextTerms, WrapperButton, WrapperCarousel, WrapperText,
} from './style';
import CardCoupons from '../../../components/CardCoupons';
import ButtonGradient from '../../../components/ButtonGradient';
import CouponsActions from '../../../redux/reducers/CouponsRedux';

const Width = Dimensions.get('window').width;
const data = [{ Name: 'Starbucks', SubText: '10% en todos los productos' }, { Name: 'McDonal`s', SubText: '50% en los mc combos' }];

class Commerce extends Component {
  constructor() {
    super();
    this.state = {
      sliderActive: 1,
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
      />
    );
  }

  componentDidMount() {
    const { getCoupons } = this.props;
    getCoupons();
  }

  render() {
    const { sliderActive } = this.state;
    const { navigation, coupons } = this.props;
    console.log(this.props);
    if (coupons !== null) {
      return (
        <MainWrapper>
          <WrapperCarousel>
            <Carousel
              data={coupons.data}
              renderItem={this.renderItem}
              ref={(c) => { this._carousel = c; }}
              sliderWidth={Width}
              itemWidth={Width - 50}
              onSnapToItem={index => this.setState({ sliderActive: index })}
            />
          </WrapperCarousel>
          <Pagination
            dotsLength={data.length}
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
              press={() => navigation.navigate('DetailsCoupons')}
              content="Obtener cupón"
              disabled={false}
            />
          </WrapperButton>
          <WrapperText>
            <TextTerms>© Todos los derechos reservados. Cargapp 2019</TextTerms>
          </WrapperText>
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
  return coupons;
};

const mapDispatchToProps = dispatch => ({
  getCoupons: params => dispatch(CouponsActions.getCouponsRequest(params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Commerce);
