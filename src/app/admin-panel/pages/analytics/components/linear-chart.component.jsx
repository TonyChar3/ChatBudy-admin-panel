import { Line } from "react-chartjs-2";

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
