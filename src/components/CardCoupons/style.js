import styled from 'styled-components/native';

export const MainWrapper = styled.ImageBackground`
    width: 100%;
    height: 250px;
    border-radius: 20px;
    justify-content: flex-end;
    align-items: center;
    padding: 20px;
    background-color: gray;
    margin-bottom: 20px;
`;

export const SubContainer = styled.View`
    width: auto;
    height: auto;
    background-color: transparent;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const SubImage = styled.Image`
    height: 50px;
    width: 50px;
    border-radius: 25px;
    background-color: white;
`;

export const WrapperText = styled.View`
    width: auto;
    height: auto;
    justify-content: space-between;
    align-items: flex-start;
    padding-horizontal: 10px
`;

export const Button = styled.TouchableOpacity`
    border-radius: 20px;
    background-color: white;
    align-items: center;
    justify-content: center;
`;

export const BlueText = styled.Text`
  font-size: 11px;
  text-align: center;
  color: #0168ff;
  font-weight: bold;
  padding-horizontal: 15px;
  padding-vertical: 7px;
`;

export const WhiteText = styled.Text`
  font-size: 12px;
  text-align: center;
  color: white;
  font-weight: bold;
`;

export const WhiteOpacityText = styled.Text`
  font-size: 12px;
  text-align: center;
  color: white;
`;
