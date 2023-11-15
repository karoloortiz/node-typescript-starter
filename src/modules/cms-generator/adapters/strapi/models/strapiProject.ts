import { ValueObject } from "../../../../../ddd-primitives";
import { StrapiComponent } from "./strapiComponent";
import { StrapiType } from "./strapiType";

interface StrapiProjectProps {
  singleTypes: StrapiType[];
  collectionTypes: StrapiType[];
  components: StrapiComponent[];
}

export class StrapiProject extends ValueObject<StrapiProjectProps> {
  constructor(props: StrapiProjectProps) {
    super(props);
  }

  public get singleTypes(): StrapiType[] {
    return this.props.singleTypes;
  }

  public get collectionTypes(): StrapiType[] {
    return this.props.collectionTypes;
  }

  public get components(): StrapiComponent[] {
    return this.props.components;
  }

  public getSingleType(id: string): StrapiType {
    return this.singleTypes.find((t) => t.id.toString() == id);
  }

  public getCollectionType(id: string): StrapiType {
    return this.collectionTypes.find((t) => t.id.toString() == id);
  }

  public getComponent(id: string): StrapiComponent {
    return this.components.find((c) => c.id.toString() == id);
  }
}
