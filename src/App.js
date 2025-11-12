import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const generateId = () =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("react-todolist-tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [showModal, setShowModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("react-todolist-theme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    localStorage.setItem("react-todolist-tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("react-todolist-theme", JSON.stringify(darkMode));
  }, [darkMode]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: generateId() }]);
  };

  const editTask = (updatedTask) => {
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
    setShowModal(false);
    setTaskToEdit(null);
  };

  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  const toggleTheme = () => setDarkMode(!darkMode);

  const themeClass = darkMode ? "dark-mode" : "light-mode";

  const toDoTasks = tasks.filter((t) => t.status === "To Do");
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress");
  const doneTasks = tasks.filter((t) => t.status === "Done");

  return (
    <div className={`app-container ${themeClass}`}>
      <Container fluid>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold">Task List</h2>
          <div>
            <Button
              variant={darkMode ? "secondary" : "dark"}
              onClick={toggleTheme}
              className="me-2"
            >
              {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
            </Button>
            <Button
              variant={darkMode ? "outline-light" : "primary"}
              onClick={() => {
                setTaskToEdit(null);
                setShowModal(true);
              }}
            >
              ➕ Tambah Tugas
            </Button>
          </div>
        </div>

        <Row>
          <Col md={4}>
            <Card className="task-column">
              <Card.Header className="fw-bold">To Do</Card.Header>
              <Card.Body>
                <TaskList
                  tasks={toDoTasks}
                  onEditTask={setTaskToEdit}
                  onDeleteTask={deleteTask}
                  darkMode={darkMode}
                  openModal={() => setShowModal(true)}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="task-column">
              <Card.Header className="fw-bold">In Progress</Card.Header>
              <Card.Body>
                <TaskList
                  tasks={inProgressTasks}
                  onEditTask={setTaskToEdit}
                  onDeleteTask={deleteTask}
                  darkMode={darkMode}
                  openModal={() => setShowModal(true)}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="task-column">
              <Card.Header className="fw-bold">Done</Card.Header>
              <Card.Body>
                <TaskList
                  tasks={doneTasks}
                  onEditTask={setTaskToEdit}
                  onDeleteTask={deleteTask}
                  darkMode={darkMode}
                  openModal={() => setShowModal(true)}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <TaskForm
        show={showModal}
        onClose={() => setShowModal(false)}
        onAddTask={addTask}
        onEditTask={editTask}
        taskToEdit={taskToEdit}
        darkMode={darkMode}
      />
    </div>
    
  );
  
}

export default App;
