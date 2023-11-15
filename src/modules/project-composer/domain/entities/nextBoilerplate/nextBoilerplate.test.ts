import { FEProject } from "../feProject/feProject";
import { FileContent } from "../fileContent/fileContent";
import { nextBoilerplateMixin } from "./nextBoilerplate";

const NextBoilerplate = nextBoilerplateMixin(FEProject);
describe("Should create boilerplate files for next js", () => {
  test("should create package.json file", () => {
    const boilerplate = new NextBoilerplate({ name: "website project" });

    expect(
      boilerplate.getFile("/package.json").hasSourceCode(`{
        "name": "website-project",
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
    }`)
    ).toBeTruthy();
  });

  test("should create tsconfig.json file", () => {
    const boilerplate = new NextBoilerplate({ name: "website project" });

    expect(
      boilerplate.getFile("/tsconfig.json").hasSourceCode(`{
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
          },
        },
        "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
        "exclude": ["node_modules"]
      }        
      `)
    ).toBeTruthy();
  });

  test("should create README.md file", () => {
    const boilerplate = new NextBoilerplate({ name: "website project" });

    expect(
      boilerplate.getFile("/README.md").hasSourceCode(`## Getting Started`)
    ).toBeTruthy();
  });

  test("should create next-env.d.ts file", () => {
    const boilerplate = new NextBoilerplate({ name: "website project" });

    expect(
      boilerplate.getFile("/next-env.d.ts")
        .hasSourceCode(`/// <reference types="next" />
      /// <reference types="next/image-types/global" />
      
      // NOTE: This file should not be edited
      // see https://nextjs.org/docs/basic-features/typescript for more information.
      `)
    ).toBeTruthy();
  });

  test("should create next.config.js file", () => {
    const boilerplate = new NextBoilerplate({ name: "website project" });

    expect(
      boilerplate.getFile("/next.config.js")
        .hasSourceCode(`/** @type {import('next').NextConfig} */
      const nextConfig = {
        reactStrictMode: true,
      }
      
      module.exports = nextConfig
      `)
    ).toBeTruthy();
  });

  test("should create pages/_app.tsx file", () => {
    const boilerplate = new NextBoilerplate({ name: "website project" });

    expect(
      boilerplate.getFile("/pages/_app.tsx")
        .hasSourceCode(`import "@/styles/globals.css";
      import type { AppProps } from "next/app";
      
      export default function App({ Component, pageProps }: AppProps) {
        return <Component {...pageProps} />;
      }
      `)
    ).toBeTruthy();
  });

  test("should create pages/_document.tsx file", () => {
    const boilerplate = new NextBoilerplate({ name: "website project" });

    expect(
      boilerplate.getFile("/pages/_document.tsx")
        .hasSourceCode(`import { Html, Head, Main, NextScript } from 'next/document'

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
      `)
    ).toBeTruthy();
  });

  test("should create styles/globals.css file", () => {
    const boilerplate = new NextBoilerplate({ name: "website project" });

    expect(
      boilerplate.getFile("/styles/globals.css").hasSourceCode(``)
    ).toBeTruthy();
  });
});
