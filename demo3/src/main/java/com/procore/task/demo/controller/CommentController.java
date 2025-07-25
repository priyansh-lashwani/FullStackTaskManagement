package com.procore.task.demo.controller;

import com.procore.task.demo.model.Comment;
import com.procore.task.demo.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    /**
     * Creates a new comment for a specific task.
     */
    @PostMapping("/tasks/{taskId}/comments")
    public ResponseEntity<Comment> createComment(@PathVariable Long taskId, @RequestBody Comment comment) {
        Comment createdComment = commentService.createComment(taskId, comment);
        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
    }

    /**
     * Gets all comments for a specific task.
     */
    @GetMapping("/tasks/{taskId}/comments")
    public ResponseEntity<List<Comment>> getCommentsByTaskId(@PathVariable Long taskId) {
        List<Comment> comments = commentService.findCommentsByTaskId(taskId);
        return ResponseEntity.ok(comments);
    }

    /**
     * Deletes a comment by its own ID.
     */
    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build(); // 204 No Content is a standard response for successful deletion
    }
}
