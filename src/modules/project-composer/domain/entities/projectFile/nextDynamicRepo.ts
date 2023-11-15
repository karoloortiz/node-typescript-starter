import { NextRepo } from "./nextRepo";

const FILE_TEMPLATE = `
export class <@placeholder>Repo {
    async getPage(id: string): Promise<<@placeholder>RepoData> {
      const data: <@placeholder>RepoData = {};
      return data;
    }

    async getIds(): Promise<string[]> {
      const data = ["1"];
      return data;
    }
  }
  
  export interface <@placeholder>RepoData {}
  
`;

export interface NextStaticRepoProps {
  name: string;
}
export class NextDynamicRepo extends NextRepo {
  constructor(props: NextStaticRepoProps) {
    super({
      name: props.name,
      content: FILE_TEMPLATE,
    });
  }
}
