import { MainComponentFile } from "./componentFile";
describe("Should create file with main content", () => {
  test("Should return jsx tag without attributes", () => {
    const file = new MainComponentFile({
      fullPath: "/index.ts",
      content: `export const Component=(props:{title:string})=>{
        return <div></div>
      }`,
      params: [],
      extraFiles: [],
      componentName: "Component",
    });

    expect(file.getFullJsxTag().jsxTag).toEqual(`<Component></Component>`);
  });
  test("Should return jsx tag with correct data parameter", () => {
    const file = new MainComponentFile({
      fullPath: "/index.ts",
      content: `export const Component=(props:{title:string})=>{
        return <div></div>
      }`,
      params: [
        {
          name: "title",
          param: {
            type: "data",
            value: {
              dataModelId: "#1",
              infoId: "#1",
              isList: false,
            },
          },
        },
      ],
      extraFiles: [],
      componentName: "Component",
    });

    expect(file.getFullJsxTag().jsxTag).toEqual(
      `<Component title={React.useContext<NextPageState>(PageContext).get("#1")}></Component>`
    );
  });
  test("Should return jsx tag with correct component parameter", () => {
    const file = new MainComponentFile({
      fullPath: "/index.ts",
      content: `export const Component=(props:{title:string})=>{
        return <div></div>
      }`,
      params: [
        {
          name: "title",
          param: {
            type: "component",
            value: new MainComponentFile({
              params: [],
              extraFiles: [],
              componentName: "ChildA",
              fullPath: "/index.ts",
              content: `export const ChildA=()=><div></div>`,
            }),
          },
        },
      ],
      extraFiles: [],
      componentName: "Component",
    });

    expect(file.getFullJsxTag().jsxTag).toEqual(
      `<Component title={<ChildA></ChildA>}></Component>`
    );
  });
  test("Should return jsx tag with correct componentlist parameter", () => {
    const file = new MainComponentFile({
      fullPath: "/index.ts",
      content: `export const Component=(props:{title:string})=>{
        return <div></div>
      }`,
      params: [
        {
          name: "children",
          param: {
            type: "componentList",
            value: [
              new MainComponentFile({
                params: [],
                extraFiles: [],
                componentName: "ChildA",
                fullPath: "/index.ts",
                content: `export const ChildA=()=><div></div>`,
              }),
              new MainComponentFile({
                params: [],
                extraFiles: [],
                componentName: "ChildB",
                fullPath: "/index.ts",
                content: `export const ChildB=()=><div></div>`,
              }),
            ],
          },
        },
      ],
      extraFiles: [],
      componentName: "Component",
    });

    expect(file.getFullJsxTag().jsxTag).toEqual(
      `<Component><ChildA></ChildA><ChildB></ChildB></Component>`
    );
  });
});
