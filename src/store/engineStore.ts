import { BehaviorSubject } from "rxjs";
import { DiagramEngine } from "@projectstorm/react-diagrams";
import customizeEngine from "utils/customizeEngine";

type EngineStore = {
  engine: DiagramEngine;
  canvasReady: boolean;
};

export default new BehaviorSubject<EngineStore>({
  engine: customizeEngine(),
  canvasReady: false,
});
