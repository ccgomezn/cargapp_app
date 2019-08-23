import React, { Component } from 'react';
import EmptyDialog from '../../components/EmptyDialog';
import InputPicker from '../../components/InputPicker';
import {
  MainWrapper, ContentView, TextBlack, ContentBlock, ContentForm,
  WrapperInputs, RowContent, WrapperButtonsBottom, WrapperButtonGradient,
  ContentInitial, WrapperColumn, SecondWrapper, WrapperImage, Image,
  WrapperInfo, BoldText, NormalText, ContentButton,
  MainWrapperDialog, TouchModal, TitleBlack, TextGray, ScrollDialog, ContentDialog,
} from './style';

import Input from '../../components/GeneralInput';
import CardSquareInfo from '../../components/CardSquareInfo';
import ButtonGradient from '../../components/ButtonGradient';
import ButtonWhite from '../../components/ButtonWhite';

const itemsAccount = [
  {
    textItem: 'Cuenta de ahorros',
    valueItem: 'tipo1',
  },
  {
    textItem: 'Cuenta corriente',
    valueItem: 'tipo2',
  },
];

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      modalPassword: false,
      modalAccount: false,
    };
  }

  onPressButtonPassword() {
    this.setState({ modalPassword: true });
  }

  // eslint-disable-next-line react/sort-comp
  OnHideModal() {
    this.setState({ modalPassword: false, modalAccount: false });
  }

  onPressButtonAccount() {
    this.setState({ modalAccount: true });
  }

  render() {
    const { modalPassword, modalAccount } = this.state;

    return (
      <MainWrapper>
        <ContentInitial>
          <WrapperColumn>
            <WrapperImage>
              <Image />
            </WrapperImage>
            <WrapperInfo>
              <BoldText>Andrés Rodríguez</BoldText>
              <NormalText>Conductor nivel 7</NormalText>
            </WrapperInfo>
            <ContentButton>
              <ButtonGradient content="Ver retos" />
            </ContentButton>
          </WrapperColumn>
        </ContentInitial>

        <SecondWrapper>
          <ContentView>
            <ContentBlock>
              <TextBlack>Perfil</TextBlack>
            </ContentBlock>
          </ContentView>

          <ContentView>
            <RowContent style={{ marginRight: '2%' }}>
              <CardSquareInfo
                value="1.233"
                description="Viajes Realizados"
              />
            </RowContent>
            <RowContent>
              <CardSquareInfo
                value="9,5/10"
                description="Calificación"
              />
            </RowContent>
          </ContentView>

          <ContentView>
            <ContentBlock>
              <TextBlack>Información de perfil</TextBlack>
            </ContentBlock>
          </ContentView>

          <ContentForm>
            <WrapperInputs>
              <Input title="Correo electrónico" />
              <Input title="Nombre" holder="Ingrese" />
              <Input title="Apellido" />
              <Input title="Cedula" holder="Ingrese número de documento" />
            </WrapperInputs>
          </ContentForm>

          <WrapperButtonsBottom>
            <WrapperButtonGradient>
              <ButtonWhite content="Cambiar contraseña" press={() => this.onPressButtonPassword()} />
            </WrapperButtonGradient>
            <WrapperButtonGradient>
              <ButtonGradient content="Cuenta Bancaria" press={() => this.onPressButtonAccount()} />
            </WrapperButtonGradient>
          </WrapperButtonsBottom>

        </SecondWrapper>

        <EmptyDialog
          visible={modalAccount}
        >
          <MainWrapperDialog>
            <ScrollDialog>
              <ContentDialog>
                <TitleBlack>Datos bancarios</TitleBlack>
                <TextGray>Registra o modifica tu cuenta bancaria.</TextGray>
                <ContentForm>
                  <WrapperInputs>
                    <Input title="Cuenta bancaria" holder="Ingrese tu número de cuenta" />
                    <InputPicker title="Tipo de cuenta" listdata={itemsAccount} />
                    <InputPicker title="Banco" />
                  </WrapperInputs>
                </ContentForm>
                <TouchModal>
                  <ButtonGradient content="Confirmar" press={() => this.onPressButtonAccount()} />
                </TouchModal>
                <TouchModal>
                  <ButtonWhite content="Cancelar" press={() => this.OnHideModal()} />
                </TouchModal>
              </ContentDialog>
            </ScrollDialog>
          </MainWrapperDialog>
        </EmptyDialog>

        <EmptyDialog
          visible={modalPassword}
        >
          <MainWrapperDialog style={{ height: '62%' }}>
            <ScrollDialog>
              <ContentDialog>
                <TitleBlack>Cambiar tu contraseña</TitleBlack>
                <TextGray>
                  Ingresa la contraseña anterior.
                  La nueva contraseña deberá tener entre 4 a 6 caracteres.
                </TextGray>
                <ContentForm>
                  <WrapperInputs>
                    <Input title="Clave" holder="Ingrese la contraseña anterior" />
                    <Input title="Nueva clave" holder="Ingrese la contraseña nueva" />
                    <Input title="Confirmar clave" />
                  </WrapperInputs>
                </ContentForm>
                <TouchModal>
                  <ButtonGradient content="Confirmar" />
                </TouchModal>
                <TouchModal>
                  <ButtonWhite content="Cancelar" press={() => this.OnHideModal()} />
                </TouchModal>
              </ContentDialog>
            </ScrollDialog>
          </MainWrapperDialog>
        </EmptyDialog>
      </MainWrapper>
    );
  }
}
