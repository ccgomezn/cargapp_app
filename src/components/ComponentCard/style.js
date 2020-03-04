import styled from 'styled-components/native';
import SvgUri from 'react-native-svg-uri';

export const MainWrapper = styled.TouchableOpacity`
  width: 100%;
  height: auto;
  flex-direction: row;
  border: 1px solid gray;
  border-radius: 5px;
`;

export const WrapperLogo = styled.View`
  flex: 2;
  height: auto;
  justify-content: center;
  align-items: center;
`;

export const LogoIni = styled.Image`
  width: 28px;
  height: 28px;
  resize-mode: contain;
`;

export const LogoCheck = styled.Image`
  width: 28px;
  height: 28px;
  resize-mode: contain;
`;

export const LogoError = styled.Image`
  width: 25px;
  height: 25px;
  resize-mode: contain;
`;

export const WrapperText = styled.View`
  flex: 8;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 4px;
`;

export const MainText = styled.Text`
  font-family: Roboto;
  font-size: 15px;
  padding-top: 10px;
  padding-bottom: 2px;
  font-weight: bold;
  letter-spacing: -0.23px;
  color: #010935;
`;

export const SubText = styled.Text`
  opacity: 0.65;
  font-family: Roboto-regular;
  font-size: 12px;
  padding-top: 2px;
  padding-bottom: 8px;
  color: #010935;
`;
