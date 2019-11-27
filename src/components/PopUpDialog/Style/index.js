import styled from 'styled-components/native';
import SvgU from 'react-native-svg-uri';

export const MainWrapper = {
  width: '75%',
  height: '45%',
  justifyContent: 'flex-end',
  backgroundColor: 'transparent',
};

export const WrapperText = styled.View`
  align-items: center;
  justify-content: center;
  padding-top: 22%;
  padding-horizontal: 5%;
`;

export const TextBlack = styled.Text`
  font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
  color: #010935;
  text-align: center;
  padding-bottom: 4%;
`;

export const TextGray = styled.Text`
  opacity: 0.5;
  font-family: Roboto;
  font-size: 14.5px; 
  color: #010935;
  text-align: center;
`;

export const Svg = styled.ImageBackground`
  height: 75px;
  width: 70px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -15%;
  z-index: 10;
  resize-mode: stretch;
`;

export const SvgUri = styled(SvgU)`
  height: 38px;
  width: 38px;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.View`
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  max-height: 85%;
  min-height: 33%;
  height: auto;
  justify-content: space-between;
  padding-horizontal: 5%;
  padding-bottom: 7%;
  align-items: center;
  align-self: center;
`;

export const TouchModal = styled.TouchableOpacity`
  width: 95%;
  height: auto;
  border-radius: 10px;
  background-color: #007aff;
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
`;
