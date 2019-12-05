import styled from 'styled-components/native';
import { colors } from '../../themes/theme.style';

export const MainView = styled.View`
`;

export const MainWrapper = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding: 5%;
  background-color: ${colors.MainWrapperColor};
`;

export const ContentView = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  flex-direction: row;
  height: auto;
  margin-bottom: 15px;
  padding: ${props => (props.subcontent ? '0px 10px' : '0px')};
`;

export const ContentOffer = styled.ScrollView`
width: 100%;
flex-direction: column;
height: 100%;
margin-bottom: 15px;
padding: ${props => (props.subcontent ? '8px 10px' : '0px')};
`;

export const ContentBlock = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  height: auto;
`;

export const TextBlack = styled.Text`
  width: auto;
  font-family: Arial;
  font-size: 18px;
  font-weight: bold;
  font-style: normal;
  letter-spacing: -0.3px;
  color: #010935;
`;

export const ContentFilter = styled.View`
  width: auto;
  align-self: stretch;
  border: 1px solid #0068ff;
  border-radius: 5px;
  padding-horizontal: 3%;
  padding-vertical: 1%;
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

// style Swipe Filter
export const WrapperSwipe = styled.View`
  display: flex;
  height: auto;
  background-color: ${colors.MainWrapperColor};
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

export const WrapperTouch = styled.TouchableOpacity`
  width: 100%;
  height: auto;
`;

export const TextTouch = styled.Text`
  font-size: 16px;
  color: black;
  padding-vertical: 8px;
`;

export const WrapperSpecific = styled.View`
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: auto;
  padding-left: 10px;
  border: 1px solid #f3f3f3;
  background-color: white;
`;

export const GrayText = styled.Text`
  font-size: 12px;
  color: gray;
`;
