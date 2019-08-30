import styled from 'styled-components/native';
import SvgUri from 'react-native-svg-uri';

export const MainWrapper = styled.TouchableOpacity`
  width: 100%;
  height: 62px;
  flex-direction: row;
  border: 1px solid gray;
  border-radius: 5px;
`;

export const WrapperLogo = styled.View`
  flex: 1.6;
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

export const WrapperText = styled.View`
  flex: 8;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 5px;
`;

export const MainText = styled.Text`
  font-family: Roboto;
  font-size: 16px;
  padding-vertical: 20px; 
  font-weight: bold;
  letter-spacing: -0.23px;
`;

export const SubText = styled.Text`
  opacity: 0.91;
  font-family: Roboto;
  font-size: 12px;
`;
