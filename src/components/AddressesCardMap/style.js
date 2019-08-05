import styled from 'styled-components/native';

export const MainWrapper = styled.View`
    width: 100%;
    height: auto;
    border-radius: 8px;
    background-color: white;
    `;

export const WrapperCard = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    `;

export const WrapperIcon = styled.View`
    flex: 2;
    justify-content: center;
    align-items: center;
    `;

export const Icon = styled.Image`
    width: 30px;
    height: 30px;
    background-color: gray;
    `;

export const WrapperInfo = styled.View`
    flex: 8;
    flex-direction: column;
    justify-content: space-between;
    align-self: center;
    padding-vertical: 10px;
    `;

export const BoldText = styled.Text`
    font-family: Roboto;
    font-size: 14px;
    font-weight: bold;
    color: #010935;
    `;

export const NormalText = styled.Text`
    opacity: 0.5;
    font-family: Roboto;
    font-size: 12px;
    color: #010935;
    padding-top: 5px;
    `;

export const Line = styled.View`
    height: 1px;
    width: 80%;
    align-self: flex-end;
    border: 1px solid #f3f3f3;
    margin-right: 5px;
    `;
