import { ChangeOperationPersistanceModel } from "./changeOperationPersistanceModel";
import { PagePersistanceModel } from "./pagePersistanceModel";

export interface DigitalProductPersistanceModel {
  _id: string;
  name: string;
  pages: PagePersistanceModel[];
  changesHistory: ChangeOperationPersistanceModel[];
}
