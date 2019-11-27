import styled from 'styled-components/native';

export const MainWrapper = styled.View`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: auto;
    justify-content: flex-end;
    padding-bottom: 30px;
    padding-horizontal: 15px;
    background-color: white;
    `;

export const WrapperHeader = styled.View`
    width: 100%;
    height: auto;
    flex-direction: row;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    `;

export const WrapperBody = styled.View`
    width: 100%;
    height: auto;
    padding-top: 10px;
    `;

export const WrapperFooter = styled.View`
    width: 100%;
    flex-direction: row;
    height: auto;
    justify-content: flex-end;
    align-self: flex-end;
    `;

export const WrapperIcon = styled.View`
    width: auto;
    justify-content: center;
    align-items: center;
    padding: 10px;
    `;

export const Icon = styled.Image`
    height: 30px;
    width: 30px;
    background-color: #f3f3f3;
    `;

export const WrapperInfo = styled.View`
    width: auto;
    align-items: flex-start;
    height: auto;
    justify-content: space-between;
    padding-right: 8%;
    `;

export const BoldText = styled.Text`
    font-family: Roboto;
    font-size: 14px;
    font-weight: bold;
    color: #010935;
    `;

export const NormalText = styled.Text`
    opacity: 0.7;
    font-family: Roboto;
    font-size: 12px;
    color: #010935;
    `;

export const TouchableQualification = styled.TouchableOpacity`
    width: auto;
    justify-content: center;
    align-items: center;
    height: auto;
    `;

export const BlueText = styled.Text`
    font-family: Roboto;
    font-size: 14px;
    font-weight: bold;
    color: #0068ff;
    `;

export const WrapperColumn = styled.View`
    width: 100%;
    flex-direction: row;
    padding-top: 10px;
    `;

export const WrapperInfoBody = styled.View`
    justify-content: flex-start;
    align-items: flex-start;
    flex: 1;
    padding: 10px;
    `;

export const WrapperButton = styled.View`
    width: auto;
    height: 100%;
    margin-left: 3%;
`;
