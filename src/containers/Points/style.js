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

export const Section = styled.TouchableOpacity`
  min-width: 30%;
  border-radius: 6px;
  background-color: white;
  padding: 8px 12px;
`;

export const PointRet = styled.View`
  position: absolute;
  right: 0px;
  top: 5px;
  margin-right: 5px;
`;
