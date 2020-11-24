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

export const ContentBlock = styled.View`
  width: 100%;
  height: auto;
  flex-direction: column;
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

/* export const WrapperButtonsBottom = styled.View`
  width: 100%;
  flex-direction: row;
  height: auto;
  justify-content: flex-end;
  padding-bottom: 10px;
  margin-bottom: 10px;
`; */

export const WrapperButtonGradient = styled.TouchableOpacity`
width: 48%;
height: 100%;
margin-left: 3%;
margin-bottom: 6px;
`;

export const TextGray = styled.Text`
  opacity: 0.5;
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-style: normal;
  letter-spacing: -0.3px;
  color: #010935;
  margin-top: 4px;
`;

export const TextModalGray = styled.Text`
  opacity: 0.5;
  font-family: Roboto;
  font-size: 14.5px;
  font-weight: normal;
  font-style: normal;
  letter-spacing: -0.3px;
  color: #010935;
  margin-top: 4px;
  text-align: center;
`;

export const WrapperDocument = styled.View`
  width: 100%;
  height: auto;
  margin-top: 5px;
  margin-bottom: 10px;
  padding-bottom: 20px;
`;

export const RowDocument = styled.View`
  width: 100%;
  margin-top: 10px;
`;

export const WrapperError = styled.View`
  width: 100%;
  font-size: 14px;
  letter-spacing: -0.4px;
  padding-bottom: 5px;
  padding-top: 12px;
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

// estilos Modal
export const MainWrapperDialog = styled.View`
  width: 90%;
  padding: 2%;
  padding-bottom: 0px;
  border-radius: 10px;
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export const NextWrapperDialog = styled.View`
  width: 90%;
  padding: 6%;
  padding-bottom: 0px;
  border-radius: 10px;
  align-self: center;
  align-items: center;
  justify-content: center;
  background-color: #F4F6F7;
`;

export const ContentDialog = styled.View`
  width: 100%;
  height: auto;
  justify-content: center;
  align-self: center;
  align-items: center;
  font-family: Roboto;
  padding-top: 0px;
`;

export const WrapperImage = styled.View`
  width: 100%;
  margin-top: 10px;
  marginBottom: 10px;
`;

export const ImageDetail = styled.Image`
  width: 100%;
  height: 250;
`;

export const WrapperTitle = styled.View`
  width: 100%;
  height: auto;
  margin-top: 10px;
`;

export const TitleDesc = styled.Text`
  font-family: Roboto-Regular;
  font-size: 16px;
  font-weight: 500;
  letterSpacing: 0;
  text-align: center;
  width: 100%;
  color: #010935;
`;

export const WrapperButtonsBottom = styled.View`
width: 100%;
flex-direction: row;
height: auto;
justify-content: flex-end;
padding-bottom: 10px;
`;
