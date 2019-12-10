import styled from 'styled-components/native';

export const MainWrapper = styled.TouchableOpacity`
    width: 98%;
    height: auto;
    border: 1px solid #f3f3f3;
    border-radius: 5px;
    background-color: white;
    margin-bottom: 25px;
    padding-horizontal: 15px;
    padding-top: 35px;
    padding-bottom: 35px;
    `;

export const TextBold = styled.Text`
    font-family: Roboto;
    font-size: 16px;
    opacity: 0.5;
    font-weight: normal;
    color: #010935;
    padding-bottom: 5px;
    `;

export const NormalText = styled.Text`
    font-family: Roboto;
    font-size: 12px;
    font-weight: 500;
    color: black;
    `;

export const WrapperColumn = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    padding: 5px;
    margin: 5px;
    `;

export const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: #8a8c9d;
    opacity: 0.5;
    align-self: center !important;
    `;

export const WrapperDataLeft = styled.View`
    height: auto;
    flex: 5.5;
    justify-content: space-around;
    `;

export const WrapperData = styled.View`
    height: auto;
    flex: 4.5;
    `;

export const WrapperDate = styled.View`
    position: absolute;
    top: 0px;
    left: 25px;
    border: solid 1px #0068ff0D;
    background-color: ${props => (props.bgcolor ? props.bgcolor.concat('21') : '#0068ff21')};
    `;

export const TextDate = styled.Text`
    font-family: Roboto;
    font-size: 12px;
    font-weight: normal; 
    color: ${props => (props.color ? props.color : '#0068ff')};
    padding-vertical: 5px;
    padding-horizontal: 15px;
    `;

export const TouchableDetails = styled.TouchableOpacity`
    padding: 15px;
    margin-horizontal: 20px;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: -45px;
    right: 30%;
    `;

export const TextBlue = styled.Text`
    font-family: Roboto;
    font-size: 14px;
    font-weight: 500;
    color: #0068ff;
    `;

export const WrapperButton = styled.View`
    width: 40%;
    position: absolute;
    bottom: -45px;
    right: -18px;
    `;

export const WrapperButtons = styled.View`
    width: 100%;
    flex-direction: row;
    margin: 3px;
    justify-content: flex-end;
    `;
