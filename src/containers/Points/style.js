import styled from 'styled-components/native';
import { colors } from '../../themes/theme.style';

export const MainWrapper = styled.ScrollView`
  width: 100%;
  height: auto;
  padding: 4%;
  background-color: ${colors.MainWrapperColor};
`;

export const ContentView = styled.View`
  width: 100%;
  justify-content: flex-start;
  height: auto;
  margin-bottom: 5%;
  padding: ${props => (props.subcontent ? '0px 10px' : '0px')};
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

export const CardItems = styled.View`
  flexDirection: column;
  width: 100%;
`;

export const WrapperTab = {
  height: 35,
  backgroundColor: 'transparent',
  marginBottom: 15,
  marginTop: 15,
};

export const SegmentTab = {
  backgroundColor: '#FFF',
  borderWidth: 1,
  borderColor: 'transparent',
  borderRadius: 6,
  marginLeft: 14,
  marginRight: 14,
};

export const ActiveButtonTab = {
  backgroundColor: '#8a8c9d',
  borderRadius: 6,
};

export const TitleTab = {
  fontFamily: 'Roboto-Regular',
  fontSize: 16,
  color: '#8a8c9d',
  letterSpacing: 0,
};

export const ActiveTitleText = {
  color: '#ffffff',
};

export const FirstTab = {
  marginLeft: 0,
  marginRight: 14,
};

export const LastTab = {
  marginRight: 0,
  marginLeft: 0,
};

// estilos Modal
export const MainWrapperDialog = styled.View`
  width: 90%;
  padding: 5%;
  padding-bottom: 0px;
  border-radius: 10px;
  align-self: center
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export const ContentDialog = styled.View`
  width: 100%;
  height: auto;
  justify-content: center;
  align-self: center;
  align-items: center;
  font-family: Roboto;
  padding-top: 6px;
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
  font-family: Roboto-Bold;
  font-size: 14px; 
  color: #010935;
  padding-bottom: 10px;
`;

export const WrapperButtonsBottom = styled.View`
  width: 100%;
  flex-direction: row;
  height: auto;
  justify-content: flex-end;
  padding-bottom: 10px;
`;

export const WrapperStad = styled.View`
  flexDirection: row;
  backgroundColor: white;
`;

export const StadLeft = styled.View`
  flex: 3;
  marginRight: 5;
`;

export const StadRight = styled.View`
  flex: 3;
`;

export const WrapperImage = styled.View`
  width: 100%;
  margin-top: 10px;
  marginBottom: 15px;
`;

export const TextDesc = styled.Text`
  font-family: Roboto-Regular;
  font-size: 14px;
  letterSpacing: 0;
  text-align: left;
  width: 100%;
  color: #010935;
  marginTop: 8px;
  marginBottom: 8px;
`;

export const TitleDesc = styled.Text`
  font-family: Roboto-Regular;
  font-size: 16px;
  font-weight: 500;
  letterSpacing: 0;
  text-align: left;
  width: 100%;
  color: #8a8c9d;
`;

export const ImageDetail = styled.Image`
  width: 100%;
  height: 140;
`;

export const TextTop = styled.Text`
  font-family: Roboto-Regular;
  font-size: 16px;
  letter-spacing: 0px;
  color: #8a8c9d;
  text-align: center;
  margin-bottom: 10px;
`;
