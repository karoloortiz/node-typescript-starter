import { ComponentMeta } from "../../../components-library/lib/componentMeta/componentMeta";
import { IComponentRepo } from "../componentRepo";

export class ComponentRepo implements IComponentRepo {
  getComponents(tags: string[][]): Promise<ComponentMeta[]> {
    throw new Error("Method not implemented.");
  }
  getComponentsForInformation(
    information: { type: string; attributes: string[] }[]
  ): Promise<ComponentMeta[]> {
    throw new Error("Method not implemented.");
  }
}
