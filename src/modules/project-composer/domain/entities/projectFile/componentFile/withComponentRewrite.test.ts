import { NextStateFile } from "./../nextStateFile/nextStateFile";
import { PageContextFile } from "../pageContextFile/pageContextFile";
import {
  ComponentFile,
  ContextualComponentFile,
  MainComponentFile,
} from "./componentFile";

describe("Should rewrite component", () => {
  test("Should rename component and props", () => {
    const component = new ContextualComponentFile({
      extraFiles: [],
      contextFile: new PageContextFile({}),
      stateFile: new NextStateFile({}),
      componentName: "HeroSection",
      content: `import * as React from "react";
      export interface EmptyWrapperProps {
        children: React.ReactNode[];
      }
      
      export const EmptyWrapper = (props: EmptyWrapperProps) => {
        return <div>{props.children}</div>;
      };`,
      fullPath: "/index.tsx",
      params: [
        {
          name: "children",
          param: {
            type: "componentList",
            value: [
              new MainComponentFile({
                fullPath: "/cA.tsx",
                componentName: "CA",
                content: ``,
                params: [],
                extraFiles: [],
              }),
            ],
          },
        },
      ],
    });

    expect(
      component.hasSourceCode(`
    export interface HeroSectionProps {}
      
    export const HeroSection = (props: HeroSectionProps) => {
        return <div><Ca></Ca></div>;
      };`)
    ).toBeTruthy();
  });
  test("Should remove param from props", () => {
    const component = new ContextualComponentFile({
      extraFiles: [],
      contextFile: new PageContextFile({}),
      stateFile: new NextStateFile({}),
      componentName: "VerticalLayout",
      content: `import * as React from "react";
      export interface VerticalLayoutProps {
        children: React.ReactNode[];
      }
      
      export const VerticalLayout = (props: VerticalLayoutProps) => {
        return <div>{props.children}</div>;
      };`,
      fullPath: "/index.tsx",
      params: [
        {
          name: "children",
          param: {
            type: "componentList",
            value: [
              new MainComponentFile({
                fullPath: "/cA.tsx",
                componentName: "CA",
                content: ``,
                params: [],
                extraFiles: [],
              }),
            ],
          },
        },
      ],
    });

    expect(
      component.hasSourceCode(`
    export interface VerticalLayoutProps {
      }`)
    ).toBeTruthy();
  });

  test("Should replace component list props from component body", () => {
    const component = new ContextualComponentFile({
      extraFiles: [],
      contextFile: new PageContextFile({}),
      stateFile: new NextStateFile({}),
      componentName: "VerticalLayout",
      content: `import * as React from "react";
      export interface VerticalLayoutProps {
        children: React.ReactNode[];
      }
      
      export const VerticalLayout = (props: VerticalLayoutProps) => {
        return <div>{props.children}</div>;
      };`,
      fullPath: "/index.tsx",
      params: [
        {
          name: "children",
          param: {
            type: "componentList",
            value: [
              new MainComponentFile({
                fullPath: "/componentA.tsx",
                componentName: "ComponentA",
                content: `
                export const ComponentA = (props: {}) => {
                    return <div></div>;
                  };`,
                params: [],
                extraFiles: [],
              }),
              new MainComponentFile({
                fullPath: "/componentB.tsx",
                componentName: "ComponentB",
                content: `
                export const ComponentB = (props: {}) => {
                    return <div></div>;
                  };`,
                params: [],
                extraFiles: [],
              }),
            ],
          },
        },
      ],
    });

    expect(
      component.hasSourceCode(`
      export const VerticalLayout = (props: VerticalLayoutProps) => {
        return <div><ComponentA></ComponentA><ComponentB></ComponentB></div>;
      };`)
    ).toBeTruthy();
  });

  test("Should replace component props from component body", () => {
    const component = new ContextualComponentFile({
      extraFiles: [],
      contextFile: new PageContextFile({}),
      stateFile: new NextStateFile({}),
      componentName: "VerticalLayout",
      content: `import * as React from "react";
      export interface VerticalLayoutProps {
        child: React.ReactNode;
      }

      export const VerticalLayout = (props: VerticalLayoutProps) => {
        return <div>{props.child}</div>;
      };`,
      fullPath: "/index.tsx",
      params: [
        {
          name: "child",
          param: {
            type: "component",
            value: new MainComponentFile({
              fullPath: "/componentA.tsx",
              componentName: "ComponentA",
              content: `
                export const ComponentA = (props: {}) => {
                    return <div></div>;
                  };`,
              params: [],
              extraFiles: [],
            }),
          },
        },
      ],
    });

    expect(
      component.hasSourceCode(`
      export const VerticalLayout = (props: VerticalLayoutProps) => {
        return <div><ComponentA></ComponentA></div>;
      };`)
    ).toBeTruthy();
  });

  test("Should replace dataList props from component body", () => {
    const component = new ContextualComponentFile({
      extraFiles: [],
      contextFile: new PageContextFile({}),
      stateFile: new NextStateFile({}),
      componentName: "VerticalLayout",
      content: `import * as React from "react";
      export interface VerticalLayoutProps {
        child: React.ReactNode
      }

      export const VerticalLayout = (props: VerticalLayoutProps) => {
        return <div>{props.data.map(value=><div>{props.child}</div>)}</div>;
      };`,
      fullPath: "/index.tsx",
      params: [
        {
          name: "child",
          param: {
            type: "component",
            value: new MainComponentFile({
              fullPath: "/componentA.tsx",
              componentName: "ComponentA",
              content: `
                export const ComponentA = (props: {}) => {
                    return <div></div>;
                  };`,
              params: [],
              extraFiles: [],
            }),
          },
        },
        {
          name: "data",
          param: {
            type: "data",
            value: {
              dataModelId: "#id1",
              infoId: "#id2",
              isList: true,
            },
          },
        },
      ],
    });

    expect(
      component.hasSourceCode(`
      export const VerticalLayout = (props: VerticalLayoutProps) => {
        return <div>{props.data.map(value=><PageContext.Provider value={new NextPageState(value)}><div><ComponentA></ComponentA></div></PageContext.Provider>)}</div>;
      };`)
    ).toBeTruthy();
  });
  test("Should add PageContext dependency to state and context when replacing dataList props", () => {
    const component = new ContextualComponentFile({
      extraFiles: [],
      contextFile: new PageContextFile({}),
      stateFile: new NextStateFile({}),
      componentName: "VerticalLayout",
      content: `import * as React from "react";
      export interface VerticalLayoutProps {
        child: React.ReactNode;
      }

      export const VerticalLayout = (props: VerticalLayoutProps) => {
        return <div>{props.data.map(value=><div>{props.child}</div>)}</div>;
      };`,
      fullPath: "/index.tsx",
      params: [
        {
          name: "child",
          param: {
            type: "component",
            value: new MainComponentFile({
              fullPath: "/componentA.tsx",
              componentName: "ComponentA",
              content: `
                export const ComponentA = (props: {}) => {
                    return <div></div>;
                  };`,
              params: [],
              extraFiles: [],
            }),
          },
        },
        {
          name: "data",
          param: {
            type: "data",
            value: {
              dataModelId: "#id1",
              infoId: "#id2",
              isList: true,
            },
          },
        },
      ],
    });

    expect(
      component.hasSourceCode(`
      import {PageContext} from 'lib/pageContext.ts';`)
    ).toBeTruthy();
  });
  test("Should add NextPageState dependency to state and context when replacing dataList props", () => {
    const component = new ContextualComponentFile({
      extraFiles: [],
      contextFile: new PageContextFile({}),
      stateFile: new NextStateFile({}),
      componentName: "VerticalLayout",
      content: `import * as React from "react";
      export interface VerticalLayoutProps {
        child: React.ReactNode;
      }

      export const VerticalLayout = (props: VerticalLayoutProps) => {
        return <div>{props.data.map(value=><div>{props.child}</div>)}</div>;
      };`,
      fullPath: "/index.tsx",
      params: [
        {
          name: "child",
          param: {
            type: "component",
            value: new MainComponentFile({
              fullPath: "/componentA.tsx",
              componentName: "ComponentA",
              content: `
                export const ComponentA = (props: {}) => {
                    return <div></div>;
                  };`,
              params: [],
              extraFiles: [],
            }),
          },
        },
        {
          name: "data",
          param: {
            type: "data",
            value: {
              dataModelId: "#id1",
              infoId: "#id2",
              isList: true,
            },
          },
        },
      ],
    });

    expect(
      component.hasSourceCode(`
      import {NextPageState} from 'lib/nextPageState.ts';`)
    ).toBeTruthy();
  });
});
