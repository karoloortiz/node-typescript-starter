import { PageUIProps } from "./pageUIProps";
import { Size } from "./../component/mixins/withSizeParams";
import { Component } from "../component/component";
import { EmptyWrapperComponent } from "../component/emptyWrapper/emptyWrapper";
import { VerticalLayoutComponent } from "../component/verticalLayout/verticalLayout";
import { PageUI } from "./pageUI";

describe("Should build page UI", () => {
  test("Should build emptyWrapperComponent->child:VerticalLayoutComponent for a page", () => {
    const pageUI = new PageUI(createProps({ name: "Home" }));
    const component = pageUI.getComponent();

    expect(component).toBeInstanceOf(EmptyWrapperComponent);
    expect(component.name).toStrictEqual("HomeComponent");
    expect(component.getParam<Size>("minHeight")).toEqual<Size>("screenHeight");
    expect(component.getParam<Size>("width")).toEqual<Size>("full");

    const verticalComponent = component.getParam<Component>("child");
    expect(verticalComponent).toBeInstanceOf(VerticalLayoutComponent);
    expect(verticalComponent.getParam("gap")).toEqual("zero");
    expect(verticalComponent.getParam("width")).toEqual("full");
  });

  test("Should pass section components to vertical layout", () => {
    const pageUI = new PageUI(
      createProps({
        name: "Home",
        sections: [
          { name: "Hero", groups: [] },
          { name: "Section 1", groups: [] },
        ],
      })
    );
    const component = pageUI.getComponent();
    const verticalComponent = component.getParam<Component>("child");

    expect(verticalComponent.getParam("children")).toHaveLength(2);
  });
});

function createProps({
  name,
  sections,
}: {
  name: string;
  sections?: PageUIProps["sections"];
}): PageUIProps {
  return {
    name: name,
    sections: sections ?? [],
  };
}
