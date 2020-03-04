import styled from 'styled-components/native';
import { colors } from '../../../themes/theme.style';

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

export const ContentForm = styled.View`
  width: 100%;
  justify-content: center;
  flex-direction: column;
  height: auto;
  margin-bottom: 15px;
`;

export const ContentBlock = styled.View`
  width: 100%;
  height: 20px;
  flex-direction: row;
`;

export const TextBlack = styled.Text`
  width: 60%;
  font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  letter-spacing: -0.3px;
  color: #010935;
`;

export const WrapperInputs = styled.View`
  width: 100%;
  height: auto;
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
  width: 48%;
  height: 100%;
  margin-left: 3%;
  margin-bottom: 6px;
`;

export const WrapperError = styled.View`
  font-size: 14px;
  letter-spacing: -0.4px;
  margin-bottom: 1%;
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

export const TextLoad = styled.View`
  display: flex;
  height: auto;
  align-items: center;
  align-self: center;
  text-align: center;
`;
