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
  justify-content: flex-start;
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

export const ContentSection = styled.View`
  width: 100%;
  height: auto;
  background-color: transparent;
  flex-direction: row;
  padding-vertical: 2px;
  align-self: center;
  justify-content: space-between;
`;

export const TextBlack = styled.Text`
  width: 100%;
  font-family: Roboto;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 0px;
  color: #010935;
`;

export const TextGray = styled.Text`
  font-family: Roboto-Regular;
  font-size: 16px;
  letter-spacing: 0px;
  color: #8a8c9d;
`;

export const CardItems = styled.View`
  flexDirection: column;
  width: 100%;
`;
