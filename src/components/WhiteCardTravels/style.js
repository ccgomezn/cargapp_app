import styled from 'styled-components/native';

export const MainWrapper = styled.View`
    width: 100%;
    height: auto;
    border: 1px solid #f3f3f3;
    border-radius: 5px;
    background-color: white;
    `;

export const TextBold = styled.Text`
    font-family: Roboto;
    font-size: 14px;
    font-weight: bold;
    color: #010935;
    padding-bottom: 5px;
    `;

export const NormalText = styled.Text`
    opacity: 0.5;
    font-family: Roboto;
    font-size: 12px;
    font-weight: normal;
    color: #010935;
    `;

export const WrapperColumn = styled.View`
    width: 100%;
    flex-direction: row;
    border-bottom-color: #f3f3f3;
    border-bottom-width: 0.5px;
    justify-content: flex-end;
    padding: 5px;
    margin: 5px;
    margin-right: 18px;
    `;

export const WrapperDataLeft = styled.View`
    flex: 4;
    height: auto;
    justify-content: space-around;
    `;

export const WrapperData = styled.View`
    flex: 6;
    height: auto;
    `;

export const WrapperDate = styled.View`
    position: absolute;
    top: 5px;
    right: 15px;
    border-radius: 3px;
    border: solid 1px rgba(0, 104, 255, 0.05);
    background-color: rgba(0, 104, 255, 0.13);
    `;

export const TextDate = styled.Text`
    font-family: Roboto;
    font-size: 12px;
    font-weight: normal; 
    color: #0068ff;
    padding-vertical: 5px;
    padding-horizontal: 15px;
    `;

export const TouchableDetails = styled.TouchableOpacity`
    padding: 20px;
    margin-horizontal: 20px;
    align-items: center;
    justify-content: center;
    `;

export const TextBlue = styled.Text`
    font-family: Roboto;
    font-size: 14px;
    font-weight: 500;
    color: #0068ff;
    `;

export const WrapperButton = styled.View`
    width: 40%;
    padding-right: 15px;
    `;

export const WrapperButtons = styled.View`
    width: 100%;
    flex-direction: row;
    margin: 3px;
    justify-content: flex-end;
    `;
