import { SectionUI } from "./sectionUI";
import { EmptyWrapperComponent } from "../component/emptyWrapper/emptyWrapper";
import { VerticalLayoutComponent } from "../component/verticalLayout/verticalLayout";
import { UIElement } from "./uiElement";
import { PageUIProps } from "./pageUIProps";

export class PageUI extends UIElement {
  constructor(props: PageUIProps, id?: string) {
    // calcola design token da usare
    super(props, id);
    const vertical = new VerticalLayoutComponent({
      gap: "zero",
      width: "full",
      children: props.sections.map((s) =>
        new SectionUI({ name: s.name }).getComponent()
      ),
    });

    const wrapper = new EmptyWrapperComponent({
      name: props.name,
      child: vertical,
      minHeight: "screenHeight",
      width: "full",
    });

    this._component = wrapper;
  }
}
