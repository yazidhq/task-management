import { useEffect, useRef, useState } from "react";
import LabelItem from "../components/LabelItem";
import TableTask from "../components/TableTask/TableTask";
import FormTask from "../components/FormInput/FormTask";
import TableItem from "../components/TableTask/Elements/TableItem";
import { get_current } from "../services/auth.services";
import { destroy, get, store, update } from "../services/task.services";
import LoadingScreen from "../fragments/LoadingScreen";

const AllTaskPage = () => {
  const [showInputTask, setShowInputTask] = useState(true);
  const [tasks, setTasks] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      get_current(token.token, (success, response) => {
        if (success) {
          setCurrentUser(response);
        } else {
          console.log(response);
        }
      });
    } else {
      window.location = "/login";
    }
  }, []);

  useEffect(() => {
    get(token.token, (success, response) => {
      if (success) {
        setTasks(response.data);
      } else {
        console.log(response);
      }
    });
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      description: e.target.description.value,
      duedate: e.target.duedate.value,
      priority: e.target.priority.value,
    };
    store(data, token.token, (success, response) => {
      if (success) {
        console.log(response);
      } else {
        console.log(response);
      }
    });
  };

  const handleRemove = (id) => {
    destroy(id, token.token, (success, response) => {
      if (success) {
        console.log(response);
      } else {
        console.log(response);
      }
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      status: e.target.status.value,
      description: e.target.description.value,
      duedate: e.target.duedate.value,
      priority: e.target.priority.value,
    };
    const id = e.target.id.value;
    update(id, data, token.token, (success, response) => {
      if (success) {
        console.log(response);
      } else {
        console.log(response);
      }
    });
  };

  const handleInput = () => {
    setShowInputTask(!showInputTask);
  };

  return (
    <>
      {currentUser == null ? (
        <div className="flex flex-col items-center justify-center col-span-4 h-screen">
          <LoadingScreen />
        </div>
      ) : (
        <div className="col-span-4">
          <div className="pt-7 mr-4">
            <LabelItem />
            <div className="bg-zinc-800 px-7 ml-7 mr-3 mt-3 rounded-md border-dashed border-2 border-zinc-900">
              <button onClick={handleInput}>
                <p className="py-3 text-gray-300 flex items-center shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 mr-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d={`${
                        showInputTask ? "M5 12h14" : "M12 4.5v15m7.5-7.5h-15"
                      }`}
                    />
                  </svg>
                  {!showInputTask ? "Add New Task" : "Close Form"}
                </p>
              </button>
            </div>
            {showInputTask && (
              <FormTask
                handleSubmit={handleSubmit}
                isEdit={false}
                userID={currentUser && currentUser.data.id}
              />
            )}

            <TableTask />
            <div className="bg-zinc-900 ml-7 mr-3 rounded-b-md mb-7">
              <div className="pb-7 grid gap-1">
                {tasks &&
                  tasks.map((task) => {
                    return (
                      <TableItem
                        key={task.id}
                        title={task.title}
                        status={task.status}
                        description={task.description}
                        duedate={task.duedate}
                        priority={task.priority}
                        handleRemove={() => handleRemove(task.id)}
                        handleUpdate={handleUpdate}
                        taskID={task.id}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default AllTaskPage;
