import { EmptyWrapperComponent } from "../component/emptyWrapper/emptyWrapper";
import { Component } from "../component/component";
import { SectionUI } from "./sectionUI";
import { MainContainerComponent } from "../component/mainContainer/mainContainer";

describe("Should build section UI", () => {
  test("Should build emptyComponent->child: mainContainer for section", () => {
    const sectionUI = new SectionUI({ name: "Hero" });
    const sectionComponent = sectionUI.getComponent();

    expect(sectionComponent).toBeInstanceOf(EmptyWrapperComponent);
    expect(sectionComponent.name).toEqual("HeroComponent");

    expect(sectionComponent.getParam<Component>("child")).toBeInstanceOf(
      MainContainerComponent
    );
  });
});
