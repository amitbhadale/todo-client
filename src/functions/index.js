import * as api from "../api";

export const readTodosFun = async () => {
  try {
    const { data } = await api.readTodos();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const addTodos = async (todo) => {
  try {
    console.log("creatiing todo at clientside");
    const { data } = await api.addTodos(todo);
    console.log("data", data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const updateTodos = async (id, todo) => {
  try {
    console.log("updating todo at clientside");
    const { data } = await api.updateTodo(id, todo);
    console.log("updated", data);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteTodo = async (id) => {
  try {
    console.log("deleting todo");
    await api.deleteTodo(id);
  } catch (e) {
    console.log(e);
  }
};
