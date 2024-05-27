import { useEffect, useState } from "react";
import PieChart from "../components/PieChart";
import { get } from "../services/task.services";

const PieChartFragment = () => {
  const [countAllTask, setCountAllTask] = useState(0);
  const [tasks, setTasks] = useState([]);

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    get(token.token, (success, response) => {
      if (success) {
        setTasks(response.data);
        setCountAllTask(response.data.length);
      } else {
        console.log(response);
      }
    });
  }, []);

  const statusCount = (stat) => {
    if (!tasks) return 0;
    const data = tasks.filter((task) => task.status === stat);
    return data.length;
  };

  return (
    <div className="pt-7">
      <div className="bg-zinc-900 mr-7 rounded-md shadow-md">
        <div className="py-1 rounded-t-md bg-red-600 h-full"></div>
        <div className="p-7">
          <p className="text-gray-300 mb-10 text-2xl font-bold">Tasks Chart</p>
          <PieChart />
          <div className="grid grid-cols-3 gap-4 text-gray-300 mb-3 mt-7">
            <p className="col-start-1 col-end-3 text-xl">All Task</p>
            <p className="col-end-7 col-span-2 text-xl">{countAllTask}</p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-gray-300 mb-3">
            <p className="col-start-1 col-end-3 text-xl">To Do</p>
            <p className="col-end-7 col-span-2 text-xl">
              {statusCount("to do")}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-gray-300 mb-3">
            <p className="col-start-1 col-end-3 text-xl">In Progress</p>
            <p className="col-end-7 col-span-2 text-xl">
              {statusCount("in progress")}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-gray-300 mb-3">
            <p className="col-start-1 col-end-3 text-xl">Completed</p>
            <p className="col-end-7 col-span-2 text-xl">
              {statusCount("completed")}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-gray-300 mb-3">
            <p className="col-start-1 col-end-3 text-xl">Over Due</p>
            <p className="col-end-7 col-span-2 text-xl">
              {statusCount("over due")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChartFragment;
