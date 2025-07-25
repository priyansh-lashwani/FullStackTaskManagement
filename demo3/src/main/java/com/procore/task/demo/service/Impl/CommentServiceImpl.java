package com.procore.task.demo.service.impl;

import com.procore.task.demo.model.Comment;
import com.procore.task.demo.model.Task;
import com.procore.task.demo.repository.CommentRepository;
import com.procore.task.demo.repository.TaskRepository; // Assuming you have a TaskRepository
import com.procore.task.demo.service.CommentService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final TaskRepository taskRepository;

    public CommentServiceImpl(CommentRepository commentRepository, TaskRepository taskRepository) {
        this.commentRepository = commentRepository;
        this.taskRepository = taskRepository;
    }

    @Override
    public List<Comment> findCommentsByTaskId(Long taskId) {
        return commentRepository.findByTaskId(taskId);
    }

    @Override
    @Transactional
    public Comment createComment(Long taskId, Comment comment) {
        // Find the parent task or throw an exception
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));

        // Associate the comment with the task
        task.addComment(comment);

        // Since cascade is enabled, saving the task will also save the new comment.
        taskRepository.save(task);

        // Return the last added comment
        return comment;
    }

    @Override
    public void deleteComment(Long commentId) {
        if (!commentRepository.existsById(commentId)) {
            throw new RuntimeException("Comment not found with id: " + commentId);
        }
        commentRepository.deleteById(commentId);
    }
}

