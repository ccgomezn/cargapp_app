import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Touch = styled.TouchableOpacity`
  width: 35%;
  border-radius: 2px;
  margin-left: 3%;
`;

export const Linear = styled(LinearGradient)`
  flex: 1;
`;

export const Text = styled.Text`
  font-family: Arial;
  font-size: 14px;
  font-weight: 500; 
  letter-spacing: -0.35px;
  color: white;
  padding: 15px;
  align-self: center;
`;
