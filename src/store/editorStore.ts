import { BehaviorSubject } from "rxjs";

type EditorStore = {
  collapsed: boolean;
};

export default new BehaviorSubject<EditorStore>({ collapsed: false });
