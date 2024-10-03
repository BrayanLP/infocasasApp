import React from 'react';
import {StyleSheet} from 'react-native';
import Dropdown from 'react-native-input-select'; // Asegúrate de haber instalado esta librería
import {DropdownProps} from 'react-native-input-select/lib/typescript/src/types/index.types';

interface CustomDropdownProps extends DropdownProps {
  options: {label: string; value: string}[]; // Lista de opciones
  onValueChange: (value: string) => void; // Función para manejar el cambio de valor
  placeholder?: string; // Texto de placeholder (opcional)
  selectedValue: string; // Valor seleccionado actualmente
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  onValueChange,
  placeholder,
  selectedValue,
  label = '',
  dropdownStyle,
}) => {
  return (
    <Dropdown
      label={label}
      dropdownStyle={styles.picker}
      options={options}
      onValueChange={onValueChange}
      placeholder={placeholder}
      selectedValue={selectedValue}
    />
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 30,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
});

export default CustomDropdown;
