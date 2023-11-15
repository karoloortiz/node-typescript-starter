import { SectionPersistanceModel } from "./sectionPersistanceModel";

export interface PagePersistanceModel {
  _id: string;
  name: string;
  role: string;
  sections: SectionPersistanceModel[];
  isRepeatable: boolean;
  linkedSnappieId?: string;
}
