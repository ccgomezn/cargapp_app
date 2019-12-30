import styled from 'styled-components/native';

export const MainWrapper = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const AbsoluteWrapper = styled.View`
  position: absolute;
  width: auto;
  height: auto;
  bottom: 25%;
  right: 5%; 
  flex-direction: row;
`;

export const TouchableNavigationButtons = styled.TouchableOpacity`
  height: auto;
  width: auto;
`;

export const WrapperImage = styled.Image`
  width: 50px;
  height: 50px;
  resize-mode: stretch;
`;

export const WrapperAdresses = styled.View`
  position: absolute;
  bottom: 5%;
  width: 90%;
  height: auto;  
`;

export const WrapperTopCard = styled.View`
  position: absolute;
  width: 100%;
  height: auto;
  padding-horizontal: 5%;
  top: 10px;
`;

export const BlueText = styled.Text`
  color: #0068ff;
  font-size: 18px;
  align-self: center;
  text-align: center;
  padding-bottom: 5%;
`;

export const WrapperModal = styled.View`
  width: 80%;
  background-color: white;
  align-self: center;
  border-radius: 30px;
  padding: 7%;
`;

export const CustomImage = styled.Image`
  width: 40px;
  height: 50px;
  resize-mode: stretch;
  z-index: 1000;
`;
