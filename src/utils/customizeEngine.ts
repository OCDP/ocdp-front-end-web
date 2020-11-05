import createEngine, {
  DefaultDiagramState,
  DiagramModel,
} from "@projectstorm/react-diagrams";
import { DynamicNodeFactory, StaticNodeFactory } from "widgets/CustomNode";
import { CustomPortFactory } from "widgets/CustomPort";

export default function () {
  const engine = createEngine();

  engine.getNodeFactories().registerFactory(new StaticNodeFactory());
  engine.getNodeFactories().registerFactory(new DynamicNodeFactory());
  engine.getPortFactories().registerFactory(new CustomPortFactory());
  engine.setMaxNumberPointsPerLink(8);

  const state = engine
    .getStateMachine()
    .getCurrentState() as DefaultDiagramState;
  state.dragNewLink.config.allowLooseLinks = false;

  const initialModel = new DiagramModel();

  initialModel.setGridSize(16);

  engine.setModel(initialModel);

  return engine;
}
