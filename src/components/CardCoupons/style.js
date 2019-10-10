import styled from 'styled-components/native';

export const MainWrapper = styled.ImageBackground`
    width: 100%;
    height: 35%;
    border-radius: 20px;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 20px;
    background-color: gray;
    margin-bottom: 20px;
`;

export const SubContainer = styled.View`
    width: 100%;
    height: auto;
    background-color: transparent;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const SubImage = styled.Image`
    height: 60px;
    width: 60px;
    border-radius: 30px;
    background-color: white;
`;

export const WrapperText = styled.View`
    width: 100%;
    height: auto;
    justify-content: space-between;
    align-items: flex-start;
`;

export const Button = styled.TouchableOpacity`
    border-radius: 20px;
    background-color: white;
    align-items: center;
    justify-content: center;
`;

export const BlueText = styled.Text`
  font-size: 18px;
  text-align: center;
  color: #0168ff;
`;

export const WhiteText = styled.Text`
  font-size: 18px;
  text-align: center;
  color: white;
`;

export const WhiteOpacityText = styled.Text`
  font-size: 18px;
  text-align: center;
  color: white;
  opacity: 0.8;
`;
