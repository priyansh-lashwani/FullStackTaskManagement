-- Drop tables if they exist to start with a clean slate
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS task;

-- Create the 'task' table
CREATE TABLE task (
    id BIGSERIAL PRIMARY KEY,
    number  VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    assignee VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    deleted_at TIMESTAMP WITH TIME ZONE,
    description TEXT,
    description_rich_text TEXT,
    due_date DATE,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
    priority VARCHAR(255) NOT NULL
);

-- Create the 'comments' table
CREATE TABLE comments (
    id BIGSERIAL PRIMARY KEY,
    task_item_id BIGINT REFERENCES task(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL,
    user_name VARCHAR(255),
    comment TEXT
);

-- Insert some sample data into the 'task' table
INSERT INTO task (number, title, description, status, assignee, created_at, due_date, updated_at, priority) VALUES
('T-001', 'Deploy to Production', 'Finalize deployment scripts and push the latest build to the live server.', 'IN_PROGRESS', 'RAJESH', NOW(), '2025-07-25', NOW(), 'HIGH'),
('T-002', 'Update UI Mockups', 'Incorporate feedback from the stakeholder meeting into the Figma designs.', 'INITIATED', 'ALICE', NOW(), '2025-08-01', NOW(), 'MEDIUM'),
('T-003', 'Fix Login Bug', 'Users are unable to log in with special characters in their passwords.', 'COMPLETED', 'ALICE', NOW(), '2025-07-22', NOW(), 'HIGH'),
('T-004', 'Plan Q4 Roadmap', 'Outline key initiatives and epics for the fourth quarter.', 'INITIATED', 'ALICE', NOW(), '2025-07-24', NOW(), 'LOW');

