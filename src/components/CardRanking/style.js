import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

export const WrapperCard = styled.TouchableOpacity`
  width: 100%;
  height: auto;
  borderRadius: 6;
  padding: 12px 18px;
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
  fontWeight: 600;
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
  width: 14;
  height: 14;
  marginRight: 4;
  paddingBottom: 2;
`;

export const SecondText = styled.Text`
  fontSize: 12.5;
  fontFamily: Roboto-Regular;
  color: #8a8c9d;
  letterSpacing: 0;
`;

export const Position = styled.View`
  position: absolute;
  right: 0;
  top: 5;
  marginRight: 0;
  width: 32px;
  backgroundColor: #deeafb;
  padding: 4px;
  textAlign: center;
`;

export const TextPosition = styled.Text`
  color: #6b9feb;
  fontFamily: Roboto-Regular;
  fontSize: 13;
  letterSpacing: 0;
  textAlign: center;
`;

export const ImageContent = styled.View`
  alignItems: center;
  flex: 1;
  margin-right: 15px;
`;

export const CircleBorder = styled(LinearGradient)`
  border-radius: 50px;
  text-align:center;
  overflow: hidden;
`;

export const ImageUser = styled.Image`
  height: 34px;
  width: 34px;
  border-radius: 50px;
  resize-mode: contain;
  background-color: #f3f3f3;
`;
