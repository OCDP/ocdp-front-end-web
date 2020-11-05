import React, { memo, useCallback, useMemo } from "react";
import "./Message.less";

import { Form } from "antd";
import { StaticNodeModel } from "widgets/CustomNode";
import FieldSetMessage from "components/FieldSetMessage";
import useMountEffect from "hooks/lifecycle/useMountEffect";
import newMessage from "utils/newMessage";

interface Props {
  node: StaticNodeModel;
  advanced?: boolean;
}

const Message: React.FC<Props> = ({ node, advanced }) => {
  const [form] = Form.useForm();
  const initialValues = useMemo(
    () => ({
      value: Object.keys(node.value).length > 0 ? node.value : [newMessage],
    }),
    [node]
  );

  const handleChanges = useCallback(
    (_, { value }) => {
      node.value = value;
    },
    [node]
  );

  useMountEffect(() => {
    // node.value.messageType = "text";
  });

  return (
    <Form
      form={form}
      initialValues={initialValues}
      onValuesChange={handleChanges}
      onFocus={() => node.setLocked(true)}
      onBlur={() => node.setLocked(false)}
    >
      <Form.List name={["value"]}>
        {(fields, actions) =>
          fields.map((field) => (
            <FieldSetMessage {...{ fields, actions, node, advanced, field }} />
          ))
        }
      </Form.List>
    </Form>
  );
};

export default memo(Message);
