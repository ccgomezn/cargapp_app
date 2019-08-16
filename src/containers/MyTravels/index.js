import React, { Component } from 'react';

import {
  MainWrapper, ContentView, TextBlack, ContentBlock,
  ContentFilter, TouchFilter, TextFilter, ContentOffer,
} from './style';
import WhiteCardTravels from '../../components/WhiteCardTravels';
import PopUpDialog from '../../components/PopUpDialog';

export default class MyTravels extends Component {
  constructor() {
    super();
    this.state = {
      alertVisible: false,
    };
  }

  onPressButton() {
    this.setState({ alertVisible: true });
  }

  onPressButtonPopup() {
    this.setState({ alertVisible: false });
  }

  render() {
    const { alertVisible } = this.state;
    return (
      <MainWrapper>
        <ContentView subcontent>
          <ContentBlock>
            <TextBlack>Mis Viajes</TextBlack>
            <ContentFilter>
              <TouchFilter>
                <TextFilter>
                  Filtrar: Todos
                  { ' >' }
                </TextFilter>
              </TouchFilter>
            </ContentFilter>
          </ContentBlock>
        </ContentView>

        <ContentOffer subcontent>
          <WhiteCardTravels
            from="Bogota"
            to="Medellin"
            vehicle="Tractomula"
            pay="2.300.000"
            date="hoy"
            actionbtnPrimary=""
            btnPrimary="Aplicar"
            btnSecondary
          />

          <WhiteCardTravels
            from="Buenaventura"
            to="Bogotá D.C"
            vehicle="Tractomula"
            pay="2.300.000"
            date="22/22/20"
            status="En espera"
            actionbtnPrimary={() => this.onPressButton()}
            btnPrimary="Ver detalle"
          />

          <WhiteCardTravels
            from="Buenaventura"
            to="Bogotá D.C"
            vehicle="Tractomula"
            pay="2.300.000"
            date="Hoy"
            status="Cancelado"
            statusColor="#e74c3c"
            actionbtnPrimary=""
            btnPrimary="Ver detalle"
          />

          <WhiteCardTravels
            from="Buenaventura"
            to="Bogotá D.C"
            vehicle="Tractomula"
            pay="2.300.000"
            date="Ayer"
            status="Realizado"
            statusColor="#2ecc71"
            actionbtnPrimary=""
            btnPrimary="Ver detalle"
          />
        </ContentOffer>

        <PopUpDialog
          visible={alertVisible}
          textBlack="Lo sentimos"
          textButton="Entendido"
          textGray="no puedes ver la oferta"
          onTouchOutside={() => this.onPressButtonPopup()}
        />
      </MainWrapper>
    );
  }
}
