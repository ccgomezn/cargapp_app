import styled from 'styled-components/native';
import { colors } from '../../themes/theme.style';

export const MainWrapper = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding: 5%;
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
