import styled from 'styled-components/native';

export const WrapperTouchable = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  flex-direction: row;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
`;

export const WrapperLogo = styled.View`
  flex: 1.6;
  margin-left: 1%;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

export const WrapperText = styled.View`
  flex: 8;
  justify-content: center;
  align-items: center;
  height: 100%;
  align-self: center;
`;

export const Logo = styled.Image`
  width: 80%;
  height: 90%;
  resize-mode: contain;  
`;

export const Text = styled.Text`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;  
  letter-spacing: 0.4px;
  color: white;    
`;
