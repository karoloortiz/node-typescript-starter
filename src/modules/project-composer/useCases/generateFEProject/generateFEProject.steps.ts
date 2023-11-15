import { instance, mock, when } from "ts-mockito";
import { GenerateFEProject } from "./generateFEProject";
import { IntegrationRepo } from "../../repos/implementations/integrationRepo";
import { IntegratedData } from "../../repos/integrationRepo";
import {
  BaseComponentProps,
  ComponentProps,
} from "../../domain/entities/nextComponents/nextComponentsProps";

const mockIntegrationRepo = mock(IntegrationRepo);
const integrationRepo = instance(mockIntegrationRepo);

describe("Should generate a FE software project for a digital product", () => {
  test("Should generate a NextJS software project for a digital product", async () => {
    /* Expected:
    - Home
      - Hero
        - Title
        - Subtitle
        - Image
      - List section
        - List of field group
          - Name
          - Description
    - Employee
      - Employee of the month section
        - Field group
          - Name
          - Surname
          - Info (field group)
            - Birthdate
            - Birthplace
    */

    const input = {
      digitalProductId: "dp#1",
      type: "nextjs" as "nextjs",
    };

    const mainContainerFile = {
      pathname: "/index.tsx",
      sourceCode: `import * as React from "react";
  export interface MainContainerProps {
    child: React.ReactNode;
  }

  export const MainContainer = (props: MainContainerProps) => {
    return <div>{props.child}</div>;
  };`,
    };

    const verticalLayoutFile = {
      pathname: "/index.tsx",
      sourceCode: `import * as React from "react";
export interface VerticalLayoutProps {
children: React.ReactNode[];
}

export const VerticalLayout = (props: VerticalLayoutProps) => {
return <div>{props.children}</div>;
};`,
    };

    const horizontalLayoutFile = {
      pathname: "/index.tsx",
      sourceCode: `import * as React from "react";
export interface HorizontalLayoutProps {
  children: React.ReactNode[];
}

export const HorizontalLayout = (props: HorizontalLayoutProps) => {
  return <div>{props.children}</div>;
};`,
    };

    const textComponentFile = {
      pathname: "/index.tsx",
      sourceCode: `import * as React from "react";

    export interface TextComponentProps {
      text: string;
    }
    
    export const TextComponent = (props: TextComponentProps) => {
      return <div>{props.text}</div>;
    };`,
    };

    const imageComponentFile = {
      pathname: "/index.tsx",
      sourceCode: `import * as React from "react";

export interface ImageComponentProps {
src: string;
}

export const ImageComponent = (props: ImageComponentProps) => {
return <img src={props.src}></img>;
};`,
    };

    const data: IntegratedData = {
      name: "NewSite",
      pages: [
        {
          name: "HomePage",
          isDynamic: false,
          isIndex: true,
          sections: [
            {
              name: "HeroSection",
              fields: [
                {
                  name: "title",
                  type: "text_short",
                  isList: false,
                  dataStructure: [
                    {
                      dataModelId: "titleId",
                      name: "title",
                      type: "string",
                    },
                  ],
                },
                {
                  name: "subtitle",
                  type: "text_medium",
                  isList: false,
                  dataStructure: [
                    {
                      dataModelId: "subtitleId",
                      name: "subtitle",
                      type: "string",
                    },
                  ],
                },
                {
                  name: "photo",
                  type: "image",
                  isList: false,
                  dataStructure: [
                    {
                      dataModelId: "photoId",
                      name: "photo",
                      type: "string",
                    },
                  ],
                },
              ],
            },
            {
              name: "ShoesSection",
              fields: [
                {
                  name: "shoesList",
                  isList: true,
                  dataModelId: "listId",
                  fields: [
                    {
                      name: "name",
                      type: "text_short",
                      isList: false,
                      dataStructure: [
                        {
                          dataModelId: "nameId",
                          name: "name",
                          type: "string",
                        },
                      ],
                    },
                    {
                      name: "description",
                      type: "text_long",
                      isList: false,
                      dataStructure: [
                        {
                          dataModelId: "descriptionId",
                          name: "description",
                          type: "string",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          dataValues: [
            {
              dataModelId: "titleId",
              value: "hero title",
            },
            {
              dataModelId: "subtitleId",
              value: "hero subtitle bla bla bla",
            },
            {
              dataModelId: "photoId",
              value: "http://google.com",
            },
            {
              dataModelId: "listId",
              value: [
                [
                  {
                    dataModelId: "nameId",
                    value: "shoe 1 name",
                  },
                  {
                    dataModelId: "descriptionId",
                    value: "shoe 1 description bla bla bla bla bla bla bla",
                  },
                ],
                [
                  {
                    dataModelId: "nameId",
                    value: "shoe 2 name",
                  },
                  {
                    dataModelId: "descriptionId",
                    value: "shoe 2 description bla bla bla bla bla bla bla",
                  },
                ],
              ],
            },
          ],
        },
        {
          name: "EmployeePage",
          isDynamic: false,
          isIndex: false,
          sections: [
            {
              name: "EmployeeSection",
              fields: [
                {
                  name: "employee",
                  isList: false,
                  fields: [
                    {
                      name: "name",
                      type: "text_short",
                      isList: false,
                      dataStructure: [
                        {
                          dataModelId: "emplNameId",
                          name: "name",
                          type: "string",
                        },
                      ],
                    },
                    {
                      name: "surname",
                      type: "text_short",
                      isList: false,
                      dataStructure: [
                        {
                          dataModelId: "emplSurnameId",
                          name: "surname",
                          type: "string",
                        },
                      ],
                    },
                    {
                      name: "info",
                      isList: false,
                      fields: [
                        {
                          name: "birthday",
                          type: "date",
                          isList: false,
                          dataStructure: [
                            {
                              dataModelId: "emplBirthdayId",
                              name: "birthday",
                              type: "string",
                            },
                          ],
                        },
                        {
                          name: "birthplace",
                          type: "text_short",
                          isList: false,
                          dataStructure: [
                            {
                              dataModelId: "emplBirthplaceId",
                              name: "birthplace",
                              type: "string",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          dataValues: [
            {
              dataModelId: "emplNameId",
              value: "Mario",
            },
            {
              dataModelId: "emplSurnameId",
              value: "Rossi",
            },
            {
              dataModelId: "emplBirthdayId",
              value: "08/05/1980",
            },
            {
              dataModelId: "emplBirthplaceId",
              value: "Dublin",
            },
          ],
        },
      ],
      tokens: "{}",
      pageComponents: [
        componentWithFiles({
          id: "homepageComponent",
          name: "homePage",
          files: [
            {
              pathname: "/index.tsx",
              sourceCode: `import * as React from "react";
              export interface PageWrapperProps {
                child: React.ReactNode;
              }
              
              export const PageWrapper = (props: PageWrapperProps) => {
                return <div>{props.child}</div>;
              };`,
            },
          ],
          parameters: [
            {
              name: "child",
              value: {
                type: "component",
                value: {
                  id: "verticalLayout",
                  files: [verticalLayoutFile],
                  parameters: [
                    {
                      name: "children",
                      value: {
                        type: "componentList",
                        value: [
                          componentWithFiles({
                            id: "heroSectionComponent",
                            name: "heroSection",
                            files: [
                              {
                                pathname: "/index.tsx",
                                sourceCode: `import * as React from "react";
                            export interface EmptyWrapperProps {
                              child: React.ReactNode;
                            }
      
                            export const EmptyWrapper = (props: EmptyWrapperProps) => {
                              return <div>{props.child}</div>;
                            };`,
                              },
                            ],
                            parameters: [
                              {
                                name: "child",
                                value: {
                                  type: "component",
                                  value: componentWithFiles({
                                    id: "mainContainer",
                                    files: [mainContainerFile],
                                    parameters: [
                                      {
                                        name: "child",
                                        value: {
                                          type: "component",
                                          value: componentWithFiles({
                                            id: "horizontalLayout",
                                            files: [horizontalLayoutFile],
                                            parameters: [
                                              {
                                                name: "children",
                                                value: {
                                                  type: "componentList",
                                                  value: [
                                                    componentWithFiles({
                                                      id: "verticalLayout",
                                                      files: [
                                                        verticalLayoutFile,
                                                      ],
                                                      parameters: [
                                                        {
                                                          name: "children",
                                                          value: {
                                                            type: "componentList",
                                                            value: [
                                                              {
                                                                id: "textComponent",
                                                                files: [
                                                                  textComponentFile,
                                                                ],
                                                                parameters: [
                                                                  {
                                                                    name: "text",
                                                                    value: {
                                                                      type: "data",
                                                                      value: {
                                                                        isList:
                                                                          false,
                                                                        dataModelId:
                                                                          "titleId",
                                                                        informationId:
                                                                          "titleId",
                                                                      },
                                                                    },
                                                                  },
                                                                ],
                                                              },
                                                              {
                                                                id: "textComponent",
                                                                files: [
                                                                  textComponentFile,
                                                                ],
                                                                parameters: [
                                                                  {
                                                                    name: "text",
                                                                    value: {
                                                                      type: "data",
                                                                      value: {
                                                                        isList:
                                                                          false,
                                                                        dataModelId:
                                                                          "descriptionId",
                                                                        informationId:
                                                                          "descriptionId",
                                                                      },
                                                                    },
                                                                  },
                                                                ],
                                                              },
                                                            ],
                                                          },
                                                        },
                                                      ],
                                                    }),
                                                    componentWithFiles({
                                                      id: "imageComponent",
                                                      files: [
                                                        imageComponentFile,
                                                      ],
                                                      parameters: [
                                                        {
                                                          name: "src",
                                                          value: {
                                                            type: "data",
                                                            value: {
                                                              dataModelId:
                                                                "photoId",
                                                              informationId:
                                                                "photoId",
                                                              isList: false,
                                                            },
                                                          },
                                                        },
                                                      ],
                                                    }),
                                                  ],
                                                },
                                              },
                                            ],
                                          }),
                                        },
                                      },
                                    ],
                                  }),
                                },
                              },
                            ],
                          }),
                          componentWithFiles({
                            id: "shoesSectionComponent",
                            name: "shoesSection",
                            files: [
                              {
                                pathname: "/index.tsx",
                                sourceCode: `import * as React from "react";
                          export interface EmptyWrapperProps {
                            child: React.ReactNode;
                          }
                          
                          export const EmptyWrapper = (props: EmptyWrapperProps) => {
                            return <div>{props.child}</div>
                          };`,
                              },
                            ],
                            parameters: [
                              {
                                name: "child",
                                value: {
                                  type: "component",
                                  value: {
                                    id: "mainContainer",
                                    files: [mainContainerFile],
                                    parameters: [
                                      {
                                        name: "child",
                                        value: {
                                          type: "component",
                                          value: {
                                            id: "shoesListComponent",
                                            contextualName: "shoesList",
                                            files: [
                                              {
                                                pathname: "/index.tsx",
                                                sourceCode: `import * as React from "react";
                                        export interface EmptyWrapperProps {
                                          builder: React.ReactNode;
                                          data: any[];
                                        }
                                        
                                        export const EmptyWrapper = (props: EmptyWrapperProps) => {
                                          return (
                                            <div>
                                              {props.data.map((value) => (
                                                <div>{props.builder}</div>
                                              ))}
                                            </div>
                                          );
                                        };`,
                                              },
                                            ],
                                            parameters: [
                                              {
                                                name: "builder",
                                                value: {
                                                  type: "component",
                                                  value: componentWithFiles({
                                                    id: "shoeComponent",
                                                    name: "shoeItem",
                                                    files: [
                                                      {
                                                        pathname: "/index.tsx",
                                                        sourceCode: `import * as React from "react";
                                                    export interface EmptyWrapperProps {
                                                      child: React.ReactNode;
                                                    }
                              
                                                    export const EmptyWrapper = (props: EmptyWrapperProps) => {
                                                      return <div>{props.child}</div>;
                                                    };`,
                                                      },
                                                    ],
                                                    parameters: [
                                                      {
                                                        name: "child",
                                                        value: {
                                                          type: "component",
                                                          value: {
                                                            id: "verticalLayout",
                                                            files: [
                                                              verticalLayoutFile,
                                                            ],
                                                            parameters: [
                                                              {
                                                                name: "children",
                                                                value: {
                                                                  type: "componentList",
                                                                  value: [
                                                                    {
                                                                      id: "textComponent",
                                                                      files: [
                                                                        textComponentFile,
                                                                      ],
                                                                      parameters:
                                                                        [
                                                                          {
                                                                            name: "text",
                                                                            value:
                                                                              {
                                                                                type: "data",
                                                                                value:
                                                                                  {
                                                                                    dataModelId:
                                                                                      "nameId",
                                                                                    informationId:
                                                                                      "nameId",
                                                                                    isList:
                                                                                      false,
                                                                                  },
                                                                              },
                                                                          },
                                                                        ],
                                                                    },
                                                                    {
                                                                      id: "textComponent",
                                                                      files: [
                                                                        textComponentFile,
                                                                      ],
                                                                      parameters:
                                                                        [
                                                                          {
                                                                            name: "text",
                                                                            value:
                                                                              {
                                                                                type: "data",
                                                                                value:
                                                                                  {
                                                                                    dataModelId:
                                                                                      "descriptionId",
                                                                                    informationId:
                                                                                      "descriptionId",
                                                                                    isList:
                                                                                      false,
                                                                                  },
                                                                              },
                                                                          },
                                                                        ],
                                                                    },
                                                                  ],
                                                                },
                                                              },
                                                            ],
                                                          },
                                                        },
                                                      },
                                                    ],
                                                  }),
                                                },
                                              },
                                              {
                                                name: "data",
                                                value: {
                                                  type: "data",
                                                  value: {
                                                    dataModelId: "listId",
                                                    informationId: "listId",
                                                    isList: true,
                                                  },
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      },
                                    ],
                                  },
                                },
                              },
                            ],
                          }),
                        ],
                      },
                    },
                  ],
                },
              },
            },
          ],
        }),
        componentWithFiles({
          id: "employeePageComponent",
          name: "employeePage",
          files: [
            {
              pathname: "/index.tsx",
              sourceCode: `import * as React from "react";
            export interface PageWrapperProps {
              child: React.ReactNode;
            }
            
            export const PageWrapper = (props: PageWrapperProps) => {
              return <div>{props.child}</div>;
            };`,
            },
          ],
          parameters: [
            {
              name: "child",
              value: {
                type: "component",
                value: componentWithFiles({
                  id: "verticalLayout",
                  files: [verticalLayoutFile],
                  parameters: [
                    {
                      name: "children",
                      value: {
                        type: "componentList",
                        value: [
                          {
                            id: "employeeSectionComponent",
                            contextualName: "employeeSection",
                            files: [
                              {
                                pathname: "/index.tsx",
                                sourceCode: `import * as React from "react";
                      export interface EmptyWrapperProps {
                        child: React.ReactNode;
                      }
                      
                      export const EmptyWrapper = (props: EmptyWrapperProps) => {
                        return <div>{props.child}</div>;
                      };`,
                              },
                            ],
                            parameters: [
                              {
                                name: "child",
                                value: {
                                  type: "component",
                                  value: {
                                    id: "mainContainer",
                                    files: [mainContainerFile],
                                    parameters: [
                                      {
                                        name: "child",
                                        value: {
                                          type: "component",
                                          value: {
                                            id: "verticalLayout",
                                            files: [verticalLayoutFile],
                                            parameters: [
                                              {
                                                name: "children",
                                                value: {
                                                  type: "componentList",
                                                  value: [
                                                    {
                                                      id: "employeeComponent",
                                                      contextualName:
                                                        "employee",
                                                      files: [
                                                        {
                                                          pathname:
                                                            "/index.tsx",
                                                          sourceCode: `import * as React from "react";
                                        export interface EmptyWrapperProps {
                                          child: React.ReactNode;
                                        }
                                        
                                        export const EmptyWrapper = (props: EmptyWrapperProps) => {
                                          return <div>{props.child}</div>;
                                        };`,
                                                        },
                                                      ],
                                                      parameters: [
                                                        {
                                                          name: "child",
                                                          value: {
                                                            type: "component",
                                                            value: {
                                                              id: "verticalLayout",
                                                              files: [
                                                                verticalLayoutFile,
                                                              ],
                                                              parameters: [
                                                                {
                                                                  name: "children",
                                                                  value: {
                                                                    type: "componentList",
                                                                    value: [
                                                                      {
                                                                        id: "textComponent",
                                                                        files: [
                                                                          textComponentFile,
                                                                        ],
                                                                        parameters:
                                                                          [
                                                                            {
                                                                              name: "text",
                                                                              value:
                                                                                {
                                                                                  type: "data",
                                                                                  value:
                                                                                    {
                                                                                      dataModelId:
                                                                                        "emplNameId",
                                                                                      informationId:
                                                                                        "emplNameId",
                                                                                      isList:
                                                                                        false,
                                                                                    },
                                                                                },
                                                                            },
                                                                          ],
                                                                      },
                                                                      {
                                                                        id: "textComponent",
                                                                        files: [
                                                                          textComponentFile,
                                                                        ],
                                                                        parameters:
                                                                          [
                                                                            {
                                                                              name: "text",
                                                                              value:
                                                                                {
                                                                                  type: "data",
                                                                                  value:
                                                                                    {
                                                                                      dataModelId:
                                                                                        "emplSurnameId",
                                                                                      informationId:
                                                                                        "emplSurnameId",
                                                                                      isList:
                                                                                        false,
                                                                                    },
                                                                                },
                                                                            },
                                                                          ],
                                                                      },
                                                                      {
                                                                        id: "employeeInfoComponent",
                                                                        contextualName:
                                                                          "employeeInfo",
                                                                        files: [
                                                                          {
                                                                            pathname:
                                                                              "/index.tsx",
                                                                            sourceCode: `import * as React from "react";
                                                  export interface EmptyWrapperProps {
                                                    child: React.ReactNode;
                                                  }
                                                  
                                                  export const EmptyWrapper = (props: EmptyWrapperProps) => {
                                                    return <div>{props.child}</div>;
                                                  };`,
                                                                          },
                                                                        ],
                                                                        parameters:
                                                                          [
                                                                            {
                                                                              name: "child",
                                                                              value:
                                                                                {
                                                                                  type: "component",
                                                                                  value:
                                                                                    {
                                                                                      id: "verticalLayout",
                                                                                      files:
                                                                                        [
                                                                                          verticalLayoutFile,
                                                                                        ],
                                                                                      parameters:
                                                                                        [
                                                                                          {
                                                                                            name: "children",
                                                                                            value:
                                                                                              {
                                                                                                type: "componentList",
                                                                                                value:
                                                                                                  [
                                                                                                    {
                                                                                                      id: "textComponent",
                                                                                                      files:
                                                                                                        [
                                                                                                          textComponentFile,
                                                                                                        ],
                                                                                                      parameters:
                                                                                                        [
                                                                                                          {
                                                                                                            name: "text",
                                                                                                            value:
                                                                                                              {
                                                                                                                type: "data",
                                                                                                                value:
                                                                                                                  {
                                                                                                                    dataModelId:
                                                                                                                      "emplBirthdayId",
                                                                                                                    informationId:
                                                                                                                      "emplBirthdayId",
                                                                                                                    isList:
                                                                                                                      false,
                                                                                                                  },
                                                                                                              },
                                                                                                          },
                                                                                                        ],
                                                                                                    },
                                                                                                    {
                                                                                                      id: "textComponent",
                                                                                                      files:
                                                                                                        [
                                                                                                          textComponentFile,
                                                                                                        ],
                                                                                                      parameters:
                                                                                                        [
                                                                                                          {
                                                                                                            name: "text",
                                                                                                            value:
                                                                                                              {
                                                                                                                type: "data",
                                                                                                                value:
                                                                                                                  {
                                                                                                                    dataModelId:
                                                                                                                      "emplBirthplaceId",
                                                                                                                    informationId:
                                                                                                                      "emplBirthplaceId",
                                                                                                                    isList:
                                                                                                                      false,
                                                                                                                  },
                                                                                                              },
                                                                                                          },
                                                                                                        ],
                                                                                                    },
                                                                                                  ],
                                                                                              },
                                                                                          },
                                                                                        ],
                                                                                    },
                                                                                },
                                                                            },
                                                                          ],
                                                                      },
                                                                    ],
                                                                  },
                                                                },
                                                              ],
                                                            },
                                                          },
                                                        },
                                                      ],
                                                    },
                                                  ],
                                                },
                                              },
                                            ],
                                          },
                                        },
                                      },
                                    ],
                                  },
                                },
                              },
                            ],
                          },
                        ],
                      },
                    },
                  ],
                }),
              },
            },
          ],
        }),
      ],
      libraryComponentFiles: [],
      librarySharedFiles: [],
    };

    when(mockIntegrationRepo.get(input.digitalProductId)).thenResolve(data);

    const nextProject = await new GenerateFEProject(integrationRepo).execute(
      input
    );

    expect(nextProject.getFile("/pages/index.tsx")).toBeDefined();
    expect(
      nextProject.getFile("/pages/index.tsx")
        .hasSourceCode(`import { GetStaticProps } from "next";
      import React from "react";
      import { NextPageState } from "../lib/nextPageState.ts";
      import { HomePageRepo, HomePageRepoData } from "../lib/repos/homePageRepo.ts";
      import { DesignTokens } from "../styles/designTokens.tsx";
      import { HomePage as HomePageComponent } from "../components/homePage/index.tsx";
      
      export interface HomePageProps {
        repoData: HomePageRepoData;
      }
      
      export const HomePageContext = React.createContext(new NextPageState({}));
      
      export default function HomePage(props: HomePageProps) {
        return <HomePageContext.Provider value={new NextPageState(props.repoData)}>
        <DesignTokens>
        <HomePageComponent>
        </HomePageComponent>
        </DesignTokens>
        </HomePageContext.Provider>;
      }
      
      export const getStaticProps: GetStaticProps = async (context) => {
        return {
          props:{ repoData: await new HomePageRepo().getPage()},
          revalidate: 60,
        };
      }; `)
    ).toBeTruthy();

    expect(nextProject.getFile("/pages/employeePage.tsx")).toBeDefined();
    expect(
      nextProject.getFile("/pages/employeePage.tsx").hasSourceCode(
        `import { GetStaticProps } from "next";
      import React from "react";
      import { NextPageState } from "../lib/nextPageState.ts";
      import { EmployeePageRepo, EmployeePageRepoData } from "../lib/repos/employeePageRepo.ts";
      import { DesignTokens } from "../styles/designTokens.tsx";
      import { EmployeePage as EmployeePageComponent } from "../components/employeePage/index.tsx";
      
      export interface EmployeePageProps {
        repoData: EmployeePageRepoData;
      }
      
      export const EmployeePageContext = React.createContext(new NextPageState({}));
      
      export default function EmployeePage(props: EmployeePageProps) {
        return <EmployeePageContext.Provider value={new NextPageState(props.repoData)}>
        <DesignTokens>
        <EmployeePageComponent>
        </EmployeePageComponent>
        </DesignTokens>
        </EmployeePageContext.Provider>;
      }
      
      export const getStaticProps: GetStaticProps = async (context) => {
        return {
          props:{ repoData: await new EmployeePageRepo().getPage()},
          revalidate: 60,
        };
      }; `
      )
    ).toBeTruthy();

    expect(nextProject.getFile("/components/homePage/index.tsx")).toBeDefined();
    expect(
      nextProject.getFile("/components/homePage/index.tsx").hasSourceCode(
        `import * as React from "react";
        import { VerticalLayoutProps, VerticalLayout } from "components/shared/verticalLayout/index.tsx";
        import { HeroSectionProps, HeroSection } from "components/homePage/heroSection/index.tsx";
        import { ShoesSectionProps, ShoesSection } from "components/homePage/shoesSection/index.tsx";
          
        export interface HomePageProps {}
          
        export const HomePage = (props: HomePageProps) => { 
          return ( 
            <div>
            <VerticalLayout>
            <HeroSection></HeroSection>
            <ShoesSection></ShoesSection>
            </VerticalLayout>
            </div>
            );
          };`
      )
    ).toBeTruthy();

    expect(
      nextProject.getFile("/components/homePage/heroSection/index.tsx")
    ).toBeDefined();
    // TODO: Non importa next page state e page context
    /* expect(
      nextProject
        .getFile("/components/homePage/heroSection/index.tsx")
        .hasSourceCode(
          `import * as React from "react";
          import { MainContainerProps, MainContainer } from "components/shared/mainContainer/index.tsx";
          import { HorizontalLayouttProps, HorizontalLayout } from "components/shared/horizontalLayout/index.tsx";
          import { VerticalLayoutProps, VerticalLayout } from "components/shared/verticalLayout/index.tsx";
          import { TextComponentProps, TextComponent } from "components/shared/textComponent/index.tsx";
          import { ImageComponentProps, ImageComponent } from "components/shared/imageComponent/index.tsx";
          import { PageContext } from 'lib/pageContext.ts';
          import { NextPageState } from 'lib/nextPageState.ts';

          export interface HeroSectionProps {}

          export const HeroSection = (props: HeroSectionProps) => { 
          return ( 
            <div>
            <MainContainer>
            <HorizontalLayout>
            <VerticalLayout>
            <TextComponent text={React.useContext<NextPageState>(PageContext).get(
              "titleId"
            )}></TextComponent>
            <TextComponent text={React.useContext<NextPageState>(PageContext).get(
              "descriptionId"
            )}></TextComponent>
            </VerticalLayout>
            <ImageComponent  src={React.useContext<NextPageState>(PageContext).get("photoId")}></ImageComponent>
            </HorizontalLayout>
            </MainContainer>
            </div>
            );
          };
          `
        )
    ).toBeTruthy(); */

    expect(
      nextProject.getFile("/components/homePage/shoesSection/index.tsx")
    ).toBeDefined();
    // TODO: Non importa next page state e page context
    /* expect(
      nextProject
        .getFile("/components/homePage/shoesSection/index.tsx")
        .hasSourceCode(
          `import * as React from "react";
      import { MainContainerProps, MainContainer } from "components/shared/mainContainer/index.tsx";
      import { ShoesListProps, ShoesList } from "components/homePage/shoesSection/shoesList/index.tsx";
      import { PageContext } from 'lib/pageContext.ts';
      import { NextPageState } from 'lib/nextPageState.ts';

      export interface ShoesSectionProps {}

      export const ShoesSection = (props: ShoesSectionProps) => { 
      return ( 
        <div>
        <MainContainer>
        <ShoesList data={React.useContext<NextPageState>(PageContext).get(
          "listId"
        )}></ShoesList>
        </MainContainer>
        </div>
        );
      };
      `
        )
    ); */

    expect(
      nextProject.getFile(
        "/components/homePage/shoesSection/shoesList/index.tsx"
      )
    ).toBeDefined();
    expect(
      nextProject.getFile(
        "/components/homePage/shoesSection/shoesList/index.tsx"
      ).hasSourceCode(`import * as React from "react";
        import { ShoeItemProps, ShoeItem } from "components/homePage/shoesSection/shoesList/shoeItem/index.tsx";
        import { PageContext } from 'lib/pageContext.ts';
        import { NextPageState } from 'lib/nextPageState.ts';
  
        export interface ShoesListProps {
          data: any[];
        }
  
        export const ShoesList = (props: ShoesListProps) => { 
        return ( 
          <div>
          {props.data.map((value) => (
            <PageContext.Provider value={new NextPageState(value)}>
            <div>
            <ShoeItem></ShoeItem>
            </div>
            </PageContext.Provider>
          ))}
          </div>
          );
        };`)
    ).toBeTruthy();

    expect(
      nextProject.getFile(
        "/components/homePage/shoesSection/shoesList/shoeItem/index.tsx"
      )
    ).toBeDefined();
    // TODO: Non importa next page state e page context
    // TODO: Importa due volte il text component
    /* expect(
      nextProject
        .getFile(
          "/components/homePage/shoesSection/shoesList/shoeItem/index.tsx"
        )
        .hasSourceCode(
          `import * as React from "react";
        import { VerticalLayoutProps, VerticalLayout } from "components/shared/verticalLayout/index.tsx";
        import { TextComponentProps, TextComponent } from "components/shared/textComponent/index.tsx";
        import { PageContext } from 'lib/pageContext.ts';
        import { NextPageState } from 'lib/nextPageState.ts';
  
        export interface ShoeItemProps {}
  
        export const ShoeItem = (props: ShoeItemProps) => { 
        return ( 
          <div>
          <VerticalLayout>
          <TextComponent text={React.useContext<NextPageState>(PageContext).get(
            "nameId"
          )}>
          </TextComponent>
          <TextComponent text={React.useContext<NextPageState>(PageContext).get(
            "descriptionId"
          )}>
          </TextComponent>
          </VerticalLayout>
          </div>
          );
        };
        `
        )
    ).toBeTruthy(); */

    expect(
      nextProject.getFile("/components/employeePage/index.tsx")
    ).toBeDefined();
    expect(
      nextProject.getFile("/components/employeePage/index.tsx")
        .hasSourceCode(`import * as React from "react";
        import { VerticalLayoutProps, VerticalLayout } from "components/shared/verticalLayout/index.tsx";
        import { EmployeeSectionProps, EmployeeSection } from "components/employeePage/employeeSection/index.tsx";
          
        export interface EmployeePageProps {}
          
        export const EmployeePage = (props: EmployeePageProps) => { 
          return ( 
            <div>
            <VerticalLayout>
            <EmployeeSection></EmployeeSection>
            </VerticalLayout>
            </div>
            );
          };`)
    ).toBeTruthy();

    expect(
      nextProject.getFile("/components/employeePage/employeeSection/index.tsx")
    ).toBeDefined();
    // TODO: Non importa il contextual component Employee
    /* expect(
      nextProject
        .getFile("/components/employeePage/employeeSection/index.tsx")
        .hasSourceCode(
          `import * as React from "react";
        import { MainContainerProps, MainContainer } from "components/shared/mainContainer/index.tsx";
        import { VerticalLayoutProps, VerticalLayout } from "components/shared/verticalLayout/index.tsx";
        import { EmployeeProps, Employee } from "components/employeePage/employeeSection/employee/index.tsx";

        export interface EmployeeSectionProps {}

        export const EmployeeSection = (props: EmployeeSectionProps) => { 
        return ( 
          <div>
          <MainContainer>
          <VerticalLayout>
          <Employee></Employee>
          </VerticalLayout>
          </MainContainer>
          </div>
          );
        };`
        )
    ).toBeTruthy(); */

    expect(
      nextProject.getFile(
        "/components/employeePage/employeeSection/employee/index.tsx"
      )
    ).toBeDefined();
    // TODO: Non importa stato e context
    // TODO: Importa due volte text component
    /* expect(
      nextProject.getFile(
        "/components/employeePage/employeeSection/employee/index.tsx"
      ).hasSourceCode(`import * as React from "react";
        import { VerticalLayoutProps, VerticalLayout } from "components/shared/verticalLayout/index.tsx";
        import { TextComponentProps, TextComponent } from "components/shared/textComponent/index.tsx";
        import { EmployeeInfoProps, EmployeeInfo } from "components/employeePage/employeeSection/employee/employeeInfo/index.tsx";
        import { PageContext } from 'lib/pageContext.ts';
        import { NextPageState } from 'lib/nextPageState.ts';

        export interface EmployeeProps {}

        export const Employee = (props: EmployeeProps) => { 
        return ( 
          <div>
          <VerticalLayout>
          <TextComponent text={React.useContext<NextPageState>(PageContext).get(
          "emplNameId"
        )}></TextComponent>
          <TextComponent
          text={React.useContext<NextPageState>(PageContext).get(
            "emplSurnameId"
          )}></TextComponent>
          <EmployeeInfo></EmployeeInfo>
          </VerticalLayout>
          </div>
          );
        };`)
    ).toBeTruthy(); */

    expect(
      nextProject.getFile(
        "/components/employeePage/employeeSection/employee/employeeInfo/index.tsx"
      )
    ).toBeDefined();
    // TODO: Non importa stato e context
    // TODO: Importa due volte text component
    /* expect(
      nextProject.getFile(
        "/components/employeePage/employeeSection/employee/employeeInfo/index.tsx"
      ).hasSourceCode(`import * as React from "react";
        import { VerticalLayoutProps, VerticalLayout } from "components/shared/verticalLayout/index.tsx";
        import { TextComponentProps, TextComponent } from "components/shared/textComponent/index.tsx";
        import { PageContext } from 'lib/pageContext.ts';
        import { NextPageState } from 'lib/nextPageState.ts';

        export interface EmployeeInfoProps {}

        export const EmployeeInfo = (props: EmployeeInfoProps) => { 
        return ( 
          <div>
          <VerticalLayout>
          <TextComponent text={React.useContext<NextPageState>(PageContext).get(
          "emplBirthdayId"
        )}></TextComponent>
          <TextComponent
          text={React.useContext<NextPageState>(PageContext).get(
            "emplBirthplaceId"
          )}></TextComponent>
          </VerticalLayout>
          </div>
          );
        };`)
    ).toBeTruthy(); */

    expect(nextProject.getFile("/lib/repos/homePageRepo.ts")).toBeDefined();
    expect(
      nextProject.getFile("/lib/repos/homePageRepo.ts").hasSourceCode(
        `export class HomePageRepo {
        async getPage(): Promise<HomePageRepoData> {
          const data: HomePageRepoData = {
            heroSection: {
              title: \`hero title\`,
              subtitle: \`hero subtitle bla bla bla\`,
              photo: \`http://google.com\`
            },
            shoesSection: {
              shoesList: [
                {
                  name: \`shoe 1 name\`,
                  description: \`shoe 1 description bla bla bla bla bla bla bla\`,
                },
                {
                  name: \`shoe 2 name\`,
                  description: \`shoe 2 description bla bla bla bla bla bla bla\`,
                }
              ]
            }
          };
          return data;
        }
      }
      
      export interface HomePageRepoData {
        heroSection: {
          title: string;
          subtitle: string;
          photo: string
        },
        shoesSection: {
          shoesList: {
            name: string;
            description: string;
          }[]
        }
      }`
      )
    ).toBeTruthy();

    expect(nextProject.getFile("/lib/repos/employeePageRepo.ts")).toBeDefined();
    expect(
      nextProject.getFile("/lib/repos/employeePageRepo.ts")
        .hasSourceCode(`export class EmployeePageRepo {
      async getPage(): Promise<EmployeePageRepoData> {
        const data: EmployeePageRepoData = {
          employeeSection: {
            employee: {
              name: \`Mario\`,
              surname: \`Rossi\`,
              info: {
                birthday: \`08/05/1980\`,
                birthplace: \`Dublin\`
              }
            }
          }
        };
        return data;
      }
    }
    
    export interface EmployeePageRepoData {
      employeeSection: {
        employee: {
          name: string;
          surname: string;
          info: {
            birthday: string;
            birthplace: string;
          }
        }
      }
    }`)
    ).toBeTruthy();
  });
});

function componentWithFiles(props: {
  name?: string;
  id?: string;
  files?: { pathname: string; sourceCode: string }[];
  parameters?: BaseComponentProps["parameters"];
}): ComponentProps {
  return {
    contextualName: props.name,
    id: props.id ?? "verticalLayout",
    files: props.files
      ? props.files.map((file) => ({
          pathname: file.pathname,
          sourceCode: file.sourceCode,
        }))
      : [
          {
            pathname: "/index.tsx",
            sourceCode: "",
          },
        ],
    parameters: props.parameters ?? [],
  };
}
