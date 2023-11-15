import { ComponentMeta } from "../../components-library/lib/componentMeta/componentMeta";

export interface ISiteBuilderRepo {
  getDigitalProductPage(
    pageId: string,
    digitalProductId: string
  ): Promise<{
    page: Page;
  }>;
}

export interface Page {
  sections: {
    name: string;
    id: string;
    snappie: Snappie;
  }[];
}

export interface Snappie {
  id: string;
  name: string;
  type: "showInfo";
  fields: Field[];
}

export interface Field {
  id: string;
  attributes: {
    name: string;
    value: string;
  }[];
  animation?: any;
  type: string;
  name: string;
  answers?: [];
  snappie?: Snappie;
}

/* 
id: "28f1d08a-38d7-4f88-893c-b09eab7fcfaf",
snappie: {
  id: "403a4bfc-1cdb-4b90-952d-aaebc17514cb",
  name: "listElement",
  type: "showInfo",
  fields: [
    {
      id: "28f1d08a-38d7-4f88-893c-b09eab7fcfaf",
      attributes: [
        {
          name: "text_length",
          value: "short",
        },
        {
          name: "text_interest_level",
          value: "headline",
        },
      ],
      animation: null,
      type: "text",
      name: "a field",
      linkedSnappieFieldId: null,
      answers: [],
    },
    {
      id: "a9f23b5e-c144-4c34-9a82-c0e5571075fc",
      attributes: [
        {
          name: "text_length",
          value: "long",
        },
        {
          name: "text_interest_level",
          value: "descriptive",
        },
      ],
      animation: null,
      type: "text",
      name: "a field",
      linkedSnappieFieldId: null,
      answers: [],
    },
    {
      id: "24e919c6-88fe-4faf-ac76-b18b05cf235d",
      attributes: [
        {
          name: "image_position",
          value: "background",
        },
      ],
      animation: null,
      type: "image",
      name: "a field",
      linkedSnappieFieldId: null,
      answers: [],
    },
    {
      id: "24e919c6-88fe-4faf-ac76-b18b05cf235d",
      attributes: [
        {
          name: "text_length",
          value: "long",
        },
        {
          name: "text_interest_level",
          value: "descriptive",
        },
      ],
      animation: null,
      type: "link",
      name: "a field",
      linkedSnappieFieldId: null,
      answers: [],
    },
  ],
},
animation: null,
type: "list",
name: "a field",
linkedSnappieFieldId: null,
answers: [], */
