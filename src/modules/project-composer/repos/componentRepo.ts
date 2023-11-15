import { ComponentMeta } from "../../components-library/lib/componentMeta/componentMeta";

export interface IComponentRepo {
  getComponents(tags: Array<string[]>): Promise<ComponentMeta[]>;
  getComponentsForInformation(
    information: { type: string; attributes: string[] }[]
  ): Promise<ComponentMeta[]>;
}
