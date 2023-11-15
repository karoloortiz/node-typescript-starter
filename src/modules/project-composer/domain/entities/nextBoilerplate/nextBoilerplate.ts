import { PackageFile } from "./../projectFile/packageFile";
import { AnyConstructor, createMixinFunction } from "../../shared/mixins";
import { FEProject } from "../feProject/feProject";
import { ProjectFile } from "../projectFile/projectFile";

export interface NextBoilerplateProps {}

export const nextBoilerplateMixin = createMixinFunction((Base) => {
  class NextBoilerplate extends (Base as unknown as AnyConstructor<FEProject>) {
    constructor(props: NextBoilerplateProps = {}, id?: string) {
      super(props);

      this.addFile(new PackageFile({ projectName: this.name }));

      this.addFile(
        new ProjectFile({
          fullPath: "/tsconfig.json",
          content: `
          {
            "compilerOptions": {
              "target": "es5",
              "lib": ["dom", "dom.iterable", "esnext"],
              "allowJs": true,
              "skipLibCheck": true,
              "strict": true,
              "forceConsistentCasingInFileNames": true,
              "noEmit": true,
              "esModuleInterop": true,
              "module": "esnext",
              "moduleResolution": "node",
              "resolveJsonModule": true,
              "isolatedModules": true,
              "jsx": "preserve",
              "incremental": true,
              "baseUrl": ".",
              "paths": {
                "@/*": ["./*"]
              }
            },
            "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
            "exclude": ["node_modules"]
          }
               
          `,
        })
      );

      this.addFile(
        new ProjectFile({
          fullPath: "/README.md",
          content: `## Getting Started`,
        })
      );

      this.addFile(
        new ProjectFile({
          fullPath: "/next-env.d.ts",
          content: `/// <reference types="next" />
          /// <reference types="next/image-types/global" />
          
          // NOTE: This file should not be edited
          // see https://nextjs.org/docs/basic-features/typescript for more information.
          `,
        })
      );

      this.addFile(
        new ProjectFile({
          fullPath: "/next.config.js",
          content: `/** @type {import('next').NextConfig} */
          const nextConfig = {
            reactStrictMode: true,
          }
          
          module.exports = nextConfig
          `,
        })
      );

      this.addFile(
        new ProjectFile({
          fullPath: "/pages/_app.tsx",
          content: `import "@/styles/globals.css";
          import type { AppProps } from "next/app";
          
          export default function App({ Component, pageProps }: AppProps) {
            return <Component {...pageProps} />;
          }
          `,
        })
      );

      this.addFile(
        new ProjectFile({
          fullPath: "/pages/_document.tsx",
          content: `import { Html, Head, Main, NextScript } from 'next/document'

          export default function Document() {
            return (
              <Html lang="en">
                <Head />
                <body>
                  <Main />
                  <NextScript />
                </body>
              </Html>
            )
          }
          `,
        })
      );

      this.addFile(
        new ProjectFile({
          fullPath: "/styles/globals.css",
          content: ``,
        })
      );
    }
  }
  return NextBoilerplate;
});
