import { FEProject } from "../feProject/feProject";
import {
  AnyConstructor,
  createMixinFunction,
  Mixin,
} from "../../shared/mixins";
import { ProjectFile } from "../projectFile/projectFile";
import { NextDynamicPage } from "../projectFile/nextDynamicPage";
import { NextStaticPage } from "../projectFile/nextStaticPage";
import { NextRepos } from "../nextRepos/nextRepos";
import { toPascalCase } from "../../../utils/textUtils";
import { nextComponentsMixin } from "../nextComponents/nextComponents";
import { nextDesignTokensMixin } from "../nextDesignTokens/nextDesignTokens";
import { NextStateFile } from "../projectFile/nextStateFile/nextStateFile";

export interface NextPagesProps {
  pages: {
    name: string;
    isDynamic: boolean;
    isIndex: boolean;
  }[];
}

type ComponentsAndRepos = Mixin<typeof nextComponentsMixin<typeof NextRepos>>;
const ComponentsAndRepos = nextComponentsMixin(NextRepos);
type DTAndComponentsAndRepos = Mixin<
  typeof nextDesignTokensMixin<typeof ComponentsAndRepos>
>;

export const nextPagesMixin = createMixinFunction((Base) => {
  class NextPages extends (Base as unknown as AnyConstructor<DTAndComponentsAndRepos>) {
    constructor(props: NextPagesProps, id?: string) {
      super(props);
      this.initialize(props);
    }

    private initialize(props: NextPagesProps) {
      const stateFile = this.createOrGetNextPageStateFile();

      for (const page of props.pages) {
        const nextPage = this.createNextPage(page);

        const repoFile = this.getRepoForPage(page.name);

        nextPage.addPageStateImport(
          toPascalCase(stateFile.getNameWithoutExtension()),
          stateFile.getRelativePathWithRespectTo(nextPage)
        );

        nextPage.addRepoImports(
          repoFile.className,
          repoFile.dataInterfaceName,
          repoFile.getRelativePathWithRespectTo(nextPage)
        );

        nextPage.changeRepoDataType(repoFile.dataInterfaceName);

        nextPage.changeGetStaticPropsReturn(repoFile.className);

        nextPage.initializeAndInjectPageState(
          toPascalCase(stateFile.getNameWithoutExtension())
        );

        const designTokensFile = this.getDesignTokensFile();

        nextPage.importAndInjectDesignTokens(
          `${designTokensFile.componentName}`,
          designTokensFile.getRelativePathWithRespectTo(nextPage)
        );

        const pageComponentFile = this.getComponentForPage(page.name);

        nextPage.importAndInjectPageComponent(
          `${pageComponentFile.componentName}`,
          `${pageComponentFile.componentName}Component`,
          pageComponentFile.getRelativePathWithRespectTo(nextPage),
          `${designTokensFile.componentName}`
        );

        if (nextPage instanceof NextDynamicPage) {
          nextPage.changeGetStaticPathFunction(repoFile.className);
        }

        this.addFile(nextPage);
      }
    }

    private createOrGetNextPageStateFile(): ProjectFile {
      let stateFile = this._files.find((f) => f instanceof NextStateFile);

      if (!stateFile) {
        stateFile = new NextStateFile({});
      }

      return stateFile;
    }

    private createNextPage(page: {
      name: string;
      isDynamic: boolean;
      isIndex: boolean;
    }): NextStaticPage | NextDynamicPage {
      if (page.isDynamic) {
        return new NextDynamicPage({
          name: page.name,
        });
      }

      if (!page.isDynamic) {
        return new NextStaticPage({
          name: page.name,
          isIndex: page.isIndex,
        });
      }
    }
  }

  return NextPages;
});

export type NextPages = Mixin<typeof nextPagesMixin<typeof NextRepos>>;
export const NextPages = nextPagesMixin(
  nextDesignTokensMixin(ComponentsAndRepos)
);
