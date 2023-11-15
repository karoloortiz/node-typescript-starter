import { FEProject } from "../feProject/feProject";
import {
  AnyConstructor,
  createMixinFunction,
  Mixin,
} from "../../shared/mixins";
import { ProjectFile } from "../projectFile/projectFile";
import { toCamelCase } from "../../../utils/textUtils";
import { NextRepo } from "../projectFile/nextRepo";
import { FakeData } from "../../valueObjects/fakeData/fakeData";
import {
  DataValue,
  Field,
  isFieldGroup,
  isListable,
  isSingleField,
  NextReposProps,
  Page,
} from "./nextReposProps";
import { NextStaticRepo } from "../projectFile/nextStaticRepo";
import { NextDynamicRepo } from "../projectFile/nextDynamicRepo";

export const nextReposMixin = createMixinFunction((Base) => {
  class NextRepos extends (Base as unknown as AnyConstructor<FEProject>) {
    private _repos: NextRepo[] = [];

    constructor(props: NextReposProps, id?: string) {
      super(props);
      this.createPageRepos(props.pages);
      this.createRepoDataInterfaces(props);
      this.createGetPageReturns(props);
    }
    //override
    protected addRepoFile(file: NextRepo): void {
      super.addFile(file);
      this._repos.push(file);
    }

    private createPageRepos(pages: Page[]): void {
      for (const page of pages) {
        if (page.isDynamic) {
          const repoFile = new NextDynamicRepo(page);

          this.addRepoFile(repoFile);
        } else {
          const repoFile = new NextStaticRepo(page);

          this.addRepoFile(repoFile);
        }
      }
    }

    private createRepoDataInterfaces(props: NextReposProps) {
      for (const page of props.pages) {
        const repoFile = this.getRepoForPage(page.name);

        for (const section of page.sections) {
          let repoDataInterface: string = "{\n";
          for (const field of section.fields) {
            const fieldDefinition = this.getRepoDataInterfaceFromField(field);
            repoDataInterface =
              repoDataInterface +
              toCamelCase(field.name) +
              ": " +
              fieldDefinition +
              ";\n";
          }
          repoDataInterface = repoDataInterface + "}";

          repoFile.addPropertyToRepoDataInterface({
            name: toCamelCase(section.name),
            type: repoDataInterface,
          });
        }
      }
    }

    private getRepoDataInterfaceFromField(field: Field): string {
      let fieldDefinition: string;

      if (isSingleField(field)) {
        if (field.dataStructure.length == 1) {
          fieldDefinition = field.dataStructure[0].type;
        }
        if (field.dataStructure.length > 1) {
          fieldDefinition = "{\n";
          for (const datafield of field.dataStructure) {
            fieldDefinition =
              fieldDefinition +
              toCamelCase(datafield.name) +
              ": " +
              datafield.type +
              ";\n";
          }
          fieldDefinition = fieldDefinition + "}";
        }
      }

      if (isFieldGroup(field)) {
        fieldDefinition = "{\n";
        for (const fieldOfGroup of field.fields) {
          fieldDefinition =
            fieldDefinition +
            toCamelCase(fieldOfGroup.name) +
            ": " +
            this.getRepoDataInterfaceFromField(fieldOfGroup) +
            `;\n`;
        }
        fieldDefinition = fieldDefinition + "}";
      }

      if (field.isList) {
        fieldDefinition = fieldDefinition + "[]";
      }

      return fieldDefinition;
    }

    private createGetPageReturns(props: NextReposProps) {
      for (const page of props.pages) {
        const repoFile = this.getRepoForPage(page.name);

        let fakeRepoData: string = "{\n";
        for (const section of page.sections) {
          fakeRepoData = fakeRepoData + toCamelCase(section.name) + ": {\n";
          for (const field of section.fields) {
            const fieldValue = this.getValueOfDataValueByField(
              page.dataValues,
              field
            );

            fakeRepoData =
              fakeRepoData +
              toCamelCase(field.name) +
              ": " +
              fieldValue +
              ",\n";
          }
          fakeRepoData = fakeRepoData + "},\n";
        }
        fakeRepoData = fakeRepoData + "}";

        repoFile.addFakeRepoData(fakeRepoData);
      }
    }

    private getValueOfDataValueByField(
      dataValues: DataValue[],
      field: Field
    ): string {
      if (isListable(field)) {
        let value = "[\n";

        const dataValue = this.getDataValueById(dataValues, field.dataModelId);
        if (dataValue) {
          for (const dV of dataValue.value as DataValue[][]) {
            value = value + "{\n";

            for (const f of field.fields) {
              value =
                value +
                toCamelCase(f.name) +
                ": " +
                this.getValueOfDataValueByField(dV, f) +
                ",";
            }
            value = value + "},\n";
          }
        }

        value = value + "]\n";

        return value;
      }

      if (isSingleField(field)) {
        if (field.dataStructure.length == 1) {
          return this.getValueOfDataValue(dataValues, field.dataStructure[0]);
        }
        if (field.dataStructure.length > 1) {
          let value = "{\n";
          for (const ds of field.dataStructure) {
            value =
              value +
              toCamelCase(ds.name) +
              ": " +
              this.getValueOfDataValue(dataValues, ds) +
              ",";
          }
          value = value + "}\n";

          return value;
        }
      }

      if (isFieldGroup(field)) {
        let value = "{\n";
        for (const f of field.fields) {
          value =
            value +
            toCamelCase(f.name) +
            ": " +
            this.getValueOfDataValueByField(dataValues, f) +
            ",";
        }
        value = value + "}\n";

        return value;
      }
    }

    private getDataValueById(
      dataValues: DataValue[],
      dataModelId: string
    ): DataValue {
      for (const dataValue of dataValues) {
        if (dataValue.dataModelId == dataModelId) {
          return dataValue;
        }
        if (Array.isArray(dataValue.value)) {
          for (const subDataValue of dataValue.value) {
            this.getDataValueById(subDataValue, dataModelId);
          }
        }
      }
    }

    private getValueOfDataValue(
      dataValues: DataValue[],
      dataStructure: {
        name: string;
        type: string;
        dataModelId: string;
      }
    ): string {
      for (const dataValue of dataValues) {
        if (dataValue.dataModelId == dataStructure.dataModelId) {
          if (dataStructure.type == "string") {
            return (("`" + dataValue.value) as string) + "`";
          }
          if (dataStructure.type == "number") {
            return dataValue.value as string;
          }
        }
      }
    }

    protected getRepoForPage(pageName: string): NextRepo {
      return this._repos.find(
        (r) => r.getNameWithoutExtension() === toCamelCase(pageName) + "Repo"
      );
    }
  }

  return NextRepos;
});

export const NextRepos = nextReposMixin(FEProject);

export type NextRepos = Mixin<typeof nextReposMixin<typeof FEProject>>;
