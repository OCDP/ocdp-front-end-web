import { Col, Row } from "antd";
import LineChart from "components/BotCharts/BarChart";
import PieChart from "components/BotCharts/PieChart";
import MenuBot from "components/MenuBot";
import PageContainer from "layouts/PageContainer";
import React from "react";
import "./DashboardPage.less";

interface Props {}
const DashboardPage: React.FC<Props> = () => {
  const data: Models.DataChartBot[] = [
    {
      label: "aaaa",
      value: 20,
      color: "#ff4545",
    },
    {
      label: "bbbb",
      value: 20,
      color: "#b7dd29",
    },
    {
      label: "cccc",
      value: 20,
      color: "#ff4545",
    },
    {
      label: "dddd",
      value: 20,
      color: "#b7dd29",
    },
    {
      label: "dddd",
      value: 20,
      color: "#ff4545",
    },
  ];

  return (
    <PageContainer menu={<MenuBot />}>
      <div className="dashboard-container">
        <Row gutter={16}>
          <Col md={6} xs={24} sm={12}>
            <PieChart
              data={data}
              title="grafico massa pie"
              subtitle="lorem ipsum lorem ipsum lorem ipsum lorem ipsum "
            />
          </Col>

          <Col md={6} xs={24} sm={12}>
            <LineChart
              data={data}
              title="grafico massa line"
              subtitle="lorem ipsum lorem ipsum lorem ipsum lorem ipsum "
            />
          </Col>

          <Col md={6} xs={24} sm={12}>
            <PieChart
              data={data}
              title="grafico massa pie"
              subtitle="lorem ipsum lorem ipsum lorem ipsum lorem ipsum "
            />
          </Col>

          <Col md={6} xs={24} sm={12}>
            <PieChart
              data={data}
              title="grafico massa pie"
              subtitle="lorem ipsum lorem ipsum lorem ipsum lorem ipsum "
            />
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default DashboardPage;
