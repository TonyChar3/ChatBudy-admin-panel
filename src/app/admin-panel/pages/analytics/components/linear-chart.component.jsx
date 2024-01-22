import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const LinearChartComponent = ({ chartData }) => {
  return (
    <>
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </>
  );
};

export default LinearChartComponent;
