import styled from 'styled-components/native';
import SvgUriN from 'react-native-svg-uri';

export const ContaintView = styled.View`
  height: 100px;
  width: 92px;
  margin-right: 20px;
  margin-bottom: 12px;
`;

export const ContaintIcon = styled.TouchableOpacity`
  flex: 2;
`;

export const ContaintText = styled.View`
  padding-top: 0;
  align-items: center;
`;

export const CicleIcon = styled.View`
  flex: 1;
  justify-content: center; 
  align-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 28px;
  margin: 2px 5px;
`;

export const TextIcon = styled.Text`
  margin-top: 5px;
  font-family: Roboto-Regular;
  font-size: 12px;
`;

export const DrawIcon = styled(SvgUriN)`
  resize-mode: contain;
`;
