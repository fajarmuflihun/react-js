import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function TaskForm({ show, onClose, onAddTask, onEditTask, taskToEdit, darkMode }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Mudah");
  const [status, setStatus] = useState("To Do");

  useEffect(() => {
    if (!taskToEdit && show) {
      setTitle("");
      setDescription("");
      setDifficulty("Mudah");
      setStatus("To Do");
    }
  }, [show, taskToEdit]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: taskToEdit ? taskToEdit.id : Date.now(),
      title,
      description,
      difficulty,
      status,
      completed: taskToEdit ? taskToEdit.completed : false,
    };

    if (taskToEdit) {
      onEditTask(newTask);
    } else {
      onAddTask(newTask);
    }

    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} centered className={darkMode ? "modal-dark" : ""}>
      <Modal.Header closeButton className={darkMode ? "bg-dark text-light" : ""}>
        <Modal.Title>{taskToEdit ? "Edit Tugas" : "Tambah Tugas Baru"}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body className={darkMode ? "bg-dark text-light" : ""}>
          <Form.Group className="mb-3" controlId="formTaskTitle">
            <Form.Label>Judul</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan judul tugas"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={darkMode ? "bg-secondary text-light border-0" : ""}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTaskDescription">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Tuliskan deskripsi tugas"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={darkMode ? "bg-secondary text-light border-0" : ""}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTaskDifficulty">
            <Form.Label>Tingkat Kesulitan</Form.Label>
            <Form.Select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className={darkMode ? "bg-secondary text-light border-0" : ""}
            >
              <option value="Mudah">Mudah</option>
              <option value="Sedang">Sedang</option>
              <option value="Sulit">Sulit</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTaskStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={darkMode ? "bg-secondary text-light border-0" : ""}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer className={darkMode ? "bg-dark border-secondary" : ""}>
          <Button variant={darkMode ? "outline-light" : "secondary"} onClick={onClose}>
            Batal
          </Button>
          <Button variant={darkMode ? "light" : "primary"} type="submit">
            {taskToEdit ? "Simpan Perubahan" : "Tambah Tugas"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default TaskForm;
