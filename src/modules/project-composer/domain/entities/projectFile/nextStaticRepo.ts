import { toPascalCase } from "../../../utils/textUtils";
import { NextRepo } from "./nextRepo";

const FILE_TEMPLATE = `
export class <@placeholder>Repo {
    async getPage(): Promise<<@placeholder>RepoData> {
      const data: <@placeholder>RepoData = {};
      return data;
    }
  }
  
  export interface <@placeholder>RepoData {}
  
`;

export interface NextStaticRepoProps {
  name: string;
}
export class NextStaticRepo extends NextRepo {
  constructor(props: NextStaticRepoProps) {
    super({
      name: props.name,
      content: FILE_TEMPLATE,
    });
  }
}
