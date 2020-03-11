import styled from 'styled-components/native';
import SvgUriN from 'react-native-svg-uri';

export const MainWrapper = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding: 5%;
  margin-top: 4%;
  background-color: white;
`;

export const TextBlack = styled.Text`
  font-family: Roboto;
  font-size: 30px;
  font-weight: bold;
  font-style: normal;
  letter-spacing: -0.3px;
  color: #010935;
  padding-top: 4%;
  padding-bottom: 2%;
`;

export const TextBlue = styled.Text`
  color: #0068ff;
`;

export const TextGray = styled.Text`
  opacity: 0.5;
  font-family: Roboto;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  letter-spacing: -0.3px;
  color: #010935;
`;

export const WrapperError = styled.View`
  width: 100%;
  font-size: 14px;
  letter-spacing: -0.4px;
`;

export const TextError = styled.Text`
  opacity: 0.95;
  font-family: Roboto;
  font-weight: 600;
  font-style: normal;
  letter-spacing: -0.5px;
  background-color: #ff2557; //#d3e5ff;
  padding: 10px 6px;
  color: #fff;
  border-radius: 6px;
  margin-bottom: 2px;
`;

export const TextLoad = styled.View`
  display: flex;
  height: auto;
  align-items: center;
  align-self: center;
  text-align: center;
`;

export const SvgUri = styled.Image`
  width: 127px;
  height: 45px;
  resize-mode: stretch;
  align-self: center;
  margin-top: 0;
`;

export const WrapperButtons = styled.View`
  width: 100%;
  flex-direction: row;
  display: flex;
  height: auto;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
  margin-bottom: 0%;
`;

export const WrapperButtonsBottom = styled.View`
  width: 100%;
  flex-direction: row;
  height: auto;
  justify-content: flex-end;
  padding-bottom: 10px;
  margin-top: 2px;
  margin-bottom: 4px;
`;

export const WrapperButton = styled.TouchableOpacity`
  width: 48%;
  height: 140px;
  border-radius: 8px;
  border: solid 1.2px #ecf0f1;
  background-color: #ffffff;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const ButtonSubText = styled.Text`
  opacity: 0.5;
  font-family: Roboto;
  font-size: 12px;
  font-weight: normal;
  font-style: normal;
  letter-spacing: -0.17px;
  text-align: center;
  color: #010935;
  margin-horizontal: 15px;
  padding-bottom: 6%;
`;

export const ButtonText = styled.Text`
  font-family: Roboto;
  font-size: 14px;
  font-weight: bold;
  font-style: normal;
  letter-spacing: -0.2px;
  color: #010935;
  padding-top: 5%;
`;

export const containerPress = {
  backgroundColor: '#0068ff',
};

export const TextPress = {
  color: 'white',
};

export const Svg = styled(SvgUriN)`
  padding-top: 6%;
  width: 42px;
  height: 42px;
  resize-mode: contain;
  color: blue;
`;

export const Check = styled.Image`
  width: 35px;
  height: 35px;
  position: absolute;
  resize-mode: stretch;
  top: -10px;
  right: -10px;
`;

export const WrapperInputs = styled.View`
  width: 100%;
  height: auto;
  margin-top: 0%;
  margin-bottom: 2%;
`;

export const TextTerms = styled.Text`
  font-family: Roboto;
  font-size: 12px; 
  letter-spacing: -0.3px;
  color: #010935;
  align-self: center;
  bottom: 0;
  padding-top: 20px;
`;

export const WrapperButtonGradient = styled.View`
  width: 42%;
  height: 100%;
  margin-left: 3%;
`;

export const WrapperButtonWhite = styled.View`
  width: 100%;
  height: auto;
  margin-vertical: 2px;
`;

export const WrapperSocialButtons = styled.View`
  height: auto;
  width: 100%;
  justify-content: space-around;
  margin-vertical: 2%;
`;

export const WrapperDocument = styled.View`
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const RowDocument = styled.View`
  width: 100%;
  margin-top: 10px;
`;

// estilos Modal
export const MainWrapperDialog = styled.View`
  width: 100%;
  padding: 5%;
  border-radius: 10px;
  align-self: center
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export const ContentDialog = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-self: center;
  align-items: center;
  font-family: Roboto;
`;

export const WrapperText = styled.View`
  align-items: center;
  justify-content: center;
  padding-top: 2%;
`;

export const TitleBlack = styled.Text`
  font-family: Roboto-Bold;
  font-size: 16px;
  color: #010935;
  padding-bottom: 3%;
`;

export const SubtGray = styled.Text`
  opacity: 0.5;
  font-family: Roboto;
  font-size: 14px;
  color: #010935;
  padding-bottom: 10px;
  text-align: center;
`;

export const TouchModal = styled.TouchableOpacity`
  min-width: 100%;
  width: 100%;
  height: auto;
  align-self: flex-end;
  bottom: 0;
  border-radius: 10px;
  margin-bottom: 8px;
`;

export const TextWhite = styled.Text`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.35px;
  text-align: center;
  color: white;
  align-self: center;
  padding-vertical: 18px;
  width:100%;
  background-color: #007aff;
`;

export const ScrollDialog = styled.ScrollView`
  width: 100%;
  height: auto;
`;

export const IconModal = styled.View`
  height: 66px;
  width: 66px;
  align-items: center;
  justify-content: center;
  align-self: center;
  position: absolute;
  top: 0%;
  z-index: 10;
  padding: 5px;
`;

export const SvgModal = styled.ImageBackground`
  height: 65px;
  width: 65px;
  resize-mode: contain;
  align-items: center;
  justify-content: center;
  align-self: center;
  resize-mode: stretch;
`;

export const SvgUriModal = styled(SvgUriN)`
  height: 30px;
  width: 30px;
  align-items: center;
  justify-content: center;
`;

export const WrapperSection = styled.View`
  display: flex;
  flex-direction: row;
  height: auto;
  margin-top: 1%;
`;

export const SectionRow = styled.View`
  background-color: white;
`;

export const TouchCloseModal = styled.TouchableOpacity`
  position: absolute;
  right: 15;
  width: 50px;
  height: 50px;
  top: 25%;
  z-index: 101;
  padding: 5px;
`;

export const WrapperCloseX = styled.View`
  background-color: #f3f3f3;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;

export const TextModal = styled.Text`
  font-size: 30px;
  color: #0168ff;
  align-self: center;
  z-index: -1;
  margin-bottom: 10px;
`;
