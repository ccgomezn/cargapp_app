import styled from 'styled-components/native';

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
  bottom: 4px;
`;

export const disabledInput = {
  backgroundColor: '#ecf0f1',
  borderBottomColor: '#fff',
};

export const errorInput = {
  borderColor: '#ff647c',
  borderLeftWidth: 1,
  borderLeftColor: '#ff647c',
  borderTopWidth: 1,
  borderTopColor: '#ff647c',
  borderBottomWidth: 1,
  borderBottomColor: '#ff647c',
  borderRightWidth: 1,
  borderRightColor: '#ff647c',
};

export const Text = styled.Text` 
  opacity: 0.5;
  font-family: Roboto;
  font-size: 11px;
  font-weight: 500;
  font-style: normal;
  letter-spacing: -0.28px;
  color: #010935;
`;

export const Input = styled.TextInput`
  width: 100%;
  font-family: Roboto;
  font-size: 14px;
  top: -5;
  color: #010935;
`;

export const lineActive = {
  borderLeftWidth: 1.2,
  borderLeftColor: 'purple',
};
