import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Task {
  id: string;
  title: string;
  status: string; // 'completed' | 'pending'
}

const TASKS_STORAGE_KEY = '@tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    filterTasks();
  }, [tasks, filter]);

  const loadTasks = async () => {
    try {
      const tasksJSON = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
      if (tasksJSON !== null) {
        setTasks(JSON.parse(tasksJSON));
      }
    } catch (e) {
      console.error('Failed to load tasks:', e);
    }
  };

  const saveTasks = async (newTasks: Task[]) => {
    try {
      await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(newTasks));
    } catch (e) {
      console.error('Failed to save tasks:', e);
    }
  };

  const addTask = (title: string, status: string) => {
    const newTask = {id: Date.now().toString(), title, status};
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    saveTasks(newTasks);
  };

  const updateTask = (id: string, title: string, status: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? {...task, title, status} : task,
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const filterTasks = () => {
    if (filter === 'all') {
      setFilteredTasks(tasks);
    } else if (filter === 'completed') {
      setFilteredTasks(tasks.filter(task => task.status === 'completed'));
    } else if (filter === 'pending') {
      setFilteredTasks(tasks.filter(task => task.status === 'pending'));
    }
  };

  return {
    tasks: filteredTasks,
    addTask,
    updateTask,
    deleteTask,
    setFilter,
  };
};
