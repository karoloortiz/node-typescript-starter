import { FileContent } from "./fileContent";
import {
  createMixinFunction,
  AnyConstructor,
  Mixin,
} from "../../shared/mixins";
import { FileContentError } from "./fileContentError";

interface FileContentWithPlaceholderProps {
  placeholderValues: string[];
}

export const fileContentWithPlaceholderMixin = createMixinFunction((Base) => {
  class FileContentWithPlaceholder extends (Base as unknown as AnyConstructor<FileContent>) {
    constructor(props: FileContentWithPlaceholderProps) {
      super(props);

      if (this.numberOfPlaceholders() != props.placeholderValues.length) {
        throw new FileContentError.IncorrectPlaceholderValues();
      }

      let index = 0;
      this._sourceCode = this.props.sourceCode.replaceAll(
        "<@placeholder>",
        (foundString) => {
          const value = props.placeholderValues[index];
          index++;
          return value;
        }
      );
    }

    private numberOfPlaceholders(): number {
      return this._sourceCode.split("<@placeholder>").length - 1;
    }
  }

  return FileContentWithPlaceholder;
});

export type FileContentWithPlaceholder = Mixin<
  typeof fileContentWithPlaceholderMixin<typeof FileContent>
>;
export const FileContentWithPlaceholder =
  fileContentWithPlaceholderMixin(FileContent);
