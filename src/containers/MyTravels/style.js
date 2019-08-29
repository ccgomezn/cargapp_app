import styled from 'styled-components/native';

export const MainView = styled.View`
`;

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

// style Swipe Filter
export const WrapperSwipe = styled.View`
  display: flex;
  height: auto;
  background-color: #f5f6fa;
  padding: 5%;
`;

export const RowContent = styled.View`
  width: 49%;
  height: auto;
`;

export const ContentSlider = styled.View`
  flex: 1;
  flex-direction: row;
  padding-bottom: 10;
  justify-content: center;
`;

export const ContentForm = styled.View`
  width: 100%;
  justify-content: center;
  flex-direction: column;
  height: auto;
  margin-bottom: 15px;
`;

export const ContentRange = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  height: auto;
  padding-bottom: 10px;
`;

export const RowInput = styled.View`
  width: 35%;
  height: auto;
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
`;

export const WrapperButtonGradient = styled.TouchableOpacity`
  width: 45%;
  height: 100%;
  margin-left: 3%;
`;
