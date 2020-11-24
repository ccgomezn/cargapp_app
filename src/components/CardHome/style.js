import styled from 'styled-components/native';

export const MainWrapper = styled.View`
  padding: 5%;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  top: 20px;
  right: 20px;
  left: 20px;
  border-radius: 8px;
  border: 1px solid #f3f3f3;
  background-color: white;
`;

export const Text = styled.Text`
  font-size: 20px;
  font-weight: bold
  color: black;
`;

export const WrapperRow = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  padding-bottom: 5%;
`;

export const WrapperDataColumn = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  `;

export const WrapperData = styled.View`
  justify-content: space-between;
  align-items: flex-start;
  padding-left: 2%;
`;

export const OpacityText = styled.Text`
  color: black;
  opacity: 0.6;
  font-size: 16px;
`;

export const NormalText = styled.Text`
  color: black;
  font-size: 10px;
  font-weight: bold;
`;

export const Image = styled.Image`
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background-color: gray;
  margin-top: 2%;  
  margin-left: 4%
`;
export const Line = styled.View`
  height: 35px;
  width: 1px;
  background-color: gray;
  border-radius: 2px;
  margin: 2%;
  margin-right: 5%;
`;
