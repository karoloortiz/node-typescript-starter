import { FileContent } from "./fileContent";
import {
  createMixinFunction,
  AnyConstructor,
  Mixin,
} from "../../shared/mixins";
import {
  ArrowFunction,
  ImportDeclaration,
  InterfaceDeclaration,
  JsxElement,
  JsxOpeningElement,
  ObjectLiteralExpression,
  Project,
  SourceFile,
  SyntaxKind,
  TypeLiteralNode,
} from "ts-morph";
import { toPascalCase } from "../../../utils/textUtils";

interface FileContentMutatorProps {}

export const fileContentMutatorMixin = createMixinFunction((Base) => {
  class FileContentMutator extends (Base as unknown as AnyConstructor<FileContent>) {
    constructor(props: FileContentMutatorProps) {
      super(props);
    }

    public renamePropsInterfaceAndReferences(name: string): void {
      const sourceFile = this.getSourceFile();

      const interfaceDefinition = sourceFile
        .getInterfaces()
        .find((i) => i.getName().includes("Props"));

      const interfaceReferences = sourceFile
        .getDescendantsOfKind(SyntaxKind.TypeReference)
        .filter((t) => t.getText().includes("Props"));

      if (interfaceDefinition) {
        interfaceDefinition.rename(name);
      }
      if (interfaceReferences) {
        interfaceReferences.forEach((r) => r.replaceWithText(name));
      }

      this._sourceCode = sourceFile.getText();
    }

    public renameComponent(name: string): void {
      const sourceFile = this.getSourceFile();

      const componentVariable = sourceFile
        .getVariableDeclarations()
        .find((v) => v.getChildrenOfKind(SyntaxKind.ArrowFunction).length > 0);

      if (componentVariable) {
        componentVariable.rename(name);
      }

      this._sourceCode = sourceFile.getText();
    }

    public initializeVariable(name: string, value: string): void {
      const sourceFile = this.getSourceFile();
      sourceFile.getVariableDeclaration(name).setInitializer(value);

      this._sourceCode = sourceFile.getText();
    }

    public getImports(): ImportDeclaration[] {
      const sourceFile = this.getSourceFile();
      return sourceFile.getImportDeclarations();
    }

    public getNamedExports(): string[] {
      const sourceFile = this.getSourceFile();
      return Array.from(sourceFile.getExportedDeclarations().keys());
    }

    public getConstructorCall(...params: string[]): string {
      const sourceFile = this.getSourceFile();

      const classesDeclarations = sourceFile.getClasses();
      for (const classDeclaration of classesDeclarations) {
        if (classDeclaration.isExported) {
          return `new ${classDeclaration.getName()}(${params.join(",")})`;
        }
      }
    }

    public setImportPath(importStatement: string, newPath: string): void {
      const sourceFile = this.getSourceFile();

      const imports = sourceFile.getImportDeclarations();
      for (const i of imports) {
        if (i.getText() === importStatement) {
          i.setModuleSpecifier(newPath);
        }
      }

      this._sourceCode = sourceFile.getText();
    }

    public addImportStatement(namedImports: string[], path: string): void {
      const sourceFile = this.getSourceFile();

      sourceFile.addImportDeclaration({
        namedImports: namedImports,
        moduleSpecifier: path,
      });

      this._sourceCode = sourceFile.getText();
    }

    public addPropertyToInterface(
      interfaceName: string,
      property: { name: string; type: string }
    ) {
      const _sourceFile = this.getSourceFile();
      const _interfaceDeclaration = _sourceFile.getInterface(interfaceName);
      _interfaceDeclaration.addProperty(property);
      this._sourceCode = _sourceFile.getText();
    }

    public removeFieldFromInterface(interfaceName: string, field: string) {
      const _sourceFile = this.getSourceFile();
      const interfaceDef = _sourceFile.getInterface(interfaceName);
      if (interfaceDef) {
        const property = interfaceDef.getProperty(field);
        property.remove();
        this._sourceCode = _sourceFile.getText();
      }
    }

    public changeInterfaceFieldType(
      interfaceName: string,
      fieldName: string,
      fieldType: string
    ): void {
      const _sourceFile = this.getSourceFile();
      const _interfaceDeclaration = _sourceFile.getInterface(interfaceName);
      _interfaceDeclaration.getProperty(fieldName).remove();
      _interfaceDeclaration.addProperty({ name: fieldName, type: fieldType });

      this._sourceCode = _sourceFile.getText();
    }

    public addNamedImports(names: string[], path: string): void {
      const sourceFile = this.getSourceFile();
      sourceFile.getFirstChild;
      sourceFile.addImportDeclaration({
        namedImports: names,
        moduleSpecifier: path,
      });

      this._sourceCode = sourceFile.getText();
    }

    public addNamedImport(name: string, path: string): void {
      const sourceFile = this.getSourceFile();
      sourceFile.addImportDeclaration({
        namedImports: [name],
        moduleSpecifier: path,
      });

      this._sourceCode = sourceFile.getText();
    }

    public addDefaultImport(name: string, path: string): void {
      const sourceFile = this.getSourceFile();
      sourceFile.addImportDeclaration({
        defaultImport: toPascalCase(name),
        moduleSpecifier: path,
      });

      this._sourceCode = sourceFile.getText();
    }

    public setMethodVariableInitializer(
      className: string,
      methodName: string,
      varibleName: string,
      initializerText: string
    ): void {
      const sourceFile = this.getSourceFile();

      const methodDeclaration = sourceFile
        .getClass(className)
        .getMethod(methodName);

      methodDeclaration
        .getVariableDeclaration(varibleName)
        .setInitializer(initializerText);

      this._sourceCode = sourceFile.getText();
    }

    public setArrowFunctionReturn(
      variableName: string,
      returnObject: string
    ): void {
      const sourceFile = this.getSourceFile();

      const arrowFunction = this.getArrowFunction(sourceFile, variableName);

      arrowFunction
        .getDescendantsOfKind(SyntaxKind.ReturnStatement)[0]
        .replaceWithText(`return ${returnObject}`);

      this._sourceCode = sourceFile.getText();
    }

    public setArrowFunctionInnerVariableInitializer(
      arrowFunctionName: string,
      variableName: string,
      initializerText: string
    ): void {
      const sourceFile = this.getSourceFile();

      const arrowFunction = this.getArrowFunction(
        sourceFile,
        arrowFunctionName
      );

      const variable = arrowFunction.getVariableDeclaration(variableName);

      variable.setInitializer(initializerText);

      this._sourceCode = sourceFile.getText();
    }

    public setJsxAttributeValue(
      elementName: string,
      attrbitueName: string,
      attributeValue: string
    ): void {
      const sourceFile = this.getSourceFile();

      const jsxElement = this.getJsxOpeningElement(sourceFile, elementName);

      if (jsxElement.getAttribute(attrbitueName)) {
        jsxElement.getAttribute(attrbitueName).remove();
      }

      jsxElement.addAttribute({
        name: attrbitueName,
        expression: attributeValue,
        initializer: `{${attributeValue}}`,
      });

      this._sourceCode = sourceFile.getText();
    }

    public setJsxElementBody(elementName: string, body: string): void {
      const sourceFile = this.getSourceFile();

      const jsxElement = this.getJsxElement(sourceFile, elementName);

      jsxElement.setBodyTextInline(body);

      this._sourceCode = sourceFile.getText();
    }

    public replaceJsxExpression(expressionPropertyName, newValue) {
      const sourceFile = this.getSourceFile();

      for (const jsxExpression of sourceFile.getDescendantsOfKind(
        SyntaxKind.JsxExpression
      )) {
        const propertyAccessExpression = jsxExpression.getDescendantsOfKind(
          SyntaxKind.Identifier
        );
        for (const property of propertyAccessExpression) {
          if (property.getText() === expressionPropertyName) {
            const jsxExpression = property.getFirstAncestorByKind(
              SyntaxKind.JsxExpression
            );
            jsxExpression.replaceWithText(newValue);
            this._sourceCode = sourceFile.getText();
            return;
          }
        }
      }
    }

    public wrapDataItemWithState(
      expressionPropertyName,
      openingTag: (itemVariableName) => string,
      closingTag
    ) {
      const sourceFile = this.getSourceFile();

      for (const jsxExpression of sourceFile.getDescendantsOfKind(
        SyntaxKind.JsxExpression
      )) {
        const propertyAccessExpression = jsxExpression.getDescendantsOfKind(
          SyntaxKind.Identifier
        );
        for (const property of propertyAccessExpression) {
          if (property.getText() === expressionPropertyName) {
            const jsxExpression = property.getFirstAncestorByKind(
              SyntaxKind.JsxExpression
            );

            const arrowFunction = jsxExpression.getFirstDescendantByKind(
              SyntaxKind.ArrowFunction
            );

            const dataItemParamName = arrowFunction
              .getFirstDescendantByKind(SyntaxKind.Parameter)
              .getText();
            const arrowFunctionJsx = arrowFunction.getFirstDescendantByKind(
              SyntaxKind.JsxElement
            );

            const jsxBody = arrowFunctionJsx.getText();
            arrowFunctionJsx
              .getOpeningElement()
              .replaceWithText((writer) =>
                writer.write(openingTag(dataItemParamName))
              );
            arrowFunctionJsx
              .getClosingElement()
              .replaceWithText((writer) => writer.write(closingTag));

            arrowFunctionJsx.setBodyText(jsxBody);

            this._sourceCode = sourceFile.getText();
            return;
          }
        }
      }
    }

    private getSourceFile(): SourceFile {
      const project = new Project({
        useInMemoryFileSystem: true,
      });

      return project.createSourceFile(
        "__temp__." + this._fullPath.extension,
        this._sourceCode
      );
    }

    private getJsxOpeningElement(
      sourceFile: SourceFile,
      elementName: string
    ): JsxOpeningElement {
      const nameParts = elementName.split(".");

      for (const jsxElement of sourceFile.getDescendantsOfKind(
        SyntaxKind.JsxOpeningElement
      )) {
        const identifiers = jsxElement
          .getChildrenOfKind(SyntaxKind.PropertyAccessExpression)[0]
          .getChildrenOfKind(SyntaxKind.Identifier)
          .map((i) => i.getText());

        if (
          identifiers.length == nameParts.length &&
          nameParts.every((p) => identifiers.includes(p))
        ) {
          return jsxElement;
        }
      }

      return null;
    }

    private getJsxElement(
      sourceFile: SourceFile,
      elementName: string
    ): JsxElement {
      const nameParts = elementName.split(".");

      for (const jsxElement of sourceFile.getDescendantsOfKind(
        SyntaxKind.JsxElement
      )) {
        const openingElement = jsxElement.getChildrenOfKind(
          SyntaxKind.JsxOpeningElement
        )[0];

        let identifiers: string[] = [];
        if (
          openingElement.getChildrenOfKind(
            SyntaxKind.PropertyAccessExpression
          )[0] != null
        ) {
          identifiers = openingElement
            .getChildrenOfKind(SyntaxKind.PropertyAccessExpression)[0]
            .getChildrenOfKind(SyntaxKind.Identifier)
            .map((i) => i.getText());
        } else {
          identifiers = openingElement
            .getChildrenOfKind(SyntaxKind.Identifier)
            .map((i) => i.getText());
        }

        if (
          identifiers.length == nameParts.length &&
          nameParts.every((p) => identifiers.includes(p))
        ) {
          return jsxElement;
        }
      }

      return null;
    }

    private getReactComponentName() {
      const sourceFile = this.getSourceFile();
    }

    private getArrowFunction(
      sourceFile: SourceFile,
      arrowFunctionName: string
    ): ArrowFunction {
      return sourceFile
        .getVariableDeclaration(arrowFunctionName)
        .getDescendantsOfKind(SyntaxKind.ArrowFunction)[0];
    }
  }

  return FileContentMutator;
});

export type FileContentWithMutator = Mixin<
  typeof fileContentMutatorMixin<typeof FileContent>
>;
export const FileContentWithMutator = fileContentMutatorMixin(FileContent);
