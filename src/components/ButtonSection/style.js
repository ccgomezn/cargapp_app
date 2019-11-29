import styled from 'styled-components/native';

export const WrapperSection = styled.TouchableOpacity`
  min-width: 30%;
  border-radius: 6px;
  background-color: white;
  padding: 8px 12px;
  shadowColor: #589b9b9b;
  shadowOffset: { width: 0, height: 1 };
  shadowOpacity: 0.2;
  shadowRadius: 2;
  elevation: 1;
  align-content: center;
`;

export const TextGray = styled.Text`
  font-family: Roboto-Regular;
  font-size: 16px;
  letter-spacing: 0px;
  color: #8a8c9d;
  text-align: center;
`;

export const ActiveButton = {
  backgroundColor: '#8a8c9d',
};

export const ActiveTitle = {
  color: 'white',
};
