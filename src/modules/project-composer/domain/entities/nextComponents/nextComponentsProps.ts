export interface NextComponentsProps {
  librarySharedFiles: { pathname: string; sourceCode: string }[];
  pageComponents: ComponentProps[];
  libraryComponentFiles: {
    id: string;
    files: { pathname: string; sourceCode: string }[];
  }[];
}

export type ComponentProps =
  | BaseComponentProps
  | (BaseComponentProps & ContextualComponentProps);

export type ContextualComponentProps = BaseComponentProps & Contextual;

export interface BaseComponentProps {
  id: string;
  files: { pathname: string; sourceCode: string }[];
  parameters: {
    name: string;
    value:
      | DataParameter
      | ComponentParameter
      | ComponentListParameter
      | RawValueParameter;
  }[];
}

interface Contextual {
  contextualName: string;
}

// Parameters
interface DataParameter {
  type: "data";
  value: { informationId: string; dataModelId: string; isList: boolean };
}

interface ComponentParameter {
  type: "component";
  value: ComponentProps;
}
interface ComponentListParameter {
  type: "componentList";
  value: ComponentProps[];
}

interface RawValueParameter {
  type: "rawValue";
  value: string;
}

export function isComponentParameter(props: any): props is ComponentParameter {
  const fields = Object.keys(props);

  return fields.includes("type") && props.type === "component";
}

export function isComponentListParameter(
  props: any
): props is ComponentListParameter {
  const fields = Object.keys(props);

  return fields.includes("type") && props.type === "componentList";
}
export function isContextualComponent(props: any): props is Contextual {
  const fields = Object.keys(props);

  return fields.includes("contextualName") && props.contextualName;
}

export function isDataParameter(props: any): props is DataParameter {
  const fields = Object.keys(props);

  return fields.includes("type") && props.type === "data";
}
