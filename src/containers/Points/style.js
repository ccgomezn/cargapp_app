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
  margin-bottom: 5%;
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

export const ContentSection = styled.View`
  flex: 1;
  height: auto;
  backgroundColor: transparent;
  flexDirection: row;
  paddingVertical: 2;
  alignSelf: center;
  justifyContent: space-between;
`;

export const TextBlack = styled.Text`
  width: 100%;
  font-family: Roboto;
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 0px;
  color: #010935;
`;

export const TextGray = styled.Text`
  font-family: Roboto-Regular;
  font-size: 16px;
  letter-spacing: 0px;
  color: #8a8c9d;
`;

export const PointRet = styled.View`
  position: absolute;
  right: 0px;
  top: 5px;
  margin-right: 5px;
`;
