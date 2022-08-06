import { shallowMount } from "@vue/test-utils";
import Fab from "@/modules/daybook/components/Fab.vue";

describe("FAB Unit Testing", () => {
  test("Should display the default icon", () => {
    const wrapper = shallowMount(Fab);
    const iTag = wrapper.find("i");
    expect(iTag.classes("fa-plus")).toBeTruthy();
  });
  test("Should display the default icon", () => {
    const wrapper = shallowMount(Fab, {
      props: {
        icon: "fa-circle",
      },
    });
    const iTag = wrapper.find("i");
    expect(iTag.classes("fa-circle")).toBeTruthy();
  });
  test("Should emmit the onClick event", () => {
    const wrapper = shallowMount(Fab);
    wrapper.find("button").trigger("click");
    expect(wrapper.emitted("on:click")).toHaveLength(1);
  });
});
