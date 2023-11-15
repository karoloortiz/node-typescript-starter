import * as fs from "fs";
import { createStrapiComponent } from "../../utils/test/creationFunction/strapiProject/strapiComponent";
import { createStrapiProject } from "../../utils/test/creationFunction/strapiProject/strapiProject";
import { createStrapiType } from "../../utils/test/creationFunction/strapiProject/strapiType";
import { createStrapiTypeSchema } from "../../utils/test/creationFunction/strapiProject/strapiTypeSchema";
import { StrapiGenerator } from "./strapiGenerator";

test("Should generate one component schema file in the right folder for each strapi component", async () => {
  const userInfoComponent = createStrapiComponent({
    name: "user info",
    parentFolderName: "shared",
  });

  const userInfo2Component = createStrapiComponent({
    name: "user info2",
    parentFolderName: "shared",
  });

  const benefitsSectionComponent = createStrapiComponent({
    name: "benefit section",
    parentFolderName: "homepage",
  });

  const strapiProject = createStrapiProject({
    components: [
      userInfoComponent,
      userInfo2Component,
      benefitsSectionComponent,
    ],
  });

  await new StrapiGenerator(strapiProject).generate();

  expect(
    fs.existsSync(
      StrapiGenerator.basePath + "/src/components/shared/user-info.json"
    )
  ).toBeTruthy();
  expect(
    fs.existsSync(
      StrapiGenerator.basePath + "/src/components/shared/user-info2.json"
    )
  ).toBeTruthy();
  expect(
    fs.existsSync(
      StrapiGenerator.basePath + "/src/components/homepage/benefit-section.json"
    )
  ).toBeTruthy();
});

test("Should generate all files and folders related to a type for each strapi single and collection type", async () => {
  const homepageSchema = createStrapiTypeSchema({
    name: "homepage",
    kind: "singleType",
    collectionName: "homepages",
    displayName: "Homepage",
    attributes: {},
  });
  const homepageType = createStrapiType({
    name: "homepage",
    schema: homepageSchema,
  });

  const articleSchema = createStrapiTypeSchema({
    name: "article",
    kind: "collectionType",
    collectionName: "articles",
    displayName: "Article",
    attributes: {},
  });
  const articleType = createStrapiType({
    name: "article",
    schema: articleSchema,
  });

  const strapiProject = createStrapiProject({
    singleTypes: [homepageType],
    collectionTypes: [articleType],
  });

  await new StrapiGenerator(strapiProject).generate();

  expect(
    fs
      .readFileSync(
        StrapiGenerator.basePath + "/src/api/article/controllers/article.js"
      )
      .toString()
  ).toEqual(`'use strict';

  /**
   * article controller
   */
  
  const { createCoreController } = require('@strapi/strapi').factories;
  
  module.exports = createCoreController('api::article.article');`);

  expect(
    fs
      .readFileSync(
        StrapiGenerator.basePath + "/src/api/article/routes/article.js"
      )
      .toString()
  ).toEqual(`'use strict';

  /**
   * article router
   */
  
  const { createCoreRouter } = require('@strapi/strapi').factories;
  
  module.exports = createCoreRouter('api::article.article');`);

  expect(
    fs
      .readFileSync(
        StrapiGenerator.basePath + "/src/api/article/services/article.js"
      )
      .toString()
  ).toEqual(`'use strict';

  /**
   * article service
   */
  
  const { createCoreService } = require('@strapi/strapi').factories;
  
  module.exports = createCoreService('api::article.article');`);

  expect(
    fs.existsSync(
      StrapiGenerator.basePath +
        "/src/api/article/content-types/article/schema.json"
    )
  ).toBeTruthy();

  expect(
    fs
      .readFileSync(
        StrapiGenerator.basePath + "/src/api/homepage/controllers/homepage.js"
      )
      .toString()
  ).toEqual(`'use strict';

  /**
   * homepage controller
   */
  
  const { createCoreController } = require('@strapi/strapi').factories;
  
  module.exports = createCoreController('api::homepage.homepage');`);

  expect(
    fs
      .readFileSync(
        StrapiGenerator.basePath + "/src/api/homepage/routes/homepage.js"
      )
      .toString()
  ).toEqual(`'use strict';

  /**
   * homepage router
   */
  
  const { createCoreRouter } = require('@strapi/strapi').factories;
  
  module.exports = createCoreRouter('api::homepage.homepage');`);

  expect(
    fs
      .readFileSync(
        StrapiGenerator.basePath + "/src/api/homepage/services/homepage.js"
      )
      .toString()
  ).toEqual(`'use strict';

  /**
   * homepage service
   */
  
  const { createCoreService } = require('@strapi/strapi').factories;
  
  module.exports = createCoreService('api::homepage.homepage');`);

  expect(
    fs.existsSync(
      StrapiGenerator.basePath +
        "/src/api/homepage/content-types/homepage/schema.json"
    )
  ).toBeTruthy();
});
