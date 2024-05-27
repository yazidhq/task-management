import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { get } from "../services/task.services";

const PieChart = () => {
  const [tasks, setTasks] = useState([]);

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    get(token.token, (success, response) => {
      if (success) {
        setTasks(response.data);
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

  const series = [
    statusCount("to do"),
    statusCount("completed"),
    statusCount("in progress"),
    statusCount("over due"),
  ];

  const options = {
    chart: {
      width: 275,
      height: 275,
      type: "pie",
    },
    labels: ["To Do", "Completed", "In Progress", "Over Due"],
    stroke: {
      colors: ["#1a202c"],
      width: 1,
    },
    legend: {
      position: "bottom",
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        width={275}
        height={275}
      />
    </div>
  );
};

export default PieChart;
