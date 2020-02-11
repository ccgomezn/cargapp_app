import styled from 'styled-components/native';

export const MainWrapper = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const WrapperInit = styled.View`
  position: absolute;
  width: 100%;
  height: auto;
  top: 40%;
  flex-direction: row;
  padding: 4%;
  background-color: rgba(245,246,250, 0.9);
`;

export const AbsoluteWrapper = styled.View`
  position: absolute;
  width: auto;
  height: auto;
  bottom: 22%;
  right: 3%;
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
  width: 100%;
  height: auto;  
`;

export const WrapperTopCard = styled.View`
  position: absolute;
  width: 80%;
  height: auto;
  right: 3%;
  top: 5px;
  opacity: 0.88;
`;

export const BlueText = styled.Text`
  color: #0068ff;
  font-size: 18px;
  align-self: center;
  text-align: center;
`;

export const WrapperModal = styled.View`
  width: 80%;
  height: auto;
  background-color: white;
  align-self: center;
  border-radius: 10px;
  padding: 3%;
  z-index: 1700;
`;

export const WrapperTextModal = styled.View`
  width: 100%;
  height: auto;
  padding: 3%;
`;

export const CustomImage = styled.Image`
  width: 50px;
  height: 50px;
  resize-mode: contain;
  z-index: 1000;
`;
