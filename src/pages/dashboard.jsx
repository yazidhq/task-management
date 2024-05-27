import LabelItem from "../components/LabelItem";
import TableTask from "../components/TableTask/TableTask";
import CardFragment from "../fragments/Card";
import PieChartFragment from "../fragments/PieChart";
import { cards } from "../fragments/Card";
import TableItem from "../components/TableTask/Elements/TableItem";
import { useEffect, useState } from "react";
import { get } from "../services/task.services";
import { get_current } from "../services/auth.services";
import LoadingScreen from "../fragments/LoadingScreen";

const DashboardPage = () => {
  const [countAllTask, setCountAllTask] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);

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
    <>
      {currentUser == null ? (
        <div className="flex flex-col items-center justify-center col-span-4 h-screen">
          <LoadingScreen />
        </div>
      ) : (
        <>
          <div className="col-span-3">
            <div className="pl-7 pt-7 pb-7 mr-3">
              <div className="grid gap-5 grid-cols-3">
                {cards.length > 0 &&
                  cards.map((card) => (
                    <CardFragment
                      key={card.id}
                      title={card.title}
                      desc={card.desc}
                      colorIcon={card.colorIcon}
                      colorText={card.colorText}
                      status={
                        card.title === "all task"
                          ? countAllTask
                          : statusCount(card.title)
                      }
                    />
                  ))}
              </div>
            </div>
            <LabelItem />
            <TableTask action={false} />
            <div className="bg-zinc-900 ml-7 mr-3 rounded-b-md">
              <div className="pb-7 grid gap-1">
                {tasks &&
                  tasks.map((task) => {
                    return (
                      <TableItem
                        key={task.id}
                        title={task.title}
                        status={task.status}
                        duedate={task.duedate}
                        priority={task.priority}
                        action={false}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <PieChartFragment />
          </div>
        </>
      )}
    </>
  );
};

export default DashboardPage;
