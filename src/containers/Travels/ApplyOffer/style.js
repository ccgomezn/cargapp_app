import styled from 'styled-components/native';

export const MainWrapper = styled.ScrollView`
  width: 100%;
  height: auto;
`;

export const AddressesWrapper = styled.View`
  width: 100%;
  height: auto;
  padding: 4%;
  position: absolute;
  top: 0;
`;

export const WrapperModal = styled.View`
  width: 80%;
  background-color: white;
  align-self: center;
  border-radius: 30px;
  padding: 3%;
`;

export const WrapperTextModal = styled.View`
  width: 100%;
  height: auto;
  padding: 3%;
`;

export const BlueText = styled.Text`
  color: #0068ff;
  font-size: 18px;
  align-self: center;
  text-align: center;
`;

export const CustomImage = styled.Image`
  width: 50px;
  height: 50px;
  resize-mode: contain;
  z-index: 1000;
`;
