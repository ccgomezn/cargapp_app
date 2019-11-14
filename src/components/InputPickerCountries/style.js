import styled from 'styled-components/native';

export const MainDialog = {
  width: '80%',
  height: '50%',
  justifyContent: 'flex-start',
  backgroundColor: 'white',
};

export const MainWrapper = styled.View`
  width: 100%;
  height: 55px;
  border-radius: 2px;
  border-left-width: 1.2;
  border-left-color: #ecf0f1;
  border-right-color: #ecf0f1;
  border-top-color: #ecf0f1;
  border-bottom-color: #ecf0f1;
  border-width: 1;
  background-color: #ffffff;
  padding: 5px;
  padding-left: 10px;
  justify-content: space-between;
  bottom: 0;
`;

export const Text = styled.Text` 
  opacity: 0.5;
  font-family: Roboto;
  font-size: 11px;
  font-weight: 500;
  font-style: normal;
  letter-spacing: -0.28px;
  color: #010935;
`;

export const disabledInput = {
  backgroundColor: '#ecf0f1',
  borderBottomColor: '#fff',
};

export const lineActive = {
  borderLeftWidth: 1.5,
  borderLeftColor: 'purple',
};

/* -------- list countries ------- */
export const MainCountries = styled.View`
  flex-direction: column;
`;

export const ScrollCountries = styled.ScrollView`
  margin-vertical: 8px;
`;

export const TouchableFlag = styled.TouchableOpacity`
  flex-direction: row;
  background-color: white;
  text-align-vertical: top;
  top: -5;
`;

export const TextCode = styled.Text`
  font-family: Roboto;
  font-size: 13px;
  font-weight: 400;
  font-style: normal;
  letter-spacing: -0.25px;
  color: #010935;
  align-items: center;
  text-align: center;
  margin-top: 2px;
`;

export const IconFlagInit = styled.Image`
  resize-mode: contain;
  width: 28px;
  height: 18px;
  opacity: 0.8;
`;

export const ButtonCountrie = styled.TouchableOpacity`
  border-bottom-color: #ecf0f1;
  border-bottom-color: #ecf0f1;
  border-bottom-width: 1.2;
  height: 35px;
  flex-direction: row;
  margin-bottom: 5px;
  padding: 4px;
`;

export const IconFlag = styled.Image`
  resize-mode: contain;
  width: 32px;
  height: 22px;
  opacity: 0.8;
  margin-horizontal: 10px;
`;

export const TextFlag = styled.Text`
  font-family: Roboto;
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  letter-spacing: -0.15px;
  color: #010935;
  top: 2px;
`;
