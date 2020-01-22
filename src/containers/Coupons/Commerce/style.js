import styled from 'styled-components/native';

export const MainWrapper = styled.View`
    width: 100%;
    height: 100%;
    margin-top: 20px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`;

export const WrapperCarousel = styled.View`
    align-self: flex-start;
    height: auto;
    width: 100%;
`;

export const WrapperButton = styled.View`
    align-self: center;
    width: 80%;
`;

export const WrapperText = styled.View`
    width: 100%;
    height: auto;
    align-self: flex-end;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 30px;
`;

export const TextTerms = styled.Text`
    font-size: 11px;
    color: black;
    flex-direction: column;
    text-align: center;
`;

export const BlueText = styled.Text`
    font-family: Roboto;
    font-size: 14px;
    font-weight: 500;
    align-self: center;
    color: #0068ff;
`;
