import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Checkbox, Chip, IconButton, Text } from "react-native-paper";
import { Task } from "../types";
import { format, isToday, isTomorrow, isPast } from "date-fns";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const getPriorityChipColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#E53E3E";
      case "medium":
        return "#DD6B20";
      case "low":
        return "#3182CE";
      default:
        return "#718096";
    }
  };

  const getDueDateInfo = (dueDate: string) => {
    const date = new Date(dueDate);
    const isOverdue = isPast(date) && !isToday(date);

    if (isToday(date)) {
      return { text: "Due Today", color: "#DD6B20" };
    } else if (isTomorrow(date)) {
      return { text: "Due Tomorrow", color: "#D69E2E" };
    } else if (isOverdue) {
      return { text: "Overdue", color: "#E53E3E" };
    } else {
      return { text: format(date, "MMM dd, yyyy"), color: "#718096" };
    }
  };

  const dueDateInfo = getDueDateInfo(task.dueDate);

  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <Checkbox
          status={task.completed ? "checked" : "unchecked"}
          onPress={() => onToggleComplete(task.id)}
        />
        <View style={styles.content}>
          <Text style={[styles.title, task.completed && styles.titleCompleted]}>
            {task.title}
          </Text>
          <Text style={styles.description}>{task.description}</Text>
          <View style={styles.footer}>
            <Chip
              icon="priority-high"
              style={styles.chip}
              chipColor={getPriorityChipColor(task.priority)}
            >
              {task.priority}
            </Chip>
            <Chip
              icon="calendar-range"
              style={styles.chip}
              chipColor={dueDateInfo.color}
            >
              {dueDateInfo.text}
            </Chip>
          </View>
        </View>
        <View style={styles.actions}>
          <IconButton icon="pencil" onPress={() => onEdit(task)} />
          <IconButton
            icon="trash-can-outline"
            onPress={() => onDelete(task.id)}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 0,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  content: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  titleCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  chip: {
    marginRight: 10,
  },
  actions: {
    flexDirection: "row",
    marginBottom: 20,
  },
});
