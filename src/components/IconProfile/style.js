import styled from 'styled-components/native';

export const ContaintView = styled.View`
  height: 80px;
  width: 80px;
`;

export const TouchSection = styled.TouchableOpacity`
  
`;

export const ContaintIcon = styled.View`
  width: 100%;  
  height: 100%;
`;

export const CircleIcon = styled.View`
  border-radius: 50px;
  text-align: center;
  background-color: red;
`;

export const DrawIcon = styled.Image`
  width: 75px;
  height: 75px;
  margin: 2px;
  border-radius: 50px;
  background-color: white;
`;

export const IconEdit = styled.Image`
  position: absolute;
  top: 0;
  right: -2;
  width: 28px;
  height: 28px;
  resize-mode: stretch;
`;
