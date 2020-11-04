import React, { useState } from "react";

import { Bar } from "react-chartjs-2";
const BarChart = ({ likes, disLikes, descripcion }) => {
  const [state, setState] = useState({
    labels: ["Like", "Dislike"],
    datasets: [
      {
        label: "Users",
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [likes, disLikes, 0],
      },
    ],
  });

  return (
    <>
      <Bar
        data={state}
        options={{
          title: {
            display: true,
            text: descripcion,
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </>
  );
};

export default BarChart;
