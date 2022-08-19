import axios from "axios";
const url = "http://localhost:5000/todos";

export const readTodos = () => axios.get(url);

export const addTodos = (newTodo) => axios.post(url, newTodo);

export const updateTodo = (id, updatedTodo) =>
  axios.patch(`${url}/${id}`, updatedTodo);
