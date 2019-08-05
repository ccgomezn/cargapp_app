import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const MainWrapper = {
  width: '85%',
  height: '100%',
  alginSelf: 'flex-end',
  backgroundColor: 'transparent',
};

export const Wrapper = styled(LinearGradient)`
    width: 100%;
    height: 15%;
    border-radius: 10px;
    margin-top: 170%;
    flex-direction: row;
    padding: 10px;
`;

export const WrapperIcon = styled.View`
  justify-content: center;
  align-items: center;
  flex: 3;
  height: 95px;
  margin-right: 15px;
  opacity: 0.7;
  background-color: white;
  border-radius: 5px;
`;

export const Icon = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 5px;
  background-color: #f3f3f3;
`;

export const WrapperInformation = styled.View`
  flex: 8;
  height: 100%;
  justify-content: flex-start;
`;

export const BoldText = styled.Text`
  font-family: Roboto;
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-top: 5%;
`;

export const NormalText = styled.Text`
  opacity: 0.8;
  font-family: Roboto;
  font-size: 14px;
  color: white;
  margin-top: 2%;
`;
