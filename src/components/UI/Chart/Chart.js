import React, { useEffect, useState } from "react";
import { calcAudienceHelpPercentage } from "../../../Helpers/calcAudienceHelpPecrentage";
import { Chart, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";
Chart.register(...registerables);

const ChartBar = (props) => {
  const [chartArray, setChartArray] = useState([]);

  useEffect(() => {
    setChartArray(calcAudienceHelpPercentage(props.answers));
  }, [setChartArray]);

  const chartData = {
    labels: chartArray.map((answer) => answer.label),
    datasets: [
      {
        label: "Users Gained",
        data: chartArray.map((answer) => answer.percent),
        backgroundColor: ["rgba(86, 90, 153)"],
        borderColor: "rgb(112, 115, 153)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles["chart_box"]}>
      <Bar data={chartData} />
    </div>
  );
};

export default ChartBar;
