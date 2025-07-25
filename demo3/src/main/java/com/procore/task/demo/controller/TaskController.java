package com.procore.task.demo.controller;

import com.procore.task.demo.model.Task;
import com.procore.task.demo.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*; // Import everything from web.bind.annotation

import java.util.List;

@RestController
@RequestMapping("/api") // It's good practice to have a base path for your API
public class TaskController {

    private final TaskService taskService;

    // Spring will inject the TaskService bean here
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> findAll() {
        // Call the method on the INSTANCE `taskService`, not the interface `TaskService`
        List<Task> tasks = taskService.findAll();
        return ResponseEntity.ok(tasks);
    }

    @PostMapping("/tasks")
    public ResponseEntity<Task> createJob(@RequestBody Task task) {
        // Call the method on the INSTANCE `taskService`
        Task createdTask = taskService.createTask(task);

        // Return the newly created task with a 201 CREATED status
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }

    @PutMapping("/tasks/{id}")
    public ResponseEntity<String> updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        boolean isUpdated = taskService.updateTask(id, updatedTask);
        if (isUpdated) {
            return new ResponseEntity<>("Task updated successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Task not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/tasks/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        boolean isDeleted = taskService.deleteTask(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build(); // HTTP 204 No Content
        } else {
            return ResponseEntity.notFound().build(); // HTTP 404 Not Found
        }
    }

}
