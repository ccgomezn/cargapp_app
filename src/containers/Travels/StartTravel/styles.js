import styled from 'styled-components/native';

export const MainWrapper = styled.View`
  width: 100%;
  height: 100%;
  /* justify-content: center;
  align-items: center; */
  flex-direction: column;
`;

export const WrapperInit = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0%;
  flex-direction: row;
  padding: 4%;
  z-index: 99;
  justify-content: center;
  align-items: center;
  background-color: rgba(245,246,250, 0.44);
`;

export const AbsoluteWrapper = styled.View`
  position: absolute;
  width: auto;
  height: auto;
  bottom: 22%;
  right: 3%;
  flex-direction: row;
`;

export const WrapperButtons = styled.View`
  width: auto;
  margin-left: 3%;
  margin-bottom: 2%;
  flex-direction: row;
`;

export const TouchableNavigationButtons = styled.TouchableOpacity`
  height: auto;
  width: auto;
`;

export const WrapperImage = styled.Image`
  width: 50px;
  height: 50px;
  resize-mode: contain;
`;

export const WrapperAdresses = styled.View`
  position: absolute;
  bottom: 4%;
  width: 100%;
  height: auto;
  opacity: 0.88;  
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

export const WrapperTopCard = styled.View`
  position: absolute;
  width: 100%;
  height: auto;
  top: 2%;
  opacity: 0.88;
  padding-horizontal: 3%;
  /* right: 3%;
  left: 3%; */
`;

export const BlueText = styled.Text`
  color: #0068ff;
  font-size: 18px;
  align-self: center;
  text-align: center;
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

export const WrapperSwipeable = styled.View`
  padding: 20px;
  margin-bottom: 100px;
`;

export const BlueTextPDF = styled.Text`
  color: #0068ff;
  font-size: 24px;
  align-self: center;
  text-align: center;
  padding-vertical: 20px;
  margin-top: 15px;
`;
