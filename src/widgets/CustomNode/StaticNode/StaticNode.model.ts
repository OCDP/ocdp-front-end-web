import { nodeHasOutPort } from "configs/flowConfig";
import { NodeModel } from "@projectstorm/react-diagrams";
import { BaseModelOptions } from "@projectstorm/react-canvas-core";
import { CustomPortModel } from "widgets/CustomPort";
import { forEach } from "lodash";

export interface StaticNodeModelOptions extends BaseModelOptions {
  color?: string;
  value?: any;
  label?: string;
  nodeType?: Models.NodeType;
}

export default class StaticNodeModel extends NodeModel {
  value: any;
  label: string;
  nodeType: Models.NodeType;

  constructor(options: StaticNodeModelOptions = {}) {
    super({
      ...options,
      type: "static-node",
    });
    this.value = options.value ?? {};
    this.label = options.label ?? "";
    this.nodeType = options.nodeType || "message";

    if (this.nodeType !== "start") {
      this.addPort(new CustomPortModel("in"));
    }
    if (nodeHasOutPort[this.nodeType]) {
      this.addPort(new CustomPortModel("out"));
    }
  }

  remove() {
    if (this.nodeType !== "start") {
      super.remove();
      forEach(this.ports, (port) => {
        forEach(port.getLinks(), (link) => {
          link.remove();
        });
      });
    }
  }

  getPort(name: string) {
    return super.getPort(name) as CustomPortModel;
  }

  getPorts() {
    return super.getPorts() as Record<string, CustomPortModel>;
  }

  serialize() {
    return {
      ...super.serialize(),
      value: this.value,
      label: this.label,
      nodeType: this.nodeType,
    };
  }

  deserialize(event: any): void {
    super.deserialize(event);
    this.value = event.data.value;
    this.label = event.data.label;
    this.nodeType = event.data.nodeType;
  }
}
