import styled from 'styled-components/native';

export const WrapperCard = styled.TouchableOpacity`
  backgroundColor: #fff;
  height: auto;
  minWidth: 46%;
  maxWidth: 46%;
  padding: 10px;
  marginBottom: 20;
  borderRadius: 8;
  shadowColor: #589b9b9b;
  shadowOffset: { width: 0, height: 1 };
  shadowOpacity: 0.4;
  shadowRadius: 3;
`;

export const WrapperContent = styled.View`
  flexDirection: column;
  marginBottom: 8;
  borderRadius: 8;
`;

export const WrapperImage = styled.View`
  backgroundColor: #d8d8d8;
  height: 100;
  border-radius: 4;
`;

export const WrapperText = styled.View`
  flex: 1;
  marginTop: 6;
  marginBottom: 6;
`;

export const TextDesc = styled.Text`
  flexWrap: wrap;
  fontSize: 14px;
  letterSpacing: 0;
  color: #8a8c9d;
  fontFamily: Roboto-Regular;
`;

export const TextPoint = styled.Text`
  letterSpacing: 0;
  color: #010935;
  fontSize: 12px;
  fontFamily: Roboto-Regular;
`;

export const WrapperCheck = styled.View`
  position: absolute;
  bottom: -5;
  right: -4;
  backgroundColor: #fff;
  width: 35px;
  height: 35px;
  border-width: 2;
  border-color: #007aff;
  border-radius: 4;
  text-align: center;
  justify-content: center;
`;

export const CheckImage = styled.Image`
`;

export const ImageView = styled.Image`
  width: 100%;
  height: 100;
`;
