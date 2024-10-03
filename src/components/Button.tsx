import React from 'react';
import styled from 'styled-components/native';

interface ButtonProps {
  title: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({title, onPress}) => {
  return (
    <StyledButton onPress={onPress}>
      <ButtonText>{title}</ButtonText>
    </StyledButton>
  );
};

const StyledButton = styled.TouchableOpacity`
  background-color: #0d6efd;
  padding: 12px;
  border-radius: 8px;
  align-items: center;
  shadow-color: #00d4ff;
  shadow-opacity: 0.8;
  shadow-radius: 6px;
  shadow-offset: 0px 0px;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;

export default Button;
