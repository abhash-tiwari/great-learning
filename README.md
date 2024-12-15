# great-learning
 
# Collaborative Task Management System

A **Collaborative Task Management System** designed and implemented using the MERN (MongoDB, Express.js, React, Node.js) stack. The application allows multiple users to create, assign, and manage tasks within projects. This system is built with a focus on usability, security, and responsiveness.

---

## Features

### 1. User Registration and Authentication
- Secure user registration with **name**, **email**, and **password**.
- JWT-based authentication and authorization.
- Restricted access to authenticated users only.

### 2. Project Management
- CRUD operations for projects:
  - Create, edit, and delete projects.
- Each project includes the following details:
  - **Title**
  - **Description**
  - **Creation Date**
  - **Project Owner**

### 3. Task Management
- CRUD operations for tasks within a project:
  - Create, edit, delete, and assign tasks to users.
- Task details include:
  - **Title**
  - **Description**
  - **Status** (To-Do, In Progress, Completed)
  - **Deadline**
  - **Assigned User**
- Tasks displayed grouped by status.

### 4. User Dashboard
- Overview of all projects and tasks assigned to the user.
- Task summary (e.g., total tasks, completed tasks).

---

## Technical Details

### Frontend
- Built using **React** with functional components and hooks.
- Navigation handled using **React Router**.
- Form validation implemented for secure user input.
- Responsive design ensuring cross-device usability.

### Backend
- Built using **Node.js** and **Express.js**.
- RESTful API endpoints for:
  - User registration, login, and authentication.
  - CRUD operations for projects and tasks.
- Secure API handling and JWT-based authentication.

### Database
- **MongoDB** for storing:
  - User information.
  - Project and task data, with appropriate relationships.

---

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd collaborative-task-management
   ```

2. **Install dependencies**:
   - Backend:
     ```bash
     cd server
     npm install
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Configure environment variables**:
   - Create a `.env` file in the `server` folder with the following:
     ```env
     MONGO_URI=<your-mongodb-connection-string>
     JWT_SECRET=<your-jwt-secret>
     PORT=5000
     ```

4. **Run the application**:
   - Backend:
     ```bash
     cd server
     npm start
     ```
   - Frontend:
     ```bash
     cd ../frontend
     npm start
     ```

5. **Access the application**:
   - Frontend runs at `http://localhost:3000`
   - Backend runs at `http://localhost:5000`

---

## API Endpoints

### Authentication
- **POST** `/api/auth/register` - Register a new user.
- **POST** `/api/auth/login` - Login user and generate JWT.

### Project Management
- **GET** `/api/projects` - Get all projects.
- **POST** `/api/projects` - Create a new project.
- **PUT** `/api/projects/:id` - Update a project.
- **DELETE** `/api/projects/:id` - Delete a project.

### Task Management
- **GET** `/api/projects/:projectId/tasks` - Get all tasks for a project.
- **POST** `/api/projects/:projectId/tasks` - Create a new task.
- **PUT** `/api/projects/:projectId/tasks/:taskId` - Update a task.
- **DELETE** `/api/projects/:projectId/tasks/:taskId` - Delete a task.

---

## Challenges Faced
- **Secure Authentication**: Implementing robust JWT-based authentication.
- **State Management**: Managing project and task states efficiently across multiple users.
- **Responsive Design**: Ensuring seamless usability across devices.

---

## Learnings
- Deepened understanding of the MERN stack.
- Enhanced ability to handle relationships in NoSQL databases.
- Improved skills in designing secure and scalable RESTful APIs.

---

## Future Enhancements
- Add search functionality for tasks by **title** or **description**.
- Real-time notifications for task updates using WebSockets.
- Implement drag-and-drop functionality for task status changes.
- Add role-based access control for advanced user permissions.

---

## Project Structure
```
collaborative-task-management/
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   └── public/
└── README.md
```

---

## How to Run Tests
- Backend tests:
  ```bash
  cd server
  npm test
  ```
- Frontend tests:
  ```bash
  cd ../frontend
  npm test
  ```

---

## Deployment
- Deployment is not implemented for this project.

---

## License
This project is licensed under the MIT License.
