import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Platform,
} from "react-native";
import {
  Button,
  Card,
  Modal,
  Portal,
  TextInput,
  SegmentedButtons,
} from "react-native-paper";
import { Task, TaskPriority } from "../types";
import DateTimePicker from "@react-native-community/datetimepicker";

interface TaskFormProps {
  task?: Task | null;
  onSave: (task: Omit<Task, "id" | "userId" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  task,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [priority, setPriority] = useState<TaskPriority>("medium");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDate(new Date(task.dueDate));
      setPriority(task.priority);
    } else {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow);
    }
  }, [task]);

  const handleSave = () => {
    const taskData = {
      title,
      description,
      dueDate: date.toISOString(),
      priority,
      completed: task?.completed || false,
    };
    onSave(taskData);
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  return (
    <Portal>
      <Modal visible={true} onDismiss={onCancel}>
        <Card style={styles.card}>
          <Card.Title title={task ? "Edit Task" : "Create New Task"} />
          <Card.Content>
            <TextInput
              label="Title"
              value={title}
              onChangeText={setTitle}
              style={styles.input}
            />
            <TextInput
              label="Description"
              value={description}
              onChangeText={setDescription}
              multiline
              style={styles.input}
            />
            <Button onPress={() => setShowDatePicker(true)}>
              {date.toDateString()}
            </Button>
            {showDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onDateChange}
              />
            )}
            <View style={styles.priorityContainer}>
              <SegmentedButtons
                value={priority}
                onValueChange={(value) => setPriority(value as TaskPriority)}
                buttons={[
                  { value: "low", label: "Low" },
                  { value: "medium", label: "Medium" },
                  { value: "high", label: "High" },
                ]}
              />
            </View>
          </Card.Content>
          <Card.Actions>
            <Button onPress={onCancel}>Cancel</Button>
            <Button onPress={handleSave}>Save</Button>
          </Card.Actions>
        </Card>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 20,
  },
  input: {
    marginBottom: 10,
  },
  priorityContainer: {
    marginTop: 10,
  },
});
