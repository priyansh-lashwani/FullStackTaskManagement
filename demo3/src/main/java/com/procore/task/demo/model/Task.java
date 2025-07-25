package com.procore.task.demo.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.procore.task.demo.config.LenientOffsetDateTimeDeserializer;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Entity
@Table(name = "task")
@SQLDelete(sql = "UPDATE task SET deleted_at = NOW() WHERE id=?")
@Where(clause = "deleted_at IS NULL")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "number", nullable = false)
    private String number;

    @Column(name = "title", nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private TaskStatus status;

    // --- MODIFIED THIS SECTION ---
    @Enumerated(EnumType.STRING) // Store the enum's name as a string
    @Column(name = "assignee")
    private TaskAssignee assignee; // Changed type from String to TaskAssignee
    // ---------------------------

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "deleted_at")
    private OffsetDateTime deletedAt;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "description_rich_text", columnDefinition = "TEXT")
    private String descriptionRichText;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private OffsetDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "priority", nullable = false)
    private TaskPriority priority;

    // --- ADDED NEW ENUM FOR ASSIGNEES ---
    public enum TaskAssignee {
        RAJESH,
        BOB,
        ALICE,
        CHARLIE,
        DAVID,
        EVE
    }
    // ----------------------------------

    public enum TaskStatus {
        INITIATED,
        IN_PROGRESS,
        COMPLETED,
        ARCHIVED
    }

    public enum TaskPriority {
        HIGH,
        MEDIUM,
        LOW
    }

    @OneToMany(
            mappedBy = "task",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY
    )
    private List<Comment> comments = new ArrayList<>();

    // Helper methods...
    public void addComment(Comment comment) {
        comments.add(comment);
        comment.setTask(this);
    }

    public void removeComment(Comment comment) {
        comments.remove(comment);
        comment.setTask(null);
    }

    // --- MODIFIED GETTER AND SETTER ---
    public TaskAssignee getAssignee() {
        return assignee;
    }

    public void setAssignee(TaskAssignee assignee) {
        this.assignee = assignee;
    }
    // --------------------------------

    // --- Other Getters and Setters ---
    public Long getId() {
        return id;
    }

    public String getNumber() {
        return number;
    }

    public String getTitle() {
        return title;
    }

    public TaskStatus getStatus() {
        return status;
    }

    public OffsetDateTime getCreatedAt() {
        return createdAt;
    }

    public String getDescription() {
        return description;
    }

    public OffsetDateTime getDeletedAt() {
        return deletedAt;
    }

    public String getDescriptionRichText() {
        return descriptionRichText;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public OffsetDateTime getUpdatedAt() {
        return updatedAt;
    }

    public TaskPriority getPriority() {
        return priority;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setStatus(TaskStatus status) {
        this.status = status;
    }

    public void setCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setDeletedAt(OffsetDateTime deletedAt) {
        this.deletedAt = deletedAt;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDescriptionRichText(String descriptionRichText) {
        this.descriptionRichText = descriptionRichText;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public void setUpdatedAt(OffsetDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public void setPriority(TaskPriority priority) {
        this.priority = priority;
    }
}