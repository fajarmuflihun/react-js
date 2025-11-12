import React from "react";
import { Card, Button } from "react-bootstrap";
import { Edit3, Trash2 } from "lucide-react";

function TaskList({ tasks, onEditTask, onDeleteTask, darkMode, openModal }) {
  return (
    <>
      {tasks.length === 0 ? (
        <p
          className="fst-italic"
          style={{
            color: darkMode ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
            fontSize: "0.9rem",
            marginTop: "0.5rem",
          }}
        >
          Belum ada tugas di kategori ini.
        </p>
      ) : (
        tasks.map((task) => (
          <Card
            key={task.id}
            className={`mb-2 ${darkMode ? "bg-secondary text-light" : "bg-white text-dark"}`}
            style={{
              border: darkMode ? "1px solid #444" : "1px solid #ddd",
              borderRadius: "8px",
              padding: "6px 10px", // 👉 lebih ramping
              fontSize: "0.9rem",
            }}
          >
            <Card.Body className="p-2"> {/* kurangi padding bawaan Card */}
              <Card.Title className="mb-1" style={{ fontSize: "1rem" }}>
                {task.title}
              </Card.Title>

              {task.description && (
                <Card.Text className="mb-2" style={{ fontSize: "0.85rem" }}>
                  {task.description}
                </Card.Text>
              )}

              {task.difficulty && (
                <div className="d-flex align-items-center mb-1">
                  <span
                    className="difficulty-badge"
                    style={{
                      backgroundColor:
                        task.difficulty === "Mudah"
                          ? "#4caf50"
                          : task.difficulty === "Sedang"
                          ? "#ffb300"
                          : "#f44336",
                    }}
                  ></span>
                  <span className="ms-2" style={{ fontSize: "0.85rem" }}>
                    <strong>{task.difficulty}</strong>
                  </span>
                </div>
              )}

              {/* Tombol aksi */}
              <div className="d-flex justify-content-end mt-1">
                <Button
                  variant="link"
                  size="sm"
                  className="me-1 p-1"
                  style={{
                    color: darkMode ? "#b0d4ff" : "#2c3e50",
                    textDecoration: "none",
                  }}
                  title="Edit Tugas"
                  onClick={() => {
                    onEditTask(task);
                    openModal();
                  }}
                >
                  <Edit3 size={18} strokeWidth={2} />
                </Button>

                <Button
                  variant="link"
                  size="sm"
                  className="p-1"
                  style={{
                    color: "#ff4d4d",
                    textDecoration: "none",
                  }}
                  title="Hapus Tugas"
                  onClick={() => onDeleteTask(task.id)}
                >
                  <Trash2 size={18} strokeWidth={2} />
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </>
  );
}

export default TaskList;
