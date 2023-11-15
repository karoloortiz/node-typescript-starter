import { FEProject, FEProjectProps } from "../feProject/feProject";
import { nextComponentsMixin } from "./nextComponents";
import {
  BaseComponentProps,
  ComponentProps,
  NextComponentsProps,
} from "./nextComponentsProps";

const NextComponents = nextComponentsMixin(FEProject);

describe("Should create component files for nextJS project", () => {
  describe("Should create shared library files for components", () => {
    test("Should create lib/components/sharedFile.ts when a component source code imports /lib/shared/sharedFile.ts", () => {
      const props = createProps({
        libraryFiles: [
          {
            pathname: "/sharedFile.ts",
            sourceCode: `export class SharedFile{}`,
          },
        ],
        components: [
          componentWithFiles({
            name: "Home Page",
            files: [
              {
                pathname: "/index.ts",
                sourceCode: `import {SharedFile} from "../lib/shared/sharedFile.ts"`,
              },
            ],
          }),
        ],
      });

      const nextComponents = new NextComponents(props);

      expect(
        nextComponents
          .getFile("/lib/components/sharedFile.ts")
          .hasSourceCode(`export class SharedFile{}`)
      ).toBeTruthy();
    });

    test("Should create only one lib/components/sharedFile.ts when two component source code files imports /lib/shared/sharedFile.ts", () => {
      const props = createProps({
        libraryFiles: [
          {
            pathname: "/sharedFile.ts",
            sourceCode: `export class SharedFile{}`,
          },
        ],
        components: [
          componentWithFiles({
            name: "HomePage",
            files: [
              {
                pathname: "/index.ts",
                sourceCode: `import {SharedFile} from "../lib/shared/sharedFile.ts"`,
              },
              {
                pathname: "/variation.ts",
                sourceCode: `import {SharedFile} from "../lib/shared/sharedFile.ts"`,
              },
            ],
          }),
        ],
      });

      const nextComponents = new NextComponents(props);

      expect(
        nextComponents
          .getFile("/lib/components/sharedFile.ts")
          .hasSourceCode(`export class SharedFile{}`)
      ).toBeTruthy();
    });

    test("Should create only one lib/components/sharedFile.ts when two components import /lib/shared/sharedFile.ts", () => {
      const props = createProps({
        libraryFiles: [
          {
            pathname: "/sharedFile.ts",
            sourceCode: `export class SharedFile{}`,
          },
        ],
        components: [
          componentWithFiles({
            name: "pageB",
            files: [
              {
                pathname: "/index.ts",
                sourceCode: `import {SharedFile} from "../lib/shared/sharedFile.ts"`,
              },
            ],
          }),
          componentWithFiles({
            name: "pageA",
            files: [
              {
                pathname: "/index.ts",
                sourceCode: `import {SharedFile} from "../lib/shared/sharedFile.ts"`,
              },
            ],
          }),
        ],
      });

      const nextComponents = new NextComponents(props);

      expect(
        nextComponents
          .getFile("/lib/components/sharedFile.ts")
          .hasSourceCode(`export class SharedFile{}`)
      ).toBeTruthy();
    });
    test("Should't create library file when not used inside file", () => {
      const props = createProps({
        libraryFiles: [
          {
            pathname: "/sharedFile.ts",
            sourceCode: `export class SharedFile{}`,
          },
        ],
        components: [
          componentWithFiles({
            name: "pageB",
            files: [
              {
                pathname: "/index.ts",
                sourceCode: `console.log()`,
              },
            ],
          }),
        ],
      });

      const nextComponents = new NextComponents(props);

      expect(() =>
        nextComponents.getFile("/lib/components/sharedFile.ts")
      ).toThrow();
    });
    test("Should change import statement for component with reference to library file", () => {
      const props = createProps({
        libraryFiles: [
          {
            pathname: "/sharedFileA.ts",
            sourceCode: `export class SharedFileA{}`,
          },
          {
            pathname: "/sharedFileB.ts",
            sourceCode: `import {SharedFileA} from "./sharedFileA.ts";
            export class SharedFileB{}`,
          },
        ],
        components: [
          componentWithFiles({
            name: "HomePage",
            files: [
              {
                pathname: "/index.tsx",
                sourceCode: `import {SharedFileB} from "../lib/shared/sharedFileB.ts"`,
              },
            ],
          }),
        ],
      });

      const nextComponents = new NextComponents(props);

      expect(
        nextComponents
          .getFile("/lib/components/sharedFileB.ts")
          .hasSourceCode(
            `import {SharedFileA} from "lib/components/sharedFileA.ts"`
          )
      ).toBeTruthy();
    });
  });

  describe("Should create contextual components", () => {
    describe("Should create page components", () => {
      test("Should create page component file inside /components/pageFolder", () => {
        const props = createProps({
          libraryFiles: [],
          components: [
            componentWithFiles({
              name: "HomePage",
              files: [
                {
                  pathname: "/index.tsx",
                  sourceCode: `console.log("I'm the home page")`,
                },
              ],
            }),
          ],
        });

        const nextComponents = new NextComponents(props);

        expect(
          nextComponents
            .getFile("/components/homePage/index.tsx")
            .hasSourceCode(`console.log("I'm the home page")`)
        ).toBeTruthy();
      });

      test("Should create all page component files inside /components/pageFolder", () => {
        const props = createProps({
          libraryFiles: [],
          components: [
            componentWithFiles({
              name: "HomePage",
              files: [
                {
                  pathname: "/index.tsx",
                  sourceCode: `console.log("I'm the home page")`,
                },
                {
                  pathname: "/ciao.tsx",
                  sourceCode: `console.log("I'm the ciao page")`,
                },
              ],
            }),
          ],
        });

        const nextComponents = new NextComponents(props);

        expect(
          nextComponents.getFile("/components/homePage/index.tsx")
        ).toBeTruthy();
        expect(
          nextComponents.getFile("/components/homePage/ciao.tsx")
        ).toBeTruthy();
      });

      test("Should create page components folders and files", () => {
        const props = createProps({
          libraryFiles: [],
          components: [
            componentWithFiles({
              name: "HomePage",
              files: [
                {
                  pathname: "/index.tsx",
                  sourceCode: `console.log("I'm the home page")`,
                },
              ],
            }),
            componentWithFiles({
              name: "AboutUs",
              files: [
                {
                  pathname: "/index.tsx",
                  sourceCode: `console.log("I'm the about us page")`,
                },
              ],
            }),
          ],
        });

        const nextComponents = new NextComponents(props);

        expect(
          nextComponents.getFile("/components/homePage/index.tsx")
        ).toBeTruthy();
        expect(
          nextComponents.getFile("/components/aboutUs/index.tsx")
        ).toBeTruthy();
      });
    });

    describe("Should create components from page params", () => {
      test("Should create files for single component param", () => {
        const props = createProps({
          libraryFiles: [],
          components: [
            componentWithFiles({
              name: "HomePage",
              parameters: [
                {
                  name: "children",
                  value: {
                    type: "component",
                    value: componentWithFiles({
                      id: "horizontalLayout",
                      name: "HeroSection",
                      files: [
                        {
                          pathname: "/index.tsx",
                          sourceCode: "console.log('child component')",
                        },
                      ],
                    }),
                  },
                },
              ],
            }),
          ],
        });

        const nextComponents = new NextComponents(props);

        expect(
          nextComponents
            .getFile("/components/homePage/heroSection/index.tsx")
            .hasSourceCode(`console.log('child component')`)
        ).toBeTruthy();
      });

      test("Should create files for list component param", () => {
        const props = createProps({
          libraryFiles: [],
          components: [
            componentWithFiles({
              name: "HomePage",
              files: [
                {
                  pathname: "/index.tsx",
                  sourceCode: "console.log('child component')",
                },
              ],
              parameters: [
                {
                  name: "children",
                  value: {
                    type: "componentList",
                    value: [
                      componentWithFiles({
                        id: "horizontalLayout",
                        name: "HeroSection",
                        files: [
                          {
                            pathname: "/index.tsx",
                            sourceCode: "console.log('child component')",
                          },
                        ],
                      }),
                      componentWithFiles({
                        id: "horizontalLayout",
                        name: "FeaturesSection",
                        files: [
                          {
                            pathname: "/index.tsx",
                            sourceCode: "console.log('child component')",
                          },
                        ],
                      }),
                    ],
                  },
                },
              ],
            }),
          ],
        });

        const nextComponents = new NextComponents(props);

        expect(
          nextComponents.getFile("/components/homePage/heroSection/index.tsx")
        ).toBeDefined();
        expect(
          nextComponents.getFile(
            "/components/homePage/featuresSection/index.tsx"
          )
        ).toBeDefined();
      });

      test("Should create files for nested component param", () => {
        const props = createProps({
          libraryFiles: [],
          components: [
            componentWithFiles({
              name: "HomePage",
              files: [
                {
                  pathname: "/index.tsx",
                  sourceCode: "console.log('child component')",
                },
              ],
              parameters: [
                {
                  name: "child",
                  value: {
                    type: "component",
                    value: componentWithFiles({
                      id: "horizontalLayout",
                      name: "HeroSection",
                      files: [
                        {
                          pathname: "/index.tsx",
                          sourceCode: "console.log('child component')",
                        },
                      ],
                      parameters: [
                        {
                          name: "child",
                          value: {
                            type: "component",
                            value: componentWithFiles({
                              id: "verticalLayout",
                              name: "Borsa",
                              files: [
                                {
                                  pathname: "/index.tsx",
                                  sourceCode:
                                    "console.log('child component Borsa')",
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
          ],
        });

        const nextComponents = new NextComponents(props);

        expect(
          nextComponents
            .getFile("/components/homePage/heroSection/borsa/index.tsx")
            .hasSourceCode(`console.log('child component Borsa')`)
        ).toBeTruthy();
      });
    });
  });

  describe("Should create shared components for non contextual components", () => {
    test("Should create shared components based on component files imports", () => {});
    test("Should create shared components from components with only data parameter and no component parameters", () => {
      const props = createProps({
        libraryFiles: [],
        components: [
          componentWithFiles({
            name: "HomePage",
            parameters: [
              {
                name: "text",
                value: {
                  type: "component",
                  value: componentWithFiles({
                    id: "textComponent",
                    files: [
                      {
                        pathname: "/index.tsx",
                        sourceCode: "console.log('text component')",
                      },
                    ],
                    parameters: [
                      {
                        name: "text",
                        value: {
                          type: "data",
                          value: {
                            dataModelId: "#id",
                            informationId: "#id",
                            isList: false,
                          },
                        },
                      },
                    ],
                  }),
                },
              },
            ],
          }),
        ],
      });

      const nextComponents = new NextComponents(props);

      expect(
        nextComponents
          .getFile("/components/shared/textComponent/index.tsx")
          .hasSourceCode(`console.log('text component')`)
      ).toBeTruthy();
    });

    test("Should create shared components from components with no contextualName", () => {
      const props = createProps({
        libraryFiles: [],
        libraryComponentFiles: [
          {
            id: "mainContainer",
            files: [
              {
                pathname: "/index.tsx",
                sourceCode: `console.log("main container")`,
              },
            ],
          },
        ],
        components: [
          componentWithFiles({
            name: "HomePage",
            parameters: [
              {
                name: "children",
                value: {
                  type: "componentList",
                  value: [
                    componentWithFiles({
                      id: "horizontalComponent",
                      name: "heroSection",
                      parameters: [
                        {
                          name: "child",
                          value: {
                            type: "component",
                            value: componentWithFiles({
                              id: "mainContainer",
                              files: [
                                {
                                  pathname: "/index.tsx",
                                  sourceCode: `console.log("main container")`,
                                },
                              ],
                            }),
                          },
                        },
                      ],
                    }),
                  ],
                },
              },
            ],
          }),
        ],
      });

      const nextComponents = new NextComponents(props);

      expect(
        nextComponents
          .getFile("/components/shared/mainContainer/index.tsx")
          .hasSourceCode(`console.log("main container")`)
      ).toBeTruthy();
    });
  });
  describe("Should rewrite contextual components source code", () => {
    test("Should rewrite contextual components name", () => {
      const props = createProps({
        libraryFiles: [],
        components: [
          componentWithFiles({
            name: "HeroSection",
            files: [
              {
                pathname: "/index.tsx",
                sourceCode: `import * as React from "react";
            export interface EmptyWrapperProps {
              child: React.ReactNode;
            }
            
            export const EmptyWrapper = (props: EmptyWrapperProps) => {
              return <div>{props.child}</div>;
            };
            `,
              },
            ],
            parameters: [
              {
                name: "child",
                value: {
                  type: "component",
                  value: componentWithFiles({
                    id: "mainContainer",
                  }),
                },
              },
            ],
          }),
        ],
      });

      const nextComponents = new NextComponents(props);

      expect(
        nextComponents.getFile("/components/heroSection/index.tsx")
          .hasSourceCode(`
        import * as React from "react";
        import 'components/shared/mainContainer/index.tsx';


          export interface HeroSectionProps {
          }
          
          export const HeroSection = (props: HeroSectionProps) => {
            return <div><MainContainer></MainContainer></div>;
          };
          `)
      ).toBeTruthy();
    });
    test("Should rewrite component source code that has a componentList parameter", () => {
      const props = createProps({
        libraryFiles: [],
        components: [
          componentWithFiles({
            name: "HomePage",
            files: [
              {
                pathname: "/index.tsx",
                sourceCode: `import * as React from "react";
            export interface HomePageProps {
              children: React.ReactNode[];
            }
            
            export const HomePage = (props: Props) => {
              return <div>{props.children}</div>;
            };
            `,
              },
            ],
            parameters: [
              {
                name: "children",
                value: {
                  type: "componentList",
                  value: [
                    componentWithFiles({
                      id: "textComponent",
                      files: [
                        {
                          pathname: "/index.tsx",
                          sourceCode: `export class TextComponent{}`,
                        },
                      ],
                    }),
                    componentWithFiles({
                      id: "mainContainer",
                    }),
                  ],
                },
              },
            ],
          }),
        ],
      });

      const nextComponents = new NextComponents(props);

      expect(
        nextComponents.getFile("/components/homePage/index.tsx").hasSourceCode(`
        import * as React from "react";
        import {TextComponent} from 'components/shared/textComponent/index.tsx';
        import 'components/shared/mainContainer/index.tsx';


          export interface HomePageProps {
          }
          
          export const HomePage = (props: HomePageProps) => {
            return <div><TextComponent></TextComponent><MainContainer></MainContainer></div>;
          };
          `)
      ).toBeTruthy();
    });

    test("Should rewrite component source code that has a component parameter", () => {
      const props = createProps({
        libraryFiles: [],
        components: [
          componentWithFiles({
            name: "HomePage",
            files: [
              {
                pathname: "/index.tsx",
                sourceCode: `import * as React from "react";
            export interface HomePageProps {
              child: React.ReactNode;
            }
            
            export const HomePage = (props: HomePageProps) => {
              return <div>{props.child}</div>;
            };
            `,
              },
            ],
            parameters: [
              {
                name: "child",
                value: {
                  type: "component",
                  value: componentWithFiles({
                    id: "textComponent",
                  }),
                },
              },
            ],
          }),
        ],
      });

      const nextComponents = new NextComponents(props);

      expect(
        nextComponents.getFile("/components/homePage/index.tsx").hasSourceCode(`
          export interface HomePageProps {
          }
          
          export const HomePage = (props: HomePageProps) => {
            return <div><TextComponent></TextComponent></div>;
          };
          `)
      ).toBeTruthy();
    });

    test("Should create new data provider around data list component item", () => {
      const props = createProps({
        libraryFiles: [],
        components: [
          componentWithFiles({
            name: "HomePage",
            files: [
              {
                pathname: "/index.tsx",
                sourceCode: `import * as React from "react";
                export interface HomePageProps {
                  builder: React.ReactNode;
                  data: any[];
                }
                
                export const HomePage = (props: HomePageProps) => {
                  return (
                    <div>
                      {props.data.map((value) => (
                        <div>{props.builder}</div>
                      ))}
                    </div>
                  );
                };
                
            `,
              },
            ],
            parameters: [
              {
                name: "builder",
                value: {
                  type: "component",
                  value: componentWithFiles({
                    id: "textComponent",
                    files: [
                      {
                        pathname: "/index.tsx",
                        sourceCode: `export class TextComponent{}`,
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
                    dataModelId: "#id1",
                    informationId: "#id2",
                    isList: true,
                  },
                },
              },
            ],
          }),
        ],
      });

      const nextComponents = new NextComponents(props);

      expect(
        nextComponents.getFile("/components/homePage/index.tsx").hasSourceCode(`
        import * as React from "react";
        import {TextComponent} from 'components/shared/textComponent/index.tsx';
        import {PageContext} from 'lib/pageContext.ts'
        import {NextPageState} from 'lib/nextPageState.ts'
        export interface HomePageProps {
          data: any[];
        }

        export const HomePage = (props: HomePageProps) => {
          return (
            <div>
              {props.data.map((value) => (
                <PageContext.Provider value={new NextPageState(value)}>
                <div>
                    <TextComponent></TextComponent>
                </div>
                </PageContext.Provider>
              ))}
            </div>
          );
        };
         `)
      ).toBeTruthy();
    });
  });

  describe("Should call component with correct jsx attributes", () => {
    test("Should pass raw parameters to react component call instruction", () => {});

    test("Should pass only data attributes and raw attributes to contextual components", () => {
      const props = createProps({
        libraryFiles: [],
        components: [
          componentWithFiles({
            name: "HomePage",
            files: [
              {
                pathname: "/index.tsx",
                sourceCode: `
                import * as React from "react";

                export interface HomePageProps {
                  main: React.ReactElement;
                }
                
                export const HomePage = (props: HomePageProps) => {
                  return <div>{props.main}</div>;
                };
                `,
              },
            ],
            parameters: [
              {
                name: "main",
                value: {
                  type: "component",
                  value: componentWithFiles({
                    id: "mainComponent",
                    name: "mainComponent",
                    files: [
                      {
                        pathname: "/index.tsx",
                        sourceCode: `import * as React from "react";

                        export interface MainComponentProps {
                          child: React.ReactElement;
                        }
                        
                        export const MainComponent = (props: TextComponentProps) => {
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
                            id: "ChildA",
                            files: [
                              {
                                pathname: "/index.tsx",
                                sourceCode: `export const ChildA=(props:any)=>{
                              return <div></div>;
                            }`,
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
        ],
      });

      const nextComponents = new NextComponents(props);

      expect(
        nextComponents.getFile("/components/homePage/index.tsx").hasSourceCode(`
          export interface HomePageProps {}
          
          export const HomePage = (props: HomePageProps) => {
            return (
              <div>
                <MainComponent></MainComponent>
              </div>
            );
          };
          `)
      ).toBeTruthy();
    });

    test("Should pass data parameters to react component call instruction", () => {
      const props = createProps({
        libraryFiles: [],
        components: [
          componentWithFiles({
            name: "HomePage",
            files: [
              {
                pathname: "/index.tsx",
                sourceCode: `
                import * as React from "react";

                export interface HomePageProps {
                  text: React.ReactElement;
                }
                
                export const HomePage = (props: HomePageProps) => {
                  return <div>{props.text}</div>;
                };
                `,
              },
            ],
            parameters: [
              {
                name: "text",
                value: {
                  type: "component",
                  value: componentWithFiles({
                    id: "textComponent",
                    files: [
                      {
                        pathname: "/index.tsx",
                        sourceCode: `import * as React from "react";

                        export interface TextComponentProps {
                          text: string;
                        }
                        
                        export const TextComponent = (props: TextComponentProps) => {
                          return <div>{props.text}</div>;
                        };`,
                      },
                    ],
                    parameters: [
                      {
                        name: "text",
                        value: {
                          type: "data",
                          value: {
                            dataModelId: "#id1",
                            informationId: "#id1",
                            isList: false,
                          },
                        },
                      },
                    ],
                  }),
                },
              },
            ],
          }),
        ],
      });

      const nextComponents = new NextComponents(props);

      expect(
        nextComponents.getFile("/components/homePage/index.tsx").hasSourceCode(`
          import { PageContext } from "lib/pageContext.ts";
          import { NextPageState } from "lib/nextPageState.ts";
          
          export interface HomePageProps {}
          
          export const HomePage = (props: HomePageProps) => {
            return (
              <div>
                <TextComponent text={React.useContext<NextPageState>(PageContext).get("#id1")}></TextComponent>
              </div>
            );
          };
          `)
      ).toBeTruthy();
    });
    test("Should pass component parameters to shared react component call instruction", () => {
      const props = createProps({
        libraryFiles: [],
        components: [
          componentWithFiles({
            name: "HomePage",
            files: [
              {
                pathname: "/index.tsx",
                sourceCode: `
                import * as React from "react";

                export interface HomePageProps {
                  text: React.ReactElement;
                }
                
                export const HomePage = (props: HomePageProps) => {
                  return <div>{props.text}</div>;
                };
                `,
              },
            ],
            parameters: [
              {
                name: "text",
                value: {
                  type: "component",
                  value: componentWithFiles({
                    id: "textComponent",
                    files: [
                      {
                        pathname: "/index.tsx",
                        sourceCode: `import * as React from "react";

                        export interface TextComponentProps {
                          child: React.ReactElement;
                        }
                        
                        export const TextComponent = (props: TextComponentProps) => {
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
                            id: "ChildA",
                            files: [
                              {
                                pathname: "/index.tsx",
                                sourceCode: `export const ChildA=(props:any)=>{
                              return <div></div>;
                            }`,
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
        ],
      });

      const nextComponents = new NextComponents(props);

      expect(
        nextComponents.getFile("/components/homePage/index.tsx").hasSourceCode(`
        import {TextComponentProps, TextComponent } from "components/shared/textComponent/index.tsx"

          import { ChildA } from "components/shared/childA/index.tsx";

          export interface HomePageProps {}
          
          export const HomePage = (props: HomePageProps) => {
            return (
              <div>
                <TextComponent child={<ChildA></ChildA>}></TextComponent>
              </div>
            );
          };
          `)
      ).toBeTruthy();
    });

    test("Should pass component list parameters to shared react component call instruction", () => {
      const props = createProps({
        libraryFiles: [],
        components: [
          componentWithFiles({
            name: "HomePage",
            files: [
              {
                pathname: "/index.tsx",
                sourceCode: `
                import * as React from "react";

                export interface HomePageProps {
                  text: React.ReactElement;
                }
                
                export const HomePage = (props: HomePageProps) => {
                  return <div>{props.text}</div>;
                };
                `,
              },
            ],
            parameters: [
              {
                name: "text",
                value: {
                  type: "component",
                  value: componentWithFiles({
                    id: "textComponent",
                    files: [
                      {
                        pathname: "/index.tsx",
                        sourceCode: `import * as React from "react";

                        export interface TextComponentProps {
                          children: React.ReactElement[];
                        }
                        
                        export const TextComponent = (props: TextComponentProps) => {
                          return <div>{props.children}</div>;
                        };`,
                      },
                    ],
                    parameters: [
                      {
                        name: "children",
                        value: {
                          type: "componentList",
                          value: [
                            componentWithFiles({
                              id: "ChildA",
                              files: [
                                {
                                  pathname: "/index.tsx",
                                  sourceCode: `export const ChildA=(props:any)=>{
                              return <div></div>;
                            }`,
                                },
                              ],
                            }),
                            componentWithFiles({
                              id: "ChildB",
                              files: [
                                {
                                  pathname: "/index.tsx",
                                  sourceCode: `export const ChildB=(props:any)=>{
                              return <div></div>;
                            }`,
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
        ],
      });

      const nextComponents = new NextComponents(props);

      expect(
        nextComponents.getFile("/components/homePage/index.tsx").hasSourceCode(`
          import { ChildA } from "components/shared/childA/index.tsx";
          import { ChildB } from "components/shared/childB/index.tsx";


          export interface HomePageProps {}
          
          export const HomePage = (props: HomePageProps) => {
            return (
              <div>
                <TextComponent><ChildA></ChildA><ChildB></ChildB></TextComponent>
              </div>
            );
          };
          `)
      ).toBeTruthy();
    });

    test("Should update interface based on data type", () => {});

    test("Should resolve import for DesignTokens context", () => {});
    describe("Should test imports with local files", () => {});
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

function createProps(props: {
  libraryFiles?: NextComponentsProps["librarySharedFiles"];
  libraryComponentFiles?: NextComponentsProps["libraryComponentFiles"];
  components?: NextComponentsProps["pageComponents"];
}): NextComponentsProps & FEProjectProps {
  return {
    name: "website project",
    librarySharedFiles: props.libraryFiles ?? [],
    pageComponents: props.components ?? [],
    libraryComponentFiles: props.libraryComponentFiles ?? [],
  };
}
