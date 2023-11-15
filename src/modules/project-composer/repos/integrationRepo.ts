import { ComponentProps } from "../domain/entities/nextComponents/nextComponentsProps";
import { Page } from "../domain/entities/nextRepos/nextReposProps";

export interface IntegratedData {
  name: string;
  librarySharedFiles: { pathname: string; sourceCode: string }[];
  pageComponents: ComponentProps[];
  libraryComponentFiles: {
    id: string;
    files: { pathname: string; sourceCode: string }[];
  }[];
  pages: (Page & { isIndex: boolean })[];
  tokens: string;
}

export interface IIntegrationRepo {
  get(digitalProductId: string): Promise<IntegratedData>;
}
