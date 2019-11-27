import styled from 'styled-components/native';

export const MainWrapper = styled.View`
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const MainText = styled.Text`
  font-size: 14px;
  color: #010935;
  padding-horizontal: 40px;
`;

export const BlueText = styled.Text`
  font-size: 14px;
  color: #007cfc;
  text-align: center;
  margin-top: 5%;
`;

export const WrapperCode = styled.View`
  align-self: center;
  margin-top: 2%;
  border-radius: 7px;
  border: 2px solid #007cfc;
  padding-horizontal: 40px;
  padding-vertical: 10px;
  justify-content: center;
  align-items: center;
`;

export const BoldText = styled.Text`
  font-size: 16px;
  color: black;
  font-weight: bold;
  text-transform: uppercase;
`;
