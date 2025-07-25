package com.procore.task.demo.service;

import com.procore.task.demo.model.Comment;
import java.util.List;
import java.util.Optional;

public interface CommentService {
    List<Comment> findCommentsByTaskId(Long taskId);
    Comment createComment(Long taskId, Comment comment);
    void deleteComment(Long commentId);
}
