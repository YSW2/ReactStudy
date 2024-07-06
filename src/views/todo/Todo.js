import "./Todo.css";
import React, { useEffect, useState } from "react";
import { Checkbox, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import Calendar from "../../utils/Calendar";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { format } from "date-fns";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [editId, setEditId] = useState("");
  const [editInput, setEditInput] = useState("");
  const [editDate, setEditDate] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  const getCurrentTodoId = () => {
    return (Number(todos.at(-1)?.id) + 1) | 0;
  };

  const addTodo = () => {
    if (input.trim() !== "") {
      const todoId = getCurrentTodoId();
      const newTodos = [
        ...todos,
        {
          id: String(todoId),
          date: selectedDate,
          text: input,
          completed: false,
        },
      ];
      localStorage.setItem("todos", JSON.stringify(newTodos));
      setTodos(newTodos);
      setInput("");
    }
  };

  const removeTodo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const handleCompleted = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) todo.completed = !todo.completed;
      return todo;
    });
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const handleEdit = (id, date, input) => {
    setEditId(id);
    setEditDate(date);
    setEditInput(input);
  };

  const editTodo = () => {
    if (editInput.trim() !== "") {
      const newTodos = todos.map((todo) =>
        todo.id === editId ? { ...todo, date: editDate, text: editInput } : todo
      );
      localStorage.setItem("todos", JSON.stringify(newTodos));
      setTodos(newTodos);
      setEditId("");
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const newTodos = Array.from(todos);
    const [removed] = newTodos.splice(result.source.index, 1);
    newTodos.splice(result.destination.index, 0, removed);

    setTodos(newTodos);
  };

  if (!enabled) {
    return null;
  }

  return (
    <div className="todo-app">
      <div className="todo-input-bar">
        <div className="todo-input-calendar">
          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <input
          className="todo-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          placeholder="할 일을 입력하세요"
        />
        <IconButton
          size="large"
          color="white"
          aria-label="add"
          onClick={addTodo}
        >
          <AddIcon />
        </IconButton>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="todo-list-table"
            >
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`todo-list-row ${
                        todo.completed ? "todo-list-completed" : ""
                      }`}
                    >
                      <div className="complete-column">
                        <Checkbox
                          checked={todo.completed}
                          onChange={() => handleCompleted(todo.id)}
                          color="success"
                        />
                      </div>
                      {editId === todo.id ? (
                        <>
                          <div className="date-column">
                            <Calendar
                              selectedDate={editDate}
                              setSelectedDate={setEditDate}
                            />
                          </div>
                          <div className="work-column">
                            <input
                              className="todo-input-edit"
                              value={editInput}
                              onChange={(e) => setEditInput(e.target.value)}
                              placeholder="할 일을 입력하세요"
                            />
                          </div>
                          <IconButton
                            size="large"
                            color="black"
                            onClick={editTodo}
                          >
                            <CheckIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <div className="date-column">
                            {format(todo.date, "yyyy-MM-dd")}
                          </div>
                          <div className="work-column">{todo.text}</div>
                          <IconButton
                            size="large"
                            color="black"
                            aria-label="edit"
                            onClick={() =>
                              handleEdit(todo.id, todo.date, todo.text)
                            }
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="large"
                            color="black"
                            aria-label="delete"
                            onClick={() => removeTodo(todo.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
export default Todo;
