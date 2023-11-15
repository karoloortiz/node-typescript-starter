import { EmptyWrapperComponent } from "../component/emptyWrapper/emptyWrapper";

import { UIElement } from "./uiElement";
import { MainContainerComponent } from "../component/mainContainer/mainContainer";

interface SectionUIProps {
  name: string;
}

export class SectionUI extends UIElement {
  constructor(props: SectionUIProps, id?: string) {
    // calcola design token da usare
    super(props, id);

    const component = new EmptyWrapperComponent({
      name: props.name,
      child: new MainContainerComponent({}),
    });

    this._component = component;
  }
}
