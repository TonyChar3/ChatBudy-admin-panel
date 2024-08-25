import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

const LinearChartComponent = ({ chartData }) => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);
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
