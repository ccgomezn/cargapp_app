import styled from 'styled-components/native';

export const MainWrapper = styled.TouchableOpacity`
  width: 100%;
  height: auto;
  flex-direction: row;
  border: 1px solid #CCCCCC;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
`;

export const TextWrapper = styled.View`
  width: auto;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
`;

export const MainText = styled.Text`
  color: black;
  font-size: 15px;
  font-weight: bold;
`;

export const SubText = styled.Text`
  color: black;
  opacity: 0.7;
  font-size: 14px;
  text-align: left;
`;
