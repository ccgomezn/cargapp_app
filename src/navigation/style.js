import styled from 'styled-components/native';
import SvgUriN from 'react-native-svg-uri';
import LinearGradient from 'react-native-linear-gradient';

export const DrawIconMenu = styled(SvgUriN)`
  width: 23px;
  height: 20px;
`;

export const IconImg = styled.Image`
  width: 18px;
  height: 15px;
  margin: 16px;
`;

export const IconLogo = styled.Image`
  width: 98px;
  height: 34px;
  margin-top: 2px;
  margin-bottom: 4px;
  resize-mode: stretch;
  align-self: center;
`;

export const TouchLeftMenu = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-right-width: 2px;
  border-right-color: #f5f6fa;
  background-color: white;
`;

export const TouchCenterMenu = styled.TouchableOpacity`
  flex: 1;
  text-align: center;
  background-color: white;
`;

export const TouchRightMenu = styled.TouchableOpacity`
  flex: 1; 
  flex-direction: row;
  width: 62px;
  height: 42px;
  background-color: white;
`;

export const BoxPerfil = styled.View`
  margin: 2px;
  justify-content: center;
`;

export const CircleBorder = styled(LinearGradient)`
  height: 93%;
  border-radius: 50px;
  text-align:center;
`;

export const ImagenPerfil = styled.Image`
  width: 33px;
  height: 33px;
  margin: 1px;
  border-radius: 50px;
  border-width: 3px;
  border-color: white;
`;

export const ImagenArrow = styled.Image`
  width: 12px;
  height: 10px;
  resize-mode: contain;
`;
