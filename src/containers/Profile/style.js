import styled from 'styled-components/native';

export const MainWrapper = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: #f5f6fa;
`;

export const ContentInitial = styled.View`
  width: 100%;
  height: auto;
  border-radius: 8px;
  background-color: white;
  border: 1px solid #f3f3f3;
  padding-horizontal: 5%;
`;

export const SecondWrapper = styled.View`
  width: 100%;
  height: 100%;
  padding: 5%;
`;

export const ContentView = styled.View`
  width: 100%;
  justify-content: center;
  flex-direction: row;
  height: auto;
  margin-bottom: 15px;
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
  width: 100%;
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
`;

export const WrapperButtonGradient = styled.View`
  width: 45%;
  height: auto;
  margin-left: 3%;
`;

export const RowContent = styled.View`
  width: 49%;
`;

export const WrapperColumn = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-vertical: 14px;
  height: auto;
`;

export const WrapperImage = styled.View`
  flex: 1.5;
  justify-content: center;
  align-items: flex-start;
  border-radius: 50px;
`;

export const Image = styled.Image`
  height: 46px;
  width: 46px;
  border-radius: 50px;
  resize-mode: contain;
  background-color: #f3f3f3;
`;

export const WrapperInfo = styled.View`
  flex: 4;
  justify-content: space-between;
  align-items: flex-start;
`;

export const BoldText = styled.Text`
  font-family: Roboto;
  font-size: 14px;
  font-weight: bold;
  color: #010935;
`;

export const NormalText = styled.Text`
  opacity: 0.5;
  font-family: Roboto;
  font-size: 13px;
  font-weight: bold;
  color: #010935;
`;

export const ContentButton = styled.View`
  flex: 4;
  align-items: center;
  justify-content: center;
`;

// estilos Modal
export const MainWrapperDialog = styled.View`
  width: 90%;
  height: 55%;
  padding: 5%;
  padding-bottom: 0px;
  border-radius: 10px;
  align-self: center
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export const ScrollDialog = styled.ScrollView`
  width: 100%;
  height: auto;
`;

export const ContentDialog = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-self: center;
  align-items: center;
  font-family: Roboto;
`;

export const TitleBlack = styled.Text`
  font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
  color: #010935;
  padding-bottom: 5%;
`;

export const TextGray = styled.Text`
  opacity: 0.5;
  font-family: Roboto;
  font-size: 14px; 
  color: #010935;
  padding-bottom: 10px;
`;

export const TouchModal = styled.TouchableOpacity`
  min-width: 100%;
  width: 100%;
  height: auto;
  align-self: flex-end;
  bottom: 0;
  border-radius: 10px;
  margin-bottom: 12px;
`;

export const TextWhite = styled.Text`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.35px;
  text-align: center;
  color: white;
  align-self: center;
  padding-vertical: 18px;
  width:100%;
  background-color: #007aff;
`;
