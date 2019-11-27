import styled from 'styled-components/native';

export const MainWrapper = styled.TouchableOpacity`
    width: 100%;
    height: auto;
    flex-direction: row;
    border-radius: 10px;
    background-color: white;
    margin-bottom: 5px;
`;

export const MainText = styled.Text`
  font-family: Roboto;
  font-size: 15px;
  font-weight: 500;
  color: #2C2C34;
`;

export const SubText = styled.Text`
  font-family: Roboto;
  font-size: 14px;
  color: gray;
`;

export const WrapperText = styled.View`
  flex-direction: row;
  margin-bottom: 3px;
`;

export const WrapperIcon = styled.View`
  flex: 2; 
  justify-content: center;
  align-content: center;
  align-self: center;
`;

export const IconTruck = styled.Image`
  width: 55px;
  height: 40px;
  resize-mode: contain;
  align-self: center;
`;

export const WrapperData = styled.View`
  flex: 8;
  flex-direction: row;
  padding: 4px;
  align-content: center;
`;

export const WrapperInfo = styled.View`
  flex: 9;
  flex-direction: column;
  background-color: #fff;
  align-self: center;
`;

export const WrapperBtn = styled.View`
  flex: 1;
  justifyContent: center;
  alignContent: center;
  alignItems: center;
`;

export const IconArrow = styled.Image`
  width: 30px;
  height: 30px;
`;
