import styled from 'styled-components/native';

export const WrapperContent = styled.View`
  height: auto;
  background-color: rgba(245,246,250, 0.7);
  width: 100%;
  position: absolute;
  padding: 20px;
  top: 0;
`;

export const NormalText = styled.Text`
  color: black;
  font-size: 18px;
  font-weight: bold;
  padding-vertical: 2%;
`;

export const MainWrapper = styled.View`
  width: 100%;
  height: 100%;
`;

export const WrapperSwipeable = styled.View`
  flex-direction: row;
`;

export const CustomImage = styled.Image`
  width: 50px;
  height: 50px;
  resize-mode: stretch;
  z-index: 1000;
`;
