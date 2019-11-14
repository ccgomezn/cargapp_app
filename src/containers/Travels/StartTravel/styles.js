import styled from 'styled-components/native';

export const MainWrapper = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const AbsoluteWrapper = styled.View`
  position: absolute;
  width: auto;
  height: auto;
  top: 10px;
  right: 10px; 
  flex-direction: row;
`;

export const TouchableNavigationButtons = styled.TouchableOpacity`
  height: auto;
  width: auto;
`;

export const WrapperImage = styled.Image`
  width: 50px;
  height: 50px;
  resize-mode: stretch;
`;

export const WrapperAdresses = styled.View`
  position: absolute;
  bottom: 5%;
  width: 90%;
  height: auto;  
`;
