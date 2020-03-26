import styled from 'styled-components/native';

export const Principal = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const MainWrapper = styled.View`
  flex: 6;
  height: auto;
  border-radius: 8px;
  background-color: white;
  border: 1px solid #f3f3f3;
  padding-horizontal: 10px;
  padding-vertical: 0px;
  flex-direction: row;
`;

export const EmptyWrapper = styled.View`
  flex: 6;
  height: auto;
`;

export const WrapperColumn = styled.View`
  flex: 1;
  flex-direction: row;
  height: auto;
  justify-content: center;
  align-items: center;
  padding-vertical: 5px;
`;

export const Image = styled.Image`
    height: 25px;
    width: 25px;
    resize-mode: contain;
    `;

export const TouchableContact = styled.TouchableOpacity`
  flex: 3;
  align-items: center;
  justify-content: center;
  height: 24px;
`;

export const BlueText = styled.Text`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  color: #0068ff;
`;

export const TouchableDoc = styled.TouchableOpacity`
  flex: 1;
  margin-right: 3%;
  justify-content: center;
  align-items: center;
  padding: 5px;
  background-color: #0068ff;
  border-radius: 10px;
`;
