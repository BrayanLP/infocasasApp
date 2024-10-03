import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Input from '../components/Input';
import CustomDropdown from '../components/CustomDropdown';

interface TaskFormModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (title: string, status: string) => void;
  initialTitle?: string;
  initialStatus?: string;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({
  visible,
  onClose,
  onSubmit,
  initialTitle = '',
  initialStatus = '',
}) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('');
  const dataStatus = [
    {label: 'Completed', value: 'completed'},
    {label: 'Pending', value: 'pending'},
  ];

  useEffect(() => {
    setTitle(initialTitle);
    setStatus(initialStatus);
    console.log(initialTitle, initialStatus);
  }, [initialTitle, initialStatus, visible]);

  const handleSubmit = () => {
    if (title && status) {
      onSubmit(title, status);
      setTitle('');
      setStatus('');
      onClose();
    } else {
      //   alert('Por favor, completa todos los campos.');
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
        <View style={styles.modalView}>
          <Text style={styles.header}>
            {initialTitle ? 'Update' : 'Create'} Task
          </Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title</Text>
            <Input
              multiline={true}
              numberOfLines={10}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <CustomDropdown
            label="Status"
            placeholder="Selecciona un estado..."
            options={dataStatus}
            selectedValue={status}
            onValueChange={(value: any) => setStatus(value)}
            primaryColor={'green'}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {initialTitle ? 'Update' : 'Create'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.closeButton]}
            onPress={onClose}>
            <Text style={styles.buttonTextClose}>close</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },

  label: {
    fontSize: 13,
    marginBottom: 10,
    color: '#666',
  },

  button: {
    backgroundColor: '#fc7b27',
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 10,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#fff',
    color: '#000',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttonTextClose: {
    color: '#000',
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: 15,
  },
});

export default TaskFormModal;
