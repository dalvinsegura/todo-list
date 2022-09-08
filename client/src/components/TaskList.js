import { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TaskList() {
  const navitagate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const res = await fetch("http://localhost:4000/task");
    const data = await res.json();
    setTasks(data);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:4000/task/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((tasks) => tasks.id !== id));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <h1>Task List</h1>

      {tasks.map((tasks) => (
        <Card
          style={{
            marginBottom: ".7rem",
            backgroundColor: "#1e272e",
          }}
          key={tasks.id}
        >
          <CardContent
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{ color: "white" }}>
              <Typography>{tasks.title}</Typography>
              <Typography>{tasks.description}</Typography>
            </div>

            <div>
              <Button
                variant="contained"
                color="inherit"
                onClick={() => navitagate(`/task/${tasks.id}/edit`)}
              >
                Edit
              </Button>

              <Button
                variant="contained"
                color="warning"
                onClick={() => handleDelete(tasks.id)}
                style={{ marginLeft: ".5rem" }}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
