import { useEffect, useRef } from "react";
import { Chart } from "chart.js";
import { ProgressStyle } from "../styling/stylingComponent/progressStyle";

function Progress({ input }) {
  let actual_progress = [];
  let label_progress = [];

  input.map((value) => {
    actual_progress.push(value.nilai_rata_rata);
    label_progress.push(new Date(value.timestamp).getDate());
  });

  const chartRef = useRef(null);
  const data = [
    {
      id: 1,
      day: input.length,
      name: "Current Day",
    },
    {
      id: 2,
      day: 31,
      name: "Total Day",
    },
    {
      id: 3,
      day: 31 - Number(input.length),
      name: "Left Day",
    },
  ];
  useEffect(() => {
    if (chartRef.current) {
      const existingChart = Chart.getChart(chartRef.current);
      if (existingChart) {
        existingChart.destroy();
      }
    }

    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: label_progress,
          datasets: [
            {
              data: actual_progress,
              label: "Actual",
              borderColor: "#1E00A0",
              fill: false,
            },
          ],
        },
      });
    }
  }, []);

  return (
    <div
      className={ProgressStyle.container}
      style={{ fontFamily: " 'Geologica', sans-serif" }}
    >
      <p className={ProgressStyle.detailText}>
        Sedangkan grafik di bawah ini adalah grafik progress pencapaian siswa
        dari awal masuk sampai dengan sekarang. Terdapat dua kurva, kurva yang
        berwarna biru merupakan kurva yang menjelaskan nilai nyata dan kurva
        yang berwarna merah adalah kurva yang menjelaskan nilai harapan.
      </p>
      <div className={ProgressStyle.containerIn}>
        <div className={ProgressStyle.widthIn}>
          {input ? (
            <>
              <div className={ProgressStyle.containerImage}>
                <div className={ProgressStyle.widthImage}>
                  <img src="./educate.png" alt=" " />
                </div>
                <div className={ProgressStyle.containerData}>
                  {data.map((value) => (
                    <div
                      className={ProgressStyle.containerDataIn}
                      key={value.id}
                    >
                      <h1 className={ProgressStyle.textData}>{value.day}</h1>
                      <h1 className={ProgressStyle.textNameData}>
                        {value.name}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>

              <canvas ref={chartRef} className={ProgressStyle.canvas}></canvas>
            </>
          ) : (
            <div className={ProgressStyle.containerLoading}>
              <div className={ProgressStyle.loading}></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Progress;
