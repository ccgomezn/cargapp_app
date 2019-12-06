import styled from 'styled-components/native';

export const WrapperCard = styled.TouchableOpacity`
  width: 100%;
  height: auto;
  borderRadius: 6;
  padding: 14px;
  backgroundColor: white;
  shadowColor: #589b9b9b;
  shadowOffset: { width: 0, height: 1 };
  shadowOpacity: 0.4;
  shadowRadius: 6;
  justifyContent: flex-start;
  marginBottom: 5%;
`;

export const ContentCard = styled.View`
  flexDirection: row;
`;

export const ContentText = styled.View`
  flexDirection: column;
  flex: 8;
`;

export const TextTitle = styled.Text`
  fontSize: 14;
  fontFamily: Roboto-Medium;
  color: #8a8c9f;
  letterSpacing: 0;
`;

export const ContentSecond = styled.View`
  flexDirection: row;
  marginTop: 4;
`;

export const RowLeft = styled.View`
  flex: 4;
  flexDirection: row;
`;

export const RowRight = styled.View`
  flex: 6;
  flexDirection: row;
`;

export const IconCircle = styled.Image`
  width: 12;
  height: 12;
  marginRight: 4;
  paddingBottom: 2;
`;

export const SecondText = styled.Text`
  fontSize: 12;
  fontFamily: Roboto-Regular;
  color: #8a8c9f;
  letterSpacing: 0;
`;

export const Position = styled.View`
  position: absolute;
  right: 0;
  top: 6;
  marginRight: 0;
  width: 25px;
  backgroundColor: #deeafb;
  padding: 5px;
`;

export const TextPosition = styled.Text`
  color: #6b9feb;
  fontSize: 10;
  letterSpacing: 0;
`;

export const ImageContent = styled.View`
  alignItems: center;
  flex: 2;
  textAlign: center;
`;
