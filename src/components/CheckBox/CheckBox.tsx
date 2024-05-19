import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { CheckedBox, NoneCheckedBox } from '../../asset';

const CheckBoxButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const CheckBoxImg = styled.img`
  width: 2.4rem;
  height: 2.4rem;
`;

interface CheckBoxProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isChecked: boolean;
  onClick: (e: React.MouseEvent) => void;
}

function CheckBox({ isChecked, onClick, ...rest }: CheckBoxProps) {
  return (
    <CheckBoxButton onClick={onClick} {...rest}>
      <CheckBoxImg
        src={isChecked ? CheckedBox : NoneCheckedBox}
        alt="CheckBox"
      />
    </CheckBoxButton>
  );
}

export default CheckBox;
