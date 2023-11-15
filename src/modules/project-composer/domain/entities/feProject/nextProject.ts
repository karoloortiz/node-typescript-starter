import { nextReposMixin } from "./../nextRepos/nextRepos";
import { nextBoilerplateMixin } from "../nextBoilerplate/nextBoilerplate";
import { nextComponentsMixin } from "../nextComponents/nextComponents";
import { nextDesignTokensMixin } from "../nextDesignTokens/nextDesignTokens";
import { nextPagesMixin } from "../nextPages/nextPages";
import { FEProject } from "./feProject";
import { Mixin } from "../../shared/mixins";

export const NextProject = nextPagesMixin(
  nextComponentsMixin(
    nextReposMixin(nextDesignTokensMixin(nextBoilerplateMixin(FEProject)))
  )
);

const Temp = nextComponentsMixin(
  nextReposMixin(nextDesignTokensMixin(nextBoilerplateMixin(FEProject)))
);

export type NextProject = Mixin<typeof nextPagesMixin<typeof Temp>>;
