import styled from 'styled-components/native';

export const MainWrapper = styled.View`
  width: 100%;
  height: 100%;
  padding-horizontal: 20px;
`;

export const MainWrapperScroll = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding-bottom: 20px;
`;

export const MainTextCard = styled.Text`
  font-size: 18px;
  color: #0068ff;
  padding-vertical: 20px;
  text-align: left;
  align-self: flex-start;
  font-weight: bold;
`;

export const TextAbsolute = styled.Text`
  position: absolute;
  top: 45%;
  font-size: 18px;
  color: #0068ff;
  text-align: center;
  align-self: center;
  font-weight: bold;
  padding-horizontal: 15%;
`;
