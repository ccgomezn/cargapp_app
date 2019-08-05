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
