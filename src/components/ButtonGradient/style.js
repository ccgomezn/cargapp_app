import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const Touch = styled.TouchableOpacity`
  width: 100%;
  border-radius: 2px;
`;

export const Linear = styled(LinearGradient)`
  flex: 1;
`;

export const Text = styled.Text`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500; 
  letter-spacing: -0.35px;
  color: white;
  padding: 15px;
  align-self: center;
`;
