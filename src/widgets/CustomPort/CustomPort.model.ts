import {
  DefaultLinkModel,
  DefaultPortModel,
  LinkModel,
  PortModelAlignment,
} from "@projectstorm/react-diagrams";

export default class CustomPortModel extends DefaultPortModel {
  constructor(direction: Models.PortDirection) {
    super({
      name: direction,
      locked: direction === "in",
      maximumLinks: direction === "in" ? 1 : undefined,
      type: "horizontal-port",
      alignment:
        direction === "in" ? PortModelAlignment.RIGHT : PortModelAlignment.LEFT,
    });
  }

  // override
  canLinkToPort(targetPort: DefaultPortModel) {
    const links = Object.values(this.getLinks() || {});
    return (
      this.getParent().getID() !== targetPort.getParent().getID() &&
      links.length === 1 &&
      targetPort.getName() === "in"
    );
  }

  // override
  createLinkModel() {
    const curvyness = -128;
    // const control = curvyness * -1.25;
    const newLink = new DefaultLinkModel({
      curvyness,
      // color: (this.getParent().getOptions() as any).color || "grey",
      // selectedColor: (this.getParent().getOptions() as any).color || "darkGrey",
      selectedColor: "var(--primary-color)",
    });
    // newLink.calculateControlOffset = (
    //   port: CustomPortModel
    // ): [number, number] => {
    //   const { alignment = "right" } = port.getOptions();
    //   if (alignment === PortModelAlignment.RIGHT) {
    //     return [curvyness, control];
    //   } else if (alignment === PortModelAlignment.LEFT) {
    //     return [-curvyness, control];
    //   } else if (alignment === PortModelAlignment.TOP) {
    //     return [control, -curvyness];
    //   }
    //   return [control, curvyness];
    // };
    return newLink as LinkModel;
  }

  // override
  serialize() {
    return {
      ...super.serialize(),
    };
  }

  // remove() {
  //   Object.values(this.getLinks()).forEach((link) => {
  //     link.clearListeners();
  //     link.remove();
  //   });
  //   super.remove();
  // }

  // override
  deserialize(event: any): void {
    super.deserialize(event);
  }
}
