import styled from 'styled-components/native';

export const Container = styled.View`
  margin-top: 26%;
  margin-left: 5.8%;
  display: flex; 
  flex-direction: row;
  width: 100%;
  height: 10%;
  align-items: center;
`;

export const CircleAvatar = styled.TouchableOpacity`
  border-width: 1;
  border-color: rgba(0,0,0,0.2);
  width: 80px;
  height: 80px;
  background-color: #fff;
  border-radius: 50px;
  display: flex; 
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const Avatar = styled.Image`
  border-radius: 50;
  resize-mode: contain;
`;

export const WrapText = styled.TouchableOpacity`
  flex-direction: column;
`;

export const AvatarText = styled.Text`
  margin-left: 10px;
  text-align: left;
  font-size: 16;
  color: #fff;
  height: 20px;
`;

export const SecondText = styled.Text`
  margin-left: 10px;
  text-align: left;
  font-size: 18;
  color: #fff;
  height: 20px;
`;
