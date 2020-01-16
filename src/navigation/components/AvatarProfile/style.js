import styled from 'styled-components/native';

export const Container = styled.View`
  margin-top: 30.5%;
  margin-left: 5.8%;
  display: flex; 
  flex-direction: row;
  width: 50%;
  height: 10%;
  align-items: center;
`;

export const CircleAvatar = styled.TouchableOpacity`
  border-width:1;
  border-color: rgba(0,0,0,0.2);
  width:60;
  height:60;
  background-color: #fff;
  border-radius:50;
  display: flex; 
  justify-content: center;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 50%;  
  height: 50%;
  resize-mode: stretch;
`;

export const AvatarText = styled.Text`  
  margin-left: 10%;
  text-align:center;
  font-size:18;
  color: #fff;
`;
