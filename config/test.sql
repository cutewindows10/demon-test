INSERT INTO Branches (branchName, createdAt, updatedAt) VALUES
('North Branch', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
('South Branch', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
('East Branch', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
('West Branch', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

INSERT INTO Rooms (branchID, status, roomName, createdAt, updatedAt) VALUES
(1, 1, 'Conference Room', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(2, 1, 'Server Room', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(3, 0, 'Storage Room', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(4, 1, 'Main Office', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

INSERT INTO Checklists (checklistType, createdAt, updatedAt) VALUES
('Daily', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
('Weekly', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
('Monthly', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
('Yearly', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

INSERT INTO Tasks (taskTitle, checklistID, createdAt, updatedAt) VALUES
('Check Air Conditioning', 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
('Clean Windows', 2, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
('Update Software', 3, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
('Inspect Security Systems', 4, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

INSERT INTO user (name, CIN, role, email, password, `key`, branchID, username, createdAt, updatedAt) VALUES
('John Doe', 'ABC123', 'Admin', 'john.doe@example.com', 'password123', 'key123', 1, 'johndoe', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
('Jane Smith', 'XYZ789', 'Tech', 'jane.smith@example.com', 'password789', 'key789', 2, 'janesmith', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());

INSERT INTO DoneTasks (taskID, equipmentID, date, photo, okay, problem, solution, userID, roomID, createdAt, updatedAt) VALUES
(1, NULL, CURRENT_TIMESTAMP(), 'photo1.jpg', TRUE, NULL, NULL, 1, 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()),
(2, NULL, CURRENT_TIMESTAMP(), 'photo2.jpg', FALSE, 'Broken window', 'Replace glass', 2, 2, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());
