import { toCamelCase, toPascalCase } from "../../../utils/textUtils";
import { Mixin } from "../../shared/mixins";
import { FileContent } from "../fileContent/fileContent";
import { fileContentMutatorMixin } from "../fileContent/fileContentMutator";
import {
  FileContentWithPlaceholder,
  fileContentWithPlaceholderMixin,
} from "../fileContent/fileContentWithPlaceholder";
import { ProjectFile } from "./projectFile";

export type RepoContent = Mixin<
  typeof fileContentMutatorMixin<typeof FileContentWithPlaceholder>
>;
export const RepoContent = fileContentMutatorMixin(
  fileContentWithPlaceholderMixin(FileContent)
);

export interface NextRepoProps {
  name: string;
  content: string;
}
export class NextRepo extends ProjectFile {
  protected content: RepoContent;

  constructor(props: NextRepoProps) {
    const pascalCaseName = toPascalCase(props.name);
    const fileName = `${toCamelCase(props.name)}Repo.ts`;

    super({
      fullPath: `/lib/repos/${fileName}`,
      content: props.content,
    });

    this.content = new RepoContent({
      name: fileName,
      sourceCode: props.content,
      placeholderValues: [
        pascalCaseName,
        pascalCaseName,
        pascalCaseName,
        pascalCaseName,
      ],
    });
  }

  public get className(): string {
    return toPascalCase(this.getNameWithoutExtension());
  }

  public get dataInterfaceName(): string {
    return toPascalCase(this.getNameWithoutExtension() + "Data");
  }

  public addPropertyToRepoDataInterface(property: {
    name: string;
    type: string;
  }) {
    this.content.addPropertyToInterface(
      toPascalCase(this.getNameWithoutExtension()) + "Data",
      property
    );
  }

  public addFakeRepoData(fakeRepoData: string) {
    this.content.setMethodVariableInitializer(
      toPascalCase(this.getNameWithoutExtension()),
      "getPage",
      "data",
      fakeRepoData
    );
  }
}
