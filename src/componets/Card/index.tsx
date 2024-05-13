import "./index.css";
import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
interface Todo {
  id: number;
  name: string;
  completed: boolean;
  createdAt: string;
}
const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [filterType, setFilterType] = useState<string>("all");
  const addTodo = (): void => {
    if (newTodo.trim() !== "") {
      const newTodoItem: Todo = {
        id: todos.length + 1,
        name: newTodo,
        completed: false,
        createdAt: new Date().toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          month: "numeric",
          day: "numeric",
          year: "numeric",
        }),
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo("");
    }
  };

  const checkTodo = (id: number): void => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number): void => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const editTodo = (todo: Todo): void => {
    const editedName = prompt("Edit todo name:", todo.name);
    if (editedName !== null) {
      const updatedTodos = todos.map((t) =>
        t.id === todo.id ? { ...t, name: editedName } : t
      );
      setTodos(updatedTodos);
    }
  };

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setFilterType(event.target.value);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterType === "checked") {
      return todo.completed;
    } else if (filterType === "unchecked") {
      return !todo.completed;
    }
    return true;
  });

  return (
    <div>
      <div className="containerr">
        <h1 className="text-5xl font-bold uppercase text-center pt-10 mb-10">
          Todo List
        </h1>
        <div className="Todo">
          <div>
            <div className="headerr flex">
              <button
                className="btn btn-primary text-white "
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
              >
                Add Task
              </button>
              <dialog id="my_modal_2" className="modal">
                <div className="modal-box ">
                  <h1 className="mb-5 text-3xl">You can add todo</h1>
                  <div className="forms flex justify-between">
                    <input
                      type="text"
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                      placeholder="Enter a new todo"
                      className="input input-bordered w-full max-w-xs"
                    />

                    <button className="btn btn-primary" onClick={addTodo}>
                      Add Todo
                    </button>
                  </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
              <select
                className="select ml-[459px] text-lg  bg-[#ECEDF6] border-none w-[120px] h-[10px]"
                value={filterType}
                onChange={handleFilterChange}
              >
                <option value="all">All</option>
                <option value="checked">Checked</option>
                <option value="unchecked">Unchecked</option>
              </select>
            </div>

            <div className="ml-[110px] pl-5 pr-5 pt-5 mt-2 pb-1  bg-[#ECEDF6] rounded-xl mr-[90px]">
              <ul>
                {filteredTodos.map((todo) => (
                  <li
                    className="bg-white mb-4 items-center pl-4 pr-4 pb-2 rounded-lg"
                    key={todo.id}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          className="w-[25px] h-[25px] mt-4"
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => checkTodo(todo.id)}
                        />
                        <p
                          className="inline-block text-xl "
                          style={{
                            textDecoration: todo.completed
                              ? "line-through"
                              : "none",
                          }}
                        >
                          {todo.name}
                        </p>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <button
                          className="btn"
                          onClick={() => deleteTodo(todo.id)}
                        >
                          <FaTrash fontSize={"20px"}></FaTrash>
                        </button>
                        <button className="btn" onClick={() => editTodo(todo)}>
                          <MdEdit fontSize={"20px"}></MdEdit>
                        </button>
                      </div>
                    </div>
                    <p
                      style={{
                        marginTop: "-20px",
                        marginLeft: "36px",
                        fontSize: "12px",
                      }}
                    >
                      {todo.createdAt}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
