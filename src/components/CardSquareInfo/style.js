import styled from 'styled-components/native';

export const MainWrapper = styled.View`
    width: 100%;
    height: auto;
    border-radius: 8px;
    background-color: white;
    padding: 20px;
    `;

export const WrapperHeader = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    `;

export const Icon = styled.Image`
    resize-mode: contain;
    height: 30px;
    width: 30px;
    background-color: #f3f3f3;
    `;

export const TextPrice = styled.Text`
    font-family: Roboto;
    font-size: 22px;
    color: #010935;
    padding-left: 5px;
    `;

export const TextDescription = styled.Text`
    padding-top: 20px;
    font-family: Roboto;
    font-size: 14px;
    line-height: 1.29;
    color: #80849a;
    `;