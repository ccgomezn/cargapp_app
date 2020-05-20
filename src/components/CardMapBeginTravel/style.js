import styled from 'styled-components/native';

export const MainWrapper = styled.View`
  /* position: absolute;
  bottom: 0; */
  justify-content: flex-end;
  width: 100%;
  height: auto;
  padding-bottom: 30px;
  padding-horizontal: 15px;
  background-color: white;
`;

export const WrapperHeader = styled.View`
    width: 100%;
    height: auto;
    flex-direction: row;
    padding-vertical: 10px;
    align-items: center;
`;

export const WrapperBody = styled.View`
  width: 100%;
  height: auto;
  padding-top: 5px;
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
  padding: 10px 10px 10px 8px;
`;

export const Icon = styled.Image`
  height: 30px;
  width: 30px;
`;

export const WrapperInfo = styled.View`
    flex: 5;
    align-items: flex-start;
    height: auto;
    justify-content: space-between;
    padding-right: 4%;
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
    flex: 3;
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
    padding-top: 0px;
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
