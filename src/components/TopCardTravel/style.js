import styled from 'styled-components/native';

export const MainWrapper = styled.View`
    width: 100%;
  height: auto;
  border-radius: 8px;
  background-color: white;
  border: 1px solid #f3f3f3;
  padding-horizontal: 10px;
    `;

export const WrapperColumn = styled.View`
    flex: 0.8;
    flex-direction: row;
    height: auto;
    justify-content: center;
    align-items: center;
    padding-vertical: 10px;
    `;

export const WrapperImage = styled.View`
    flex: 2;
    justify-content: center;
    align-items: center;
    `;

export const Image = styled.Image`
    height: 30px;
    width: 30px;
    resize-mode: contain;
    background-color: #f3f3f3;
    `;

export const WrapperInfo = styled.View`
    flex: 5;
    justify-content: space-between;
    align-items: flex-start;
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
  font-weight: bold;
  color: #010935;
    `;

export const TouchableContact = styled.TouchableOpacity`
    flex: 3;
    align-items: center;
    justify-content: center;
    `;

export const BlueText = styled.Text`
    font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  color: #0068ff;
    `;

export const Line = styled.View`
    width: 100%;
    height: 1px;
    border: 1px solid #f3f3f3;
    `;

export const WrapperSection = styled.View`
    flex: 1;
    `;

export const LineVerical = styled.View`
    height: 90%;
    width: 1px;
    border: 1px solid #f3f3f3;
    `;

export const Icon = styled.Image`
    height: 20px;
    width; 20px;
    `;
