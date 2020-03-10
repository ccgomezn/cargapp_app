import styled from 'styled-components';
import MapView from 'react-native-maps';
import { CheckBox } from 'native-base';
import { ActivityIndicator } from 'react-native';

export const MainContainer = styled.ScrollView`
  padding: 20px;
`;

export const RowContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 7px;
`;

export const Title = styled.Text`
  font-size: 16.5px;
  font-weight: 500;
  color: black;
`;

export const TextSecond = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: black;
  width: 100%;
  height: auto;
  padding-bottom: 2px;
  background-color: blue;
`;

export const NormalTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: black;
`;

export const SubTitle = styled.Text`
  font-size: 16px;
  color: gray;
`;

export const Map = styled(MapView)`
  width: 100%;
  height: 200px;
  margin-vertical: 4%;
`;

export const RowContainerAddresses = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-vertical: 2%;
`;

export const Icon = styled.Image`
  width: 50px;
  max-height: 100px;
  resize-mode: contain;
`;

export const ColumnContainer = styled.View`
  justify-content: flex-start;
  padding-vertical: 7px;
  background-color: red;
  flex: 1;
`;

export const Line = styled.View`
  height: 1px;
  background-color: gray;
  opacity: 0.8;
  width: 100%;
  margin-vertical: 2%;
`;

export const WrapperModal = styled.View`
  width: 80%;
  height: auto;
  background-color: white;
  align-self: center;
  border-radius: 10px;
  padding: 3%;
  z-index: 1700;
`;

export const WrapperTextModal = styled.View`
  width: 100%;
  height: auto;
  padding: 3%;
`;

export const Touchable = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-vertical: 2%;
`;


export const BlueText = styled.Text`
  color: #0068ff;
  font-size: 18px;
  align-self: center;
  text-align: center;
`;

export const GrayText = styled.Text`
  color: gray;
  font-size: 14px;
  text-align: center;
`;

export const Check = styled(CheckBox)`
  height: 20px;
  width: 20px;
  margin-right: 20px;
`;

export const WrapperButton = styled.View`
  width: 50%;
  margin-bottom: 40px;
  align-self: flex-end;
`;

export const WrapperButtonImage = styled.View`
  width: 40%;
  position: absolute;
  right: 20px;
  bottom: 20px;
  z-index: 1900;
`;

export const Indicator = styled(ActivityIndicator)`
  align-self: center;
  height: 100%;
  z-index: 90;
  position: absolute;
`;
