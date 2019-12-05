/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';
import { colors } from '../../../themes/theme.style';

export const MainWrapper = styled.ScrollView`
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: ${colors.MainWrapperColor};
`;

export const BlueText = styled.Text`
    font-family: Roboto;
    font-size: 14px;
    font-weight: 500;
    align-self: center;
    color: #0068ff;
`;
