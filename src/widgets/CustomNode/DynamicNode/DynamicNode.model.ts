import { nodeHasOutPort } from "configs/flowConfig";
import { Observable } from "rxjs";
import { Subject } from "rxjs";
import { NodeModel } from "@projectstorm/react-diagrams";
import { BaseModelOptions } from "@projectstorm/react-canvas-core";
import { CustomPortModel } from "widgets/CustomPort";
import { debounce, forEach } from "lodash";

export interface DynamicNodeModelOptions extends BaseModelOptions {
  color?: string;
  value?: any;
  label?: string;
  nodeType?: Models.NodeType;
}

export default class DynamicNodeModel extends NodeModel {
  value: any;
  label: string;
  nodeType: Models.NodeType;
  private outPortsSubject: Subject<
    Record<string, CustomPortModel>
  > = new Subject();

  constructor(options: DynamicNodeModelOptions = {}) {
    super({
      ...options,
      type: "dynamic-node",
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

  addPort(port: CustomPortModel) {
    super.addPort(port);
    if (!["in", "out"].includes(port.getName())) {
      this.reportOutPortsState();
    }
    return port;
  }

  removePort(port: CustomPortModel) {
    super.removePort(port);
    port.clearListeners();
    if (port.getName() !== "in" && !nodeHasOutPort[this.nodeType]) {
      this.reportOutPortsState();
    }
  }

  getPort(name: string) {
    return super.getPort(name) as CustomPortModel;
  }

  getPorts() {
    return super.getPorts() as Record<string, CustomPortModel>;
  }

  getOutPortsObservable(): Observable<Record<string, CustomPortModel>> {
    return this.outPortsSubject.asObservable();
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

  private reportOutPortsState() {
    debounce(() => {
      try {
        const rawPorts = this.getPorts();
        const outPorts = Object.entries(rawPorts)
          .filter(([portName]) => !["in", "out"].includes(portName))
          .reduce((ports, [portName, port]) => {
            ports[portName] = port;
            return ports;
          }, {} as Record<string, CustomPortModel>);
        this.outPortsSubject.next(outPorts);
      } catch (err) {
        this.outPortsSubject.error(err);
      }
    }, 100)();
  }
}
