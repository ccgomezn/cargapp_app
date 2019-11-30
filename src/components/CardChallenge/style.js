import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const WrapperCard = styled.TouchableOpacity`
  flex: 1;
  height: auto;
  borderRadius: 8;
  backgroundColor: white;
  flexDirection: column;
  paddingVertical: 10;
  paddingHorizontal: 14;
  marginBottom: 5%;
  shadowColor: #589b9b9b;
  shadowOffset: { width: 0, height: 1 };
  shadowOpacity: 0.2;
  shadowRadius: 2;
  elevation: 1;
`;

export const Title = styled.Text`
  width: 100%;
  font-family: Roboto-Medium;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0px;
  color: #8a8c9d;
`;

export const TextSub = styled.Text`
  font-family: Roboto-Regular;
  font-size: 12px;
  letter-spacing: 0px;
  color: #8a8c9d;
`;

export const WrapperPoint = styled.View`
  position: absolute;
  right: 0px;
  top: 6px;
  margin-right: 5px;
`;

export const TextPoint = styled.Text`
  font-family: Roboto-Regular;  
  fontSize: 10;
  color: #010935;
  letterSpacing: 0;
`;

export const RowPercentage = styled.View`
  marginTop: 3;
  display: flex;
  alignContent: flex-end;
`;

export const TextPercentage = styled.Text`
  font-size: 10;
  align-content: center;
  text-align: right;
  color: #8a8c9d;
`;

export const BottomBar = styled.View`
  margin-top: 2;
  display: flex;
  background-color: #d8d8d8;
  border-radius: 4;
  height: 6;
`;

export const LineBar = styled(LinearGradient)`
  width: ${props => (props.valuePer ? `${props.valuePer}%` : '0%')};
  height: 6;
  borderRadius: 4;
`;

export const FullPoint = {
  color: '#a93cc9',
};
