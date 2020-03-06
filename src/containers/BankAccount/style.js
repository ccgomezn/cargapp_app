import styled from 'styled-components/native';

export const MainWrapper = styled.View`
  width: 100%;
  height: 100%;
`;

export const MainWrapperScroll = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

export const TouchableCreate = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 45%;
  align-self: center;
  `;

export const MainText = styled.Text`
  font-size: 18px;
  color: #0068ff;
  padding-horizontal: 10%;
  text-align: center;
`;

export const MainTextCard = styled.Text`
  font-size: 18px;
  color: black;
  padding-left: 20px;
  padding-top: 20px;
  text-align: left;
  align-self: flex-start;
  font-weight: bold;
`;

export const MainTextOpacity = styled.Text`
  font-size: 18px;
  color: #0068ff;
  padding-horizontal: 10%;
  text-align: center;
  opacity: 0.8;
  font-size: 15px;
`;

export const WrapperCardAccount = styled.View`
  width: 100%;
  height: 100%;
  padding: 20px;  
`;

export const TouchableCreateNewAccount = styled.TouchableOpacity`
  position: absolute;
  bottom: 3%;
  align-self: center
`;
