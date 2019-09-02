import styled from 'styled-components/native';
import SvgU from 'react-native-svg-uri';

export const MainWrapper = {
  width: '75%',
  height: '48%',
  justifyContent: 'flex-end',
  backgroundColor: 'transparent',
};

export const WrapperText = styled.View`
  align-items: center;
  justify-content: center;
  padding-top: 22%;
`;

export const TextBlack = styled.Text`
  font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
  color: #010935;
  text-align: center;
`;

export const TextGray = styled.Text`
  opacity: 0.5;
  font-family: Roboto;
  font-size: 14px; 
  color: #010935;
`;

export const Svg = styled.ImageBackground`
  height: 95px;
  width: 90px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -20%;
  z-index: 10;
  resize-mode: stretch;
`;

export const SvgUri = styled(SvgU)`
  height: 30px;
  width: 30px;
`;

export const Wrapper = styled.View`
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  width: 100%;
  max-height: 85%;
  min-height: 30%;
  height: auto;
  justify-content: space-between;
  padding-horizontal: 5%;
  padding-bottom: 7%;
  align-items: center;
  align-self: center;
`;

export const TouchModal = styled.TouchableOpacity`
  min-width: 100%;
  width: 100%;
  height: auto;
  align-self: flex-end;
  bottom: 0;
  border-radius: 10px;
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
  padding-horizontal: 30%;
  background-color: #007aff;
`;
