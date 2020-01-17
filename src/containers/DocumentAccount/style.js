import styled from 'styled-components/native';
import { colors } from '../../themes/theme.style';

export const MainWrapper = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding: 5%;
  background-color: ${colors.MainWrapperColor};
`;

export const ContentView = styled.View`
  width: 100%;
  justify-content: center;
  flex-direction: row;
  height: auto;
  margin-bottom: 5%;
  padding: ${props => (props.subcontent ? '0px 10px' : '0px')};
`;

export const ContentBlock = styled.View`
  width: 100%;
  height: auto;
  flex-direction: column;
`;

export const TextBlack = styled.Text`
  width: 100%;
  font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  letter-spacing: -0.3px;
  color: #010935;
`;

export const WrapperButtonsBottom = styled.View`
  width: 100%;
  flex-direction: row;
  height: auto;
  justify-content: flex-end;
  padding-bottom: 10px;
  margin-bottom: 10px;
`;

export const WrapperButtonGradient = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
`;

export const TextGray = styled.Text`
  opacity: 0.5;
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  letter-spacing: -0.3px;
  color: #010935;
  margin-top: 4px;
`;

export const WrapperDocument = styled.View`
  width: 100%;
  margin-top: 5px;
  margin-bottom: 15px;
`;

export const RowDocument = styled.View`
  width: 100%;
  margin-top: 10px;
`;

export const WrapperError = styled.View`
  width: 100%;
  font-size: 14px;
  letter-spacing: -0.4px;
`;

export const TextError = styled.Text`
  opacity: 0.95;
  font-family: Roboto;
  font-weight: 600;
  font-style: normal;
  letter-spacing: -0.5px;
  background-color: #ff2557; //#d3e5ff;
  padding: 10px 6px;
  color: #fff;
  border-radius: 6px;
  margin-bottom: 2px;
`;