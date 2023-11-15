import {
  DataValue,
  NextReposProps,
  Section,
  SingleField,
} from "./nextReposProps";
import { FEProjectProps } from "../feProject/feProject";
import { NextRepos } from "./nextRepos";

describe("Should create repo pages for next project", () => {
  describe("Should create repo data interface pages", () => {
    test("Should create repo data interface for sections", () => {
      const props = createProps({
        pages: [
          {
            name: "Home",
            isDynamic: false,
            sections: [
              {
                name: "hero",
                fields: [
                  createSingleFieldProps({
                    name: "title",
                    type: "text_short",
                    dataStructure: [
                      {
                        name: "value",
                        type: "string",
                      },
                    ],
                  }),
                ],
              },
              {
                name: "About",
                fields: [
                  createSingleFieldProps({
                    name: "description",
                    type: "text_short",
                    dataStructure: [
                      {
                        name: "value",
                        type: "string",
                      },
                    ],
                  }),
                ],
              },
            ],
          },
        ],
      });

      const nextRepos = new NextRepos(props);

      expect(
        nextRepos.getFile("/lib/repos/homeRepo.ts")
          .hasSourceCode(`export interface HomeRepoData {
          hero: {
            title: string;
          };
          about: {
            description: string;
          };
        }`)
      ).toBeTruthy();
    });

    test("Should create repo data interface for single fields with one element in data structure", () => {
      const props = createProps({
        pages: [
          {
            name: "Home",
            isDynamic: false,
            sections: [
              {
                name: "hero",
                fields: [
                  createSingleFieldProps({
                    name: "title",
                    type: "text_short",
                    dataStructure: [
                      {
                        name: "value",
                        type: "string",
                      },
                    ],
                  }),
                ],
              },
            ],
          },
        ],
      });

      const nextRepos = new NextRepos(props);

      expect(
        nextRepos.getFile("/lib/repos/homeRepo.ts")
          .hasSourceCode(`export interface HomeRepoData {
          hero: {
              title: string;
          };
        }`)
      ).toBeTruthy();
    });

    test("Should create repo data interface for single fields with multiple elements in data structure", () => {
      const props = createProps({
        pages: [
          {
            name: "Home",
            isDynamic: false,
            sections: [
              {
                name: "section1",
                fields: [
                  createSingleFieldProps({
                    name: "birthday",
                    type: "date",
                    dataStructure: [
                      {
                        name: "value",
                        type: "string",
                      },
                      {
                        name: "format",
                        type: "string",
                      },
                    ],
                  }),
                ],
              },
            ],
          },
        ],
      });

      const nextRepos = new NextRepos(props);

      expect(
        nextRepos.getFile("/lib/repos/homeRepo.ts")
          .hasSourceCode(`export interface HomeRepoData {
          section1: {
              birthday:{
                value: string;
                format: string;
              };
          };
        }`)
      ).toBeTruthy();
    });

    test("Should create repo data interface for field group", () => {
      const props = createProps({
        pages: [
          {
            name: "Home",
            isDynamic: false,
            sections: [
              {
                name: "section1",
                fields: [
                  {
                    isList: false,
                    name: "birthdayGroup",
                    fields: [
                      createSingleFieldProps({
                        name: "name",
                        type: "text",
                        dataStructure: [
                          {
                            name: "value",
                            type: "string",
                          },
                        ],
                      }),
                      createSingleFieldProps({
                        name: "birthday",
                        type: "date",
                        dataStructure: [
                          {
                            name: "value",
                            type: "string",
                          },
                          {
                            name: "format",
                            type: "string",
                          },
                        ],
                      }),
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      const nextRepos = new NextRepos(props);

      expect(
        nextRepos.getFile("/lib/repos/homeRepo.ts")
          .hasSourceCode(`export interface HomeRepoData {
          section1: {
            birthdayGroup: {
              name: string;
              birthday:{
                value: string;
                format: string;
              };
            };
          };
        }`)
      ).toBeTruthy();
    });

    test("Should create repo data interface for single field of type list", () => {
      const props = createProps({
        pages: [
          {
            name: "Home",
            isDynamic: false,
            sections: [
              {
                name: "section1",
                fields: [
                  createSingleFieldProps({
                    name: "birthdays",
                    isList: true,
                    type: "date",
                    dataStructure: [
                      {
                        name: "value",
                        type: "string",
                      },
                      {
                        name: "format",
                        type: "string",
                      },
                    ],
                  }),
                ],
              },
            ],
          },
        ],
      });

      const nextRepos = new NextRepos(props);

      expect(
        nextRepos.getFile("/lib/repos/homeRepo.ts")
          .hasSourceCode(`export interface HomeRepoData {
          section1: {
            birthdays:{
              value: string;
              format: string;
            }[];
          };
        }`)
      ).toBeTruthy();
    });

    test("Should create repo data interface for field group of type list", () => {
      const props = createProps({
        pages: [
          {
            name: "Home",
            isDynamic: false,
            sections: [
              {
                name: "section1",
                fields: [
                  {
                    name: "birthdayGroup",
                    isList: true,
                    fields: [
                      createSingleFieldProps({
                        name: "name",
                        type: "text",
                        dataStructure: [
                          {
                            name: "value",
                            type: "string",
                          },
                        ],
                      }),
                      createSingleFieldProps({
                        name: "birthday",
                        type: "date",
                        dataStructure: [
                          {
                            name: "value",
                            type: "string",
                          },
                          {
                            name: "format",
                            type: "string",
                          },
                        ],
                      }),
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });

      const nextRepos = new NextRepos(props);

      expect(
        nextRepos.getFile("/lib/repos/homeRepo.ts")
          .hasSourceCode(`export interface HomeRepoData {
          section1: {
            birthdayGroup: {
              name: string;
              birthday:{
                value: string;
                format: string;
              };
            }[];
          };
        }`)
      ).toBeTruthy();
    });
  });

  describe("Should return data that has interface structure from page repo class", () => {
    test("Should return correct data for singleField dataStructure", () => {
      const props = createProps({
        pages: [
          {
            name: "Home",
            isDynamic: false,
            sections: [
              {
                name: "Hero",
                fields: [
                  createSingleFieldProps({
                    name: "title",
                    type: "text_short",
                    dataStructure: [
                      { name: "value", type: "string", dataModelId: "id#1" },
                    ],
                  }),
                  createSingleFieldProps({
                    name: "birthday",
                    type: "date",
                    dataStructure: [
                      {
                        name: "value",
                        type: "string",
                        dataModelId: "id#2.1",
                      },
                      {
                        name: "format",
                        type: "string",
                        dataModelId: "id#2.2",
                      },
                    ],
                  }),
                ],
              },
            ],
            dataValues: [
              {
                dataModelId: "id#1",
                value: "Questo è il titolo",
              },
              {
                dataModelId: "id#2.1",
                value: "10/01/2022",
              },
              {
                dataModelId: "id#2.2",
                value: "dd/MM/AAAA",
              },
            ],
          },
        ],
      });

      const nextRepos = new NextRepos(props);

      expect(
        nextRepos.getFile("/lib/repos/homeRepo.ts")
          .hasSourceCode(`const data: HomeRepoData = {
                  hero: {
                    title: \`Questo è il titolo\`,
                    birthday: {
                      value: \`10/01/2022\`,
                      format: \`dd/MM/AAAA\`,
                    }
                  }
                }`)
      ).toBeTruthy();
    });

    test("Should return correct data for fieldGroup dataStructure", () => {
      const props = createProps({
        pages: [
          {
            name: "Home",
            isDynamic: false,
            sections: [
              {
                name: "Hero",
                fields: [
                  {
                    name: "Borsa",
                    isList: false,
                    fields: [
                      createSingleFieldProps({
                        name: "title",
                        type: "text_short",
                        dataStructure: [
                          {
                            name: "value",
                            type: "string",
                            dataModelId: "id#1",
                          },
                        ],
                      }),
                      createSingleFieldProps({
                        name: "quantity",
                        type: "number",
                        dataStructure: [
                          {
                            name: "value",
                            type: "number",
                            dataModelId: "id#2",
                          },
                        ],
                      }),
                    ],
                  },
                ],
              },
            ],
            dataValues: [
              {
                dataModelId: "id#1",
                value: "Questo è il titolo",
              },
              {
                dataModelId: "id#2",
                value: "44.5",
              },
            ],
          },
        ],
      });

      const nextRepos = new NextRepos(props);

      expect(
        nextRepos.getFile("/lib/repos/homeRepo.ts")
          .hasSourceCode(`const data: HomeRepoData = {
                  hero: {
                    borsa:{
                      title: \`Questo è il titolo\`,
                      quantity: 44.5,
                    }
                  }
                }`)
      ).toBeTruthy();
    });

    test("Should return correct data for fieldGroup list", () => {
      const props = createProps({
        pages: [
          {
            name: "Home",
            isDynamic: false,
            sections: [
              {
                name: "Hero",
                fields: [
                  {
                    name: "Borse",
                    isList: true,
                    dataModelId: "id#2",
                    fields: [
                      createSingleFieldProps({
                        name: "title",
                        type: "text_short",
                        dataStructure: [
                          {
                            name: "value",
                            type: "string",
                            dataModelId: "id#1",
                          },
                        ],
                      }),
                      createSingleFieldProps({
                        name: "subtitle",
                        type: "text_short",
                        dataStructure: [
                          {
                            name: "value",
                            type: "string",
                            dataModelId: "id#1.2",
                          },
                        ],
                      }),
                    ],
                  },
                ],
              },
            ],
            dataValues: [
              {
                dataModelId: "id#2",
                value: [
                  [
                    { dataModelId: "id#1", value: "Questo è il titolo" },
                    { dataModelId: "id#1.2", value: "Questo è il sottotitolo" },
                  ],
                  [
                    {
                      dataModelId: "id#1",
                      value:
                        "Questo è il titolo del secondo elemento nella lista",
                    },
                    {
                      dataModelId: "id#1.2",
                      value:
                        "Questo è il sottotitolo del secondo elemento nella lista",
                    },
                  ],
                ],
              },
            ],
          },
        ],
      });

      const nextRepos = new NextRepos(props);

      expect(
        nextRepos.getFile("/lib/repos/homeRepo.ts")
          .hasSourceCode(`const data: HomeRepoData = {
                  hero: {
                    borse: [
                      {
                        title: \`Questo è il titolo\`,
                        subtitle: \`Questo è il sottotitolo\`,
                      },
                      {
                        title: \`Questo è il titolo del secondo elemento nella lista\`,
                        subtitle: \`Questo è il sottotitolo del secondo elemento nella lista\`,
                      }
                    ]
                  }
                }`)
      ).toBeTruthy();
    });
  });
});

function createProps(props: {
  pages: {
    name: string;
    isDynamic: boolean;
    sections?: Section[];
    dataValues?: DataValue[];
  }[];
}): NextReposProps & FEProjectProps {
  return {
    name: "project_name",
    pages: props.pages.map((p) => ({
      name: p.name,
      isDynamic: p.isDynamic,
      sections: p.sections ?? [],
      dataValues: p.dataValues ?? [],
    })),
  };
}

function createSingleFieldProps(props: {
  name: string;
  type: string;
  isList?: boolean;
  dataStructure?: {
    name: string;
    type: string;
    dataModelId?: string;
  }[];
}): SingleField {
  return {
    name: props.name,
    type: props.type,
    isList: props.isList ?? false,
    dataStructure:
      props.dataStructure?.map((d) => ({
        name: d.name,
        type: d.type,
        dataModelId: d.dataModelId ?? "dataModelId",
      })) ?? [],
  };
}
