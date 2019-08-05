import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const MainWrapper = styled.View`
    width: 100%;
    height: auto;
    flex-direction: row;
    border-radius: 10px;
    background-color: white;
`;

export const MainText = styled.Text`
  font-family: Roboto;
  font-size: 28px;
  font-weight: 500
  color: white;
`;

export const SubText = styled.Text`
  font-family: Roboto;
  font-size: 14px;
  color: white;
`;

export const SecondWrapper = styled.View`
    flex: 1.3;
    justify-content: center;
    align-items: center;
    padding: 20px;
`;

export const Linear = styled(LinearGradient)`
  flex: 1;
  padding-vertical: 40px;
  justify-content: space-around;
  align-items: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;
