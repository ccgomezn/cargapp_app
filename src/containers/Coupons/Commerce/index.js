import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import {
  MainWrapper, TextTerms, WrapperButton, WrapperCarousel, WrapperText,
} from './style';
import CardCoupons from '../../../components/CardCoupons';
import ButtonGradient from '../../../components/ButtonGradient';

const Width = Dimensions.get('window').width;
const data = [{ Name: 'Starbucks', SubText: '10% en todos los productos' }, { Name: 'McDonal`s', SubText: '50% en los mc combos' }];

export default class Commerce extends Component {
  constructor() {
    super();
    this.state = {
      sliderActive: 1,
    };
  }

  rederItem({ item, index }) {
    return (
      <CardCoupons
        subText={item.SubText}
        text={item.Name}
        button={false}
      />
    );
  }

  render() {
    const { sliderActive } = this.state;
    return (
      <MainWrapper>
        <WrapperCarousel>
          <Carousel
            data={data}
            renderItem={this.rederItem}
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
            press={() => alert('El cupón es todo tuyo')}
            content="Obtener cupón"
            disabled={false}
          />
        </WrapperButton>
        <WrapperText>
          <TextTerms>© Todos los derechos reservados. Cargapp 2019</TextTerms>
        </WrapperText>
      </MainWrapper>
    );
  }
}
