import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const TasksDeleted = (props) => {
  const handleCDeleteClick = () => {
    const newTab = [...props.tasksDelete];

    newTab.map((ele, indax) => {
      if (ele === props.valeur) {
        newTab.splice(indax, 1);
        props.setTasksDelete(newTab);
        axios
          .post("http://localhost:3000/delete", { name: props.valeur })
          .then((reponse) => {
            console.log(reponse);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      return "";
    });
    return "";
  };
  return (
    <div className="done" title="task done 👍">
      <p className="ok">
        <input type="checkbox" defaultChecked></input>
        {props.valeur}
      </p>

      <button onClick={handleCDeleteClick}>
        <FontAwesomeIcon icon="trash-alt" className="icon" />
      </button>
    </div>
  );
};

export default TasksDeleted;
