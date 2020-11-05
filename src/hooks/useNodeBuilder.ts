import { DiagramEngine } from "@projectstorm/react-diagrams";
import { useCallback } from "react";
import { Point } from "@projectstorm/geometry";
import { flowLabels, nodeIsDynamic } from "configs/flowConfig";
import { DynamicNodeModel, StaticNodeModel } from "widgets/CustomNode";

export default function (engine: DiagramEngine) {
  return useCallback(
    (nodeType: Models.NodeType, point: Point) => {
      const label = flowLabels[nodeType];
      const node = nodeIsDynamic[nodeType]
        ? new DynamicNodeModel({ label, nodeType })
        : new StaticNodeModel({ label, nodeType });
      node.setPosition(point);
      engine.getModel().addNode(node);
      engine.repaintCanvas();
    },
    [engine]
  );
}
