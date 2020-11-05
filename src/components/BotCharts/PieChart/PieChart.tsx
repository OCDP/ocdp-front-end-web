import React, { useMemo } from "react";
import "./PieChart.less";
import { Pie } from "react-chartjs-2";
import { Card } from "antd";

interface Props {
  title: string;
  subtitle?: string;
  data: Models.DataChartBot[];
  description?: string;
  size?: "default" | "small";
}
const PieChart: React.FC<Props> = ({
  title,
  subtitle,
  data,
  description,
  size,
}) => {
  const labels = useMemo(() => data.map(({ label }) => label), [data]);
  const values = useMemo(() => data.map(({ value }) => value), [data]);
  const colors = useMemo(() => data.map(({ color }) => color), [data]);

  return (
    <Card
      title={
        <div>
          <b>{title}</b> <br /> <small>{subtitle}</small>
        </div>
      }
      size={size}
    >
      <Pie
        data={{
          labels: labels,
          datasets: [
            {
              label: "Rainfall",
              backgroundColor: colors,
              data: values,
            },
          ],
        }}
        options={{
          title: {
            display: description,
            text: description,
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </Card>
  );
};

export default PieChart;
