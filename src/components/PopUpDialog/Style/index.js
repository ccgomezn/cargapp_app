import styled from 'styled-components/native';
import SvgU from 'react-native-svg-uri';

export const MainWrapper = {
  width: '75%',
  height: '48%',
  justifyContent: 'flex-end',
  backgroundColor: 'transparent',
};

export const Text = styled.Text`
  font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
  color: #010935;
`;

export const TextGray = styled.Text`
  opacity: 0.5;
  font-family: Roboto;
  font-size: 14px; 
  color: #010935;
`;

export const Svg = styled.ImageBackground`
  height: 34%;
  width: 32%;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -15%;
  z-index: 10;
  resize-mode: stretch;
`;

export const SvgUri = styled(SvgU)`
  height: 20px;
  width: 20px;
`;

export const Wrapper = styled.View`
  background-color: white;
  border-radius: 10px;
  width: 100%;
  height: 85%;
  justify-content: center;
  align-items: center;
`;
