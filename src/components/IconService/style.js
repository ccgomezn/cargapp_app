import styled from 'styled-components/native';
import SvgUriN from 'react-native-svg-uri';

export const ContaintView = styled.View`
  height: 78px;
  width: 78px;
  margin-right: 15px;
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
  background-color: #0068ff30;
  border-radius: 50px;
  margin: 2px 10px;
`;

export const TextIcon = styled.Text`
  font-family: Roboto;
  font-size: 12px;
  font-weight: bold;
`;

export const DrawIcon = styled(SvgUriN)`
  resize-mode: contain;
`;
