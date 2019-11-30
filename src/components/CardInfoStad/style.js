import styled from 'styled-components/native';

export const WrapperCard = styled.TouchableOpacity`
  flex: 1;
  height: auto;
  border-radius: 8;
  background-color: white;
  flex-direction: column;
  padding-vertical: 14;
  padding-horizontal: 20;
  align-content: center;
  shadow-color: #589b9b9b;
  shadow-offset: { width: 0, height: 1 };
  shadow-opacity: 0.4;
  shadow-radius: 6;
`;

export const TextGray = styled.Text`
  font-family: Roboto-Regular;
  font-size: 16px;
  letter-spacing: 0px;
  color: #8a8c9d;
`;

export const ContentTitle = styled.View`
  backgroundColor: white;
  marginBottom: 10;
  marginTop: 5;
`;

export const Title = styled.Text`
  fontSize: 20;
  fontFamily: Roboto-Bold;
  color: #010935;
  letterSpacing: 0;
  marginBottom: 2;
`;

export const WrapperStad = styled.View`
  flexDirection: row;
  backgroundColor: white;
`;

export const StadLeft = styled.View`
  flex: 3;
  marginRight: 5;
`;

export const StadRight = styled.View`
  flex: 3;
`;

export const ViewRow = styled.View`
  flexDirection: row;
`;

export const ViewFlex = styled.View`
  flex: 2;
`;

export const IconCircle = styled.Image`
  width: 20;
  height: 20;
`;

export const ContentStad = styled.View`
  flexDirection: column;
  flex: 8;
`;

export const TextSubt = styled.Text`
  fontSize: 10;
  color: #010935;
  letterSpacing: 0;
  fontFamily: Roboto-Regular;
`;
