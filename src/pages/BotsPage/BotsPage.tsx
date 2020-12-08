import React from "react";
import "./BotsPage.less";

import { Card, Col, Input, Row, Select } from "antd";
import PageContainer from "layouts/PageContainer";

interface Props {}
const BotsPage: React.FC<Props> = () => {
  return (
    <PageContainer
      actions={
        <Input style={{ minWidth: 500 }} placeholder="Buscar alguma coisa" />
      }
    >
      <div style={{ height: "calc(100vh - 100px)" }}>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="teste card">
              <Select style={{ width: "100%" }}>
                <Select.Option key={1} value={1}>
                  haha
                </Select.Option>
                <Select.Option key={2} value={2}>
                  haha
                </Select.Option>
              </Select>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="teste card">
              <Select style={{ width: "100%" }}>
                <Select.Option key={1} value={1}>
                  haha
                </Select.Option>
                <Select.Option key={2} value={2}>
                  haha
                </Select.Option>
              </Select>
            </Card>
          </Col>
        </Row>
      </div>
    </PageContainer>
  );
};

export default BotsPage;
