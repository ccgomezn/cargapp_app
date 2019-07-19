import styled from 'styled-components/native';
import SvgUriN from 'react-native-svg-uri';

export const MainWrapper = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding: 5%;  
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

export const SvgUri = styled.Image`
  width: 127px;
  height: 45px;
  resize-mode: stretch;
  align-self: center;
`;

export const WrapperButtons = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  height: auto;
  justify-content: space-between;
  margin-vertical: 5%;
`;

export const WrapperButtonsBottom = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  height: auto;
  justify-content: flex-end;
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
    right: -5px;
`;

export const WrapperInputs = styled.View`
  width: 100%;
  height: auto;
  margin-bottom: 5%;
`;

export const TextTerms = styled.Text`
  font-family: Roboto;
  font-size: 12px; 
  letter-spacing: -0.3px;
  color: #010935;
  align-self: center;
  padding: 10px;
  top: 10px;
`;
