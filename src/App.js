import "./App.css";
import { useState } from "react";
import Task from "./Components/Task";
import TasksDeleted from "./Components/TasksDeleted";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

library.add(faTrashAlt);

function App() {
  const [tasks, setTasks] = useState([]);
  const [tasksDelete, setTasksDelete] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [tasksSearch, setTasksSearch] = useState([]);

  const handleInputValueChange = (even) => {
    const valuee = even.target.value;
    setInputValue(valuee);
    handleSearchClick();
  };
  const handleAddClick = () => {
    const newTab = [...tasks];
    newTab.push([inputValue]);
    setTasks(newTab);
    setInputValue("");
    axios
      .post("http://localhost:3000/add", { name: inputValue })
      .then((reponse) => {
        console.log(reponse);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearchClick = () => {
    let newTab = [...tasksSearch];
    newTab = [];
    setTasksSearch(newTab);
    tasks.map((ele, index) => {
      if (ele[0].indexOf(inputValue.toLowerCase()) !== -1) {
        newTab.push(ele);
        return setTasksSearch(newTab);
      }
      return "";
    });
    return setTasksSearch(newTab);
  };

  // const regex = new RegExp(inputValue, "i");
  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <hr></hr>
      <div className="task">
        <div>
          {tasks.map((task, index) => {
            return (
              <Task
                task={task}
                valeur={task}
                key={index}
                index={index}
                tasks={tasks}
                inputValue={inputValue}
                setTasks={setTasks}
                tasksDelete={tasksDelete}
                setTasksDelete={setTasksDelete}
                tasksSearch={tasksSearch}
                setTasksSearch={setTasksSearch}
              />
            );
          })}
        </div>
        <div>
          {tasksDelete.map((taskD, indox) => {
            return (
              <TasksDeleted
                key={indox}
                valeur={taskD}
                tasksDelete={tasksDelete}
                setTasksDelete={setTasksDelete}
              ></TasksDeleted>
            );
          })}
        </div>
      </div>

      <main>
        <div>
          <input
            type="text"
            placeholder="new task"
            onChange={handleInputValueChange}
            value={inputValue}
          />
          <button onClick={handleAddClick}>Add task</button>
          <button onClick={handleSearchClick}>Search task</button>
        </div>
      </main>
      <section>
        {tasksSearch.map((task, index) => {
          return (
            <Task
              key={index}
              valeur={task}
              index={index}
              task={task}
              tasks={tasks}
              inputValue={inputValue}
              setTasks={setTasks}
              tasksDelete={tasksDelete}
              setTasksDelete={setTasksDelete}
              tasksSearch={tasksSearch}
              setTasksSearch={setTasksSearch}
            ></Task>
          );
        })}
      </section>
      <footer>
        <p>
          Made whith <em>React</em> at <em>Le Reacteur</em> by <em>Me</em>
        </p>
      </footer>
    </div>
  );
}

export default App;
