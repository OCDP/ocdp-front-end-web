import * as React from "react";

import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import CustomPortModel from "./CustomPort.model";
import CustomPort from "./CustomPort";

export default class CustomPortFactory extends AbstractReactFactory<
  CustomPortModel,
  DiagramEngine
> {
  constructor() {
    super("horizontal-port");
  }

  generateModel() {
    return new CustomPortModel("in");
  }

  generateReactWidget(event: any): JSX.Element {
    return (
      <CustomPort engine={this.engine as DiagramEngine} port={event.model} />
    );
  }
}
