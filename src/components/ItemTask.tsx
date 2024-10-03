import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';

interface TaskItemProps {
  item: {
    id: string;
    title: string;
    status: 'completed' | 'pending';
  };
  handleToggleTask: (task: any) => void;
  handleEditTask: (task: any) => void;
  deleteTask: (id: string) => void;
}

const ItemTask: React.FC<TaskItemProps> = ({
  item,
  handleToggleTask,
  handleEditTask,
  deleteTask,
}) => {
  return (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => handleToggleTask(item)}>
        <Text style={styles.checkbox}>
          {item.status === 'completed' ? (
            <Image
              source={{
                uri: 'https://img.icons8.com/ios/50/checked-checkbox--v1.png',
              }}
              style={{width: 30, height: 30}}
            />
          ) : (
            <Image
              source={{
                uri: 'https://img.icons8.com/ios/50/unchecked-checkbox.png',
              }}
              style={{width: 30, height: 30}}
            />
          )}
        </Text>
      </TouchableOpacity>

      <Text style={styles.taskTitle} onPress={() => handleEditTask(item)}>
        {item.title}
      </Text>

      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Image
          source={{
            uri: 'https://img.icons8.com/ios-glyphs/90/filled-trash.png',
          }}
          style={{width: 20, height: 20}}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  checkbox: {
    marginRight: 10,
    fontSize: 24,
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
  },
});

export default ItemTask;
