import * as React from "react";

import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import StaticNodeModel from "./StaticNode.model";
import StaticNode from "./StaticNode";

export default class StaticNodeFactory extends AbstractReactFactory<
  StaticNodeModel,
  DiagramEngine
> {
  constructor() {
    super("static-node");
  }

  generateModel(initialConfig: any) {
    return new StaticNodeModel();
  }

  generateReactWidget(event: any): JSX.Element {
    return (
      <StaticNode engine={this.engine as DiagramEngine} node={event.model} />
    );
  }
}
