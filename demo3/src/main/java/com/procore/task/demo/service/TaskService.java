package com.procore.task.demo.service;

import com.procore.task.demo.model.Task;
import java.util.List;

public interface TaskService {
    List<Task> findAll();
    Task createTask(Task task);
    boolean updateTask(Long id,Task updatedTask);
    boolean deleteTask(Long id);
}
