import { NextStateFile } from "./nextStateFile";
describe("Should create next state file", () => {
  test("Should create next state file with template content", () => {
    const file = new NextStateFile({});
    expect(
      file.hasSourceCode(`    export class NextPageState {
        private data;
      
        constructor(data: any) {
          this.data = data;
        }
      
        public get(id: string): any {
          return this.data[id];
        }
      }`)
    ).toBeTruthy();

    expect(file.getFullPath()).toEqual("/lib/nextPageState.ts");
  });

  test("Should get constructor call", () => {
    const file = new NextStateFile({});

    const constructorCall = file.getConstructorCall("{}");
    expect(constructorCall).toEqual("new NextPageState({})");
  });

  test("Should get getDataAccessFunctionCall call", () => {
    const file = new NextStateFile({});

    const functionCall = file.getDataAccessFunctionCall(
      "state",
      `"title.name"`
    );
    expect(functionCall).toEqual(`state.get("title.name")`);
  });
});
