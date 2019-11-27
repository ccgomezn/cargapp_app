import styled from 'styled-components/native';

export const WrapperFooter = styled.View`
   width: 100%;
   background-color: white;
   padding: 20px;
   justify-content: flex-start;
   align-items: center;
`;

export const WrapperInput = styled.View`
    border-radius: 10px;
    width: 100%;
    height: 63px;
    justify-content: center;
    align-items: center;
    background-color: rgb(244, 246, 252);
    flex-direction: row;
`;

export const Input = styled.TextInput`
   width: 70%;
   height: 80%;
`;

export const WrapperTouch = styled.TouchableOpacity`
    width: 10%;
    height: 90%;
    background-color: gray;
`;

export const MainWrapper = styled.View`
    width: 100%;
    height: 100%;
`;

export const WrapperInfoUser = styled.View`
    top: 0;
    height: 13%;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const WrapperIcon = styled.View`
    flex: 2;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export const Icon = styled.Image`
    width: 80%;
    height: 60%;
    resize-mode: contain;
    background-color: #f3f3f3;
`;

export const WrapperInfo = styled.View`
    flex: 5;
    height: 100%;
    justify-content: space-around;
    align-items: flex-start;
    padding-vertical: 20px;
`;

export const BoldText = styled.Text`
    font-weight: bold;
    font-size: 16px;
    color: black;
`;

export const NormalText = styled.Text`
    opacity: 0.7;
    font-weight: bold;
    font-size: 14px;
    color: black;
`;

export const TouchableCall = styled.TouchableOpacity`
    flex: 3;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export const TextTouch = styled.Text`
    font-weight: bold;
    font-size: 16px;
    color: blue;
  
`;

export const TextSend = styled.Text`
    font-size: 16px;
    color: blue;
    padding-bottom: 23%;
    margin-right: 4%;
    margin-left: 2%;
`;
