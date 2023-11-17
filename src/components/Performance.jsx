import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import { PerformanceStyle } from "../styling/stylingComponent/performance";

Chart.register(...registerables);

function PriorityFunction({ input }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [input.done, input.pending],
              borderColor: ["rgb(55, 48, 192)", "rgb(250, 250, 250)"],
              backgroundColor: ["rgb(55, 48, 192)", "rgb(250, 250, 250)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            xAxes: [
              {
                display: false,
              },
            ],
            yAxes: [
              {
                display: false,
              },
            ],
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [input]);

  return (
    <div className={PerformanceStyle.container}>
      <div>
        <canvas ref={chartRef} className={PerformanceStyle.width}></canvas>
        <h1 className={PerformanceStyle.name}>{input.name}</h1>
      </div>
    </div>
  );
}

export default PriorityFunction;
