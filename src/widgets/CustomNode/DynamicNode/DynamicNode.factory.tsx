import * as React from "react";

import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import DynamicNodeModel from "./DynamicNode.model";
import DynamicNode from "./DynamicNode";

export default class DynamicNodeFactory extends AbstractReactFactory<
  DynamicNodeModel,
  DiagramEngine
> {
  constructor() {
    super("dynamic-node");
  }

  generateModel(initialConfig: any) {
    return new DynamicNodeModel();
  }

  generateReactWidget(event: any): JSX.Element {
    return (
      <DynamicNode engine={this.engine as DiagramEngine} node={event.model} />
    );
  }
}
