import styled from 'styled-components/native';

export const MainWrapper = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding: 5%;
  background-color: #f5f6fa;
`;

export const ContentView = styled.View`
  width: 100%;
  justify-content: center;
  flex-direction: row;
  height: auto;
  margin-bottom: 15px;
  padding: ${props => (props.subcontent ? '0px 10px' : '0px')};
`;


export const ContentBlock = styled.View`
  width: 100%;
  flex-direction: row;
  height: auto;
`;

export const TextBlack = styled.Text`
  width: 40%;
  font-family: Arial;
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  letter-spacing: -0.3px;
  color: #010935;
`;

export const ContentFilter = styled.View`
  width: 60%;
  align-self: stretch;
  color: #0068ff;
`;

export const TouchFilter = styled.TouchableOpacity`
  text-align: right;
`;

export const TextFilter = styled.Text`
  text-align: right;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.35px;
  color: #0068ff;
`;
