import styled from 'styled-components/native';
import SvgUriN from 'react-native-svg-uri';

export const MainWrapper = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding: 5%;
`;

export const TextBlack = styled.Text`
  font-family: Arial;
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
  font-family: Arial;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  letter-spacing: -0.3px;
  color: #010935;
  
`;

export const SvgUri = styled.Image`
  width: 127px;
  height: 45px;
  resize-mode: stretch;
  align-self: center;
  margin-bottom: 3%;
`;

export const WrapperButtons = styled.View`
  width: 100%;
  flex-direction: row;
  height: auto;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 5%;
`;

export const WrapperButtonsBottom = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  height: auto;
  justify-content: flex-end;
  padding-bottom: 10px;
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
  font-family: Arial;
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
  font-family: Arial;
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
  right: -5px;
`;

export const WrapperInputs = styled.View`
  width: 100%;
  height: auto;
  margin-vertical: 5%;
`;

export const TextTerms = styled.Text`
  font-family: Arial;
  font-size: 12px; 
  letter-spacing: -0.3px;
  color: #010935;
  align-self: center;
  bottom: 0;
  padding-top: 20px;
`;

export const WrapperButtonGradient = styled.View`
  width: 35%;
  height: 100%;
  margin-left: 3%;
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
  width: 90%;
  height: 55%;
  padding: 5%;
  padding-bottom: 0px;
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
  padding-top: 20%;
`;

export const TitleBlack = styled.Text`
  font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
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
  margin-bottom: 12px;
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
  top: 24%;
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
