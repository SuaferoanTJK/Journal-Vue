import { shallowMount } from "@vue/test-utils";
import About from "@/views/AboutView";

describe("About View Unit Testing", () => {
  test("Should render the component", () => {
    const wrapper = shallowMount(About);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
