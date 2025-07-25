// src/services/apiService.js

const BASE_URL = 'http://localhost:8080/api';

const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'An error occurred with the request.');
  }
  if (response.status === 204) {
    return { success: true };
  }
  return response.json();
};

class APIService {
  static async getAllTasks() {
    const tasks = await handleResponse(await fetch(`${BASE_URL}/tasks`));
    return {
      success: true,
      data: tasks,
      total: tasks.length
    };
  }

  static async searchTasks(searchTerm) {
    const tasks = await handleResponse(await fetch(`${BASE_URL}/tasks/search?query=${searchTerm}`));
    return {
      success: true,
      data: tasks,
      total: tasks.length
    };
  }

  static async deleteTask(id) {
    await handleResponse(await fetch(`${BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    }));
    return { success: true };
  }

  static async updateTask(id, taskData) {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to update task');
    }
    return { success: true };
  }

  static async getTaskById(id) {
    return handleResponse(await fetch(`${BASE_URL}/tasks/${id}`));
  }

  static async getCommentsForTask(taskId) {
    return handleResponse(await fetch(`${BASE_URL}/tasks/${taskId}/comments`));
  }

  static async addComment(taskId, commentData) {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
    });
    return handleResponse(response);
  }

  // --- NEW METHOD FOR CREATING TASKS ---
  static async createTask(taskData) {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
    return handleResponse(response);
  }
}

export default APIService;