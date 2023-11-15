import { FileContentWithPlaceholder } from "./../fileContent/fileContentWithPlaceholder";
import { ProjectFile } from "./projectFile";
interface PackageFileProps {
  projectName: string;
}

const FILE_TEMPLATE = `{
    "name": "<@placeholder>",
    "version": "0.1.0",
    "private": true,
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint"
    },
    "dependencies": {
      "@next/font": "13.1.6",
      "@types/node": "18.11.19",
      "@types/react": "18.0.27",
      "@types/react-dom": "18.0.10",
      "eslint": "8.33.0",
      "eslint-config-next": "13.1.6",
      "next": "13.1.6",
      "react": "18.2.0",
      "react-dom": "18.2.0",
      "typescript": "4.9.5"
    }
  } `;

export class PackageFile extends ProjectFile {
  protected content: FileContentWithPlaceholder;

  constructor(props: PackageFileProps) {
    super({ content: FILE_TEMPLATE, fullPath: "package.json" });
    this.content = new FileContentWithPlaceholder({
      name: "package.json",
      sourceCode: FILE_TEMPLATE,
      placeholderValues: [props.projectName],
    });
  }
}
