import styled from 'styled-components/native';

export const MainWrapper = styled.View`
    width: 100%;
    height: 100%;
    background-color: #010935;
    align-self: center;
    justify-content: center;  
`;

export const ImageUrl = styled.Image`
    width: 60%;
    height: 10%;
    resize-mode: contain;
    align-self: center;
`;

export const Text = styled.Text`
    position: absolute;
    bottom: 0;
    color: white;
    align-self: center;
    padding-vertical: 20px;
`;

export const BoldText = styled.Text`
  font-weight: bold;
  text-align: center;
  align-self: center;
  font-size: 18px;
  color: #0168ff;
`;

export const Wrapper = styled.View`
  padding: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: white;
  margin-horizontal: 40px;
`;
