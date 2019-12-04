import styled from 'styled-components/native';

export const TouchFilter = styled.TouchableOpacity`
  color: #0068ff;
`;

export const TextFilter = styled.Text`
  text-align: ${props => (props.float != null ? props.float : 'right')}
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.35px;
  color: #0068ff;
`;
