// TODO: Pascal Case e Camel Case devono supportare che il testo può arrivare in diversi formati
import { camelCase, pascalCase } from "change-case";
export function toPascalCase(text: string): string {
  return pascalCase(text, {});
}

export function toCamelCase(text: string): string {
  return camelCase(text, {});
}
