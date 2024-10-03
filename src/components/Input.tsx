import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  StyleProp,
  TextStyle,
} from 'react-native';

interface InputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<TextStyle>;
}

const Input: React.FC<InputProps> = ({
  placeholder = '',
  value = '',
  onChangeText,
  style = {},
  multiline = false, // Valor por defecto
  numberOfLines = 1, // Valor por defecto
  ...rest // El operador rest para cualquier otra prop
}) => {
  return (
    <TextInput
      style={[styles.input, style]} // Aplica el estilo recibido
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      multiline={multiline}
      numberOfLines={numberOfLines}
      {...rest} // Cualquier otra prop será pasada a TextInput
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 65,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 0,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    width: '100%',
    color: '#000',
    fontSize: 17,
  },
});

export default Input;
