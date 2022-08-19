import { useEffect, useState } from "react";
import Preloader from "./components/Preloader";
import { addTodos, deleteTodo, readTodosFun, updateTodos } from "./functions";

function App() {
  const [todo, setTodo] = useState({ title: "", content: "" });
  const [todos, setTodos] = useState(null);
  const [currentid, setCurrentid] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const todoArr = await readTodosFun();
      setTodos(todoArr);
      console.log("we got todos", todoArr);
    };
    fetchData();
  }, [currentid]);
  useEffect(() => {
    const currentTodo =
      currentid != 0
        ? todos.find((todo) => todo._id === currentid)
        : { title: "", content: "" };
    setTodo(currentTodo);
  }, [currentid]);
  const clear = () => {
    setCurrentid(0);
    setTodo({ title: "", content: "" });
  };
  useEffect(() => {
    const clearField = (e) => {
      if (e.keyCode === 27) {
        clear();
      }
    };
    window.addEventListener("keydown", clearField);
    return () => window.removeEventListener("keydown", clearField);
  }, []);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (currentid === 0) {
      const res = await addTodos(todo);
      setTodos([...todos, res]);
    } else {
      const res = await updateTodos(currentid, todo);
      console.log("rezz", res);
    }
    clear();
  };
  const removeTodo = async (id) => {
    console.log("idzz", id);
    await deleteTodo(id);
    const todoArr = await readTodosFun();
    setTodos(todoArr);
  };
  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <pre>
            {JSON.stringify(todo)} || {JSON.stringify(currentid)}
          </pre>
          <form className="col s12" onSubmit={onSubmitHandler}>
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">account_circle</i>
                <input
                  id="icon_prefix"
                  type="text"
                  className="validate"
                  value={todo.title}
                  onChange={(e) => setTodo({ ...todo, title: e.target.value })}
                />
                <label htmlFor="icon_prefix">Todo Title</label>
              </div>
              <div className="input-field col s6">
                <i className="material-icons prefix">phone</i>
                <input
                  id="description"
                  type="tel"
                  className="validate"
                  value={todo.content}
                  onChange={(e) =>
                    setTodo({ ...todo, content: e.target.value })
                  }
                />
                <label htmlFor="description">Description</label>
              </div>
            </div>
            <div className="row right-align">
              <button className="waves-effect waves-light btn ">submit</button>
            </div>
          </form>

          {!todos ? (
            <Preloader></Preloader>
          ) : todos.length > 0 ? (
            <ul className="collection">
              {todos.map((todo) => (
                <li key={todo._id} href="#!" className="collection-item">
                  <div>
                    <h5 onClick={() => setCurrentid(todo._id)}>{todo.title}</h5>
                    <p>
                      {todo.content}
                      <a
                        onClick={() => removeTodo(todo._id)}
                        href="#!"
                        className="secondary-content"
                      >
                        <i className="material-icons">delete</i>
                      </a>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div>No data found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
