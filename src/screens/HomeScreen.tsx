import React, {useState} from 'react';
import {View, Text, Button, FlatList, StyleSheet, Image} from 'react-native';
import {useTasks} from '../hooks/useTasks';
import TaskFormModal from './TaskFormModal';
import Input from '../components/Input';
import ItemTask from '../components/ItemTask';
import HeaderTitle from '../components/Header';
import CustomDropdown from '../components/CustomDropdown';

interface Task {
  id: string;
  title: string;
  status: string;
}

const HomeScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState('');
  const {tasks, addTask, deleteTask, updateTask} = useTasks();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const sortedTasks = tasks.sort((a: Task, b: Task) =>
    b.id.localeCompare(a.id),
  );

  const filteredTasks = sortedTasks.filter((task: Task) => {
    const matchesStatus = filter === '' || task.status === filter;
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const handleSubmit = (title: string, status: string) => {
    if (selectedTask) {
      updateTask(selectedTask.id, title, status);
    } else {
      addTask(title, status);
    }
    setModalVisible(false);
    setSelectedTask(null);
  };

  const handleToggleTask = (task: Task) => {
    let updatedStatus: string = '';
    if (task.status === 'completed') {
      updatedStatus = 'pending';
    } else {
      updatedStatus = 'completed';
    }
    updateTask(task.id, task.title, updatedStatus);
  };

  return (
    <View style={styles.container}>
      <HeaderTitle></HeaderTitle>

      <View style={styles.searchFilterContainer}>
        <Input
          style={styles.input}
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <View style={styles.containerDropdown}>
          <CustomDropdown
            options={[
              {label: 'All', value: ''},
              {label: 'Completed', value: 'completed'},
              {label: 'Pending', value: 'pending'},
            ]}
            onValueChange={(value: any) => setFilter(value)}
            placeholder=" "
            selectedValue={filter}
          />
        </View>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item: Task) => item.id}
        renderItem={({item}: any) => (
          <ItemTask
            item={item}
            handleToggleTask={handleToggleTask}
            handleEditTask={handleEditTask}
            deleteTask={deleteTask}></ItemTask>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No tasks available</Text>
        }
      />
      <Button
        color={'#fc7b27'}
        title="+ Add Task"
        onPress={() => setModalVisible(true)}
      />
      <TaskFormModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedTask(null);
        }}
        onSubmit={handleSubmit}
        initialTitle={selectedTask?.title}
        initialStatus={
          selectedTask?.status === 'completed' ? 'completed' : 'pending'
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
    paddingTop: 80,
  },

  searchFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
    gap: 10,
  },

  taskTitle: {
    flex: 1,
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#aaa',
  },
  input: {
    width: '55%',
    color: '#000',
  },
  containerDropdown: {
    width: '40%',
  },
});

export default HomeScreen;
