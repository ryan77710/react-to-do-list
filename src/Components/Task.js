import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const Task = (props) => {
  const handleCheckClick = () => {
    const newTab = [...props.tasks];
    newTab.map((ele, indix) => {
      if (ele === props.valeur) {
        const newTab2 = [...props.tasksDelete];
        newTab2.push(ele[0]);
        props.setTasksDelete(newTab2);
        newTab.splice(indix, 1);
        props.setTasks(newTab);

        const newTab3 = [...props.tasksSearch];
        newTab3.map((ele, indax) => {
          if (ele === props.valeur) {
            newTab3.splice(indax, 1);
          }
          return props.setTasksSearch(newTab3);
        });
      }

      return "";
    });
  };
  const handleDeleteClick = () => {
    const newTab = [...props.tasks];
    const newTab1 = [...props.tasksSearch];

    newTab.map((ele, indax) => {
      if (ele === props.valeur) {
        newTab.splice(indax, 1);
        axios
          .post("http://localhost:3000/delete", { name: props.valeur })
          .then((reponse) => {
            console.log(reponse);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      newTab1.map((ele, index) => {
        if (ele === props.valeur) {
          newTab1.splice(index, 1);
          props.setTasksSearch(newTab1);
        }
        return "";
      });
      return "";
    });
    props.setTasks(newTab);
  };
  return (
    <div className="will-do" title="to do 😈">
      <p>
        <input
          type="checkbox"
          onClick={handleCheckClick}
          defaultChecked=""
          // className={props.task[1]}
        ></input>
        {props.valeur}
      </p>

      <button onClick={handleDeleteClick}>
        <FontAwesomeIcon icon="trash-alt" className="icon" />
      </button>
    </div>
  );
};
export default Task;
