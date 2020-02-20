import styled from 'styled-components/native';
import SvgUri from 'react-native-svg-uri';

export const MainWrapper = styled.TouchableOpacity`
  flex: 1;
  height: 65px;
  flex-direction: row;
  border: 1px solid gray;
  border-radius: 5px;
`;

export const WrapperLogo = styled.View`
  flex: 2;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled(SvgUri)`
  width: 90%;
  height: 100%;
  padding-vertical: 15%;
  padding-horizontal: 10%;
`;

export const LogoCheck = styled.Image`
  width: 45%;
  height: 45%;
  resize-mode: contain;
`;

export const LogoError = styled.Image`
  width: 35%;
  height: 35%;
  resize-mode: contain;
`;

export const WrapperText = styled.View`
  flex: 8;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 8px;
`;

export const MainText = styled.Text`
  font-family: Roboto;
  font-size: 16px;
  padding-top: 10px;
  padding-bottom: 2px;
  font-weight: bold;
  letter-spacing: -0.23px;
  color: #010935;
`;

export const SubText = styled.Text`
  opacity: 0.65;
  font-family: Roboto;
  font-size: 12px;
  color: #010935;
`;
