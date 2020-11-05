/* eslint-disable @typescript-eslint/no-unused-vars */
/// <reference types="react-scripts" />

namespace Models {
  type PortDirection = "in" | "out" | string;

  type NodeType =
    | "message"
    | "conditional"
    | "script"
    | "start"
    | "declaration"
    | "input"
    | "switch"
    | "forward"
    | "request"
    | "attendance"
    | "end";

  interface Flow {
    id: string;
    offsetX: number;
    offsetY: number;
    zoom: number;
    gridSize: number;
    layers: Flow.Layer[];
  }

  interface MiniFlow {
    id: string;
    name: string;
    description?: string;
    is_initial: boolean;
  }

  interface FlowReq {
    id: string;
    name: string;
    description?: string;
    content_edit: Dict<any>;
    is_initial: boolean;
  }

  namespace Flow {
    interface Layer {
      id: string;
      type: string;
      isSvg: boolean;
      transformed: boolean;
      models: Models;
    }

    interface Models {
      [model: string]: Link | Node;
    }

    interface Node {
      id: string;
      type: string;
      x: number;
      y: number;
      ports: Port[];
      color: string;
      value: string;
    }

    interface Port {
      id: string;
      type: string;
      x: number;
      y: number;
      name: string;
      alignment: string;
      parentNode: string;
      links: string[];
      in: boolean;
      label: string;
    }

    interface Link {
      id: string;
      type: string;
      source: string;
      sourcePort: string;
      target: string;
      targetPort: string;
      points: Point[];
      labels: any[];
      width: number;
      color: string;
      curvyness: number;
      selectedColor: string;
    }

    interface Point {
      id: string;
      type: string;
      x: number;
      y: number;
    }
  }
}
