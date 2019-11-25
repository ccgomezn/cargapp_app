import styled from 'styled-components/native';

export const MainWrapper = styled.TouchableOpacity`
  width: 100%;
  height: auto;
  flex-direction: row;
  border: 1px solid gray;
  background-color: white;
  justify-content: space-between;
  align-items: center;
`;

export const TextWrapper = styled.View`
  width: auto;
  flex-direction: column;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
`;

export const MainText = styled.Text`
  color: black;
  font-size: 18px;
`;

export const SubText = styled.Text`
  color: black;
  opacity: 0.7;
  font-size: 14px;
`;
