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

export const ContentOffer = styled.View`
width: 100%;
justify-content: center;
flex-direction: column;
height: auto;
margin-bottom: 15px;
padding: ${props => (props.subcontent ? '8px 10px' : '0px')};
`;

export const ContentBlock = styled.View`
  width: 100%;
  flex-direction: row;
  height: auto;
`;

export const TextBlack = styled.Text`
  width: 30%;
  font-family: Arial;
  font-size: 16px;
  font-weight: bold;
  font-style: normal;
  letter-spacing: -0.3px;
  color: #010935;
`;

export const ContentFilter = styled.View`
  width: 70%;
  align-self: stretch;
`;

export const Touchablebtn = styled.TouchableHighlight`
  flex:1;
  background-color: white;
  align-items: center;
  width: 65px;
  margin-right: 10px;
  height: 55px;
`;

export const Textbtn = styled.Text`
  font-family: Roboto;
  font-size: 12px;
  font-weight: bold;
  color: #010935;
`;
