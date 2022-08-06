import { shallowMount } from "@vue/test-utils";
import Home from "@/views/HomeView";

describe("Home View Unit Testing", () => {
  test("Should render the component", () => {
    const wrapper = shallowMount(Home);
    expect(wrapper.html()).toMatchSnapshot();
  });
  test("Click in button should redirect to noEntry", () => {
    const mockRouter = {
      push: jest.fn(),
    };
    const wrapper = shallowMount(Home, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });
    wrapper.find("button").trigger("click");
    expect(mockRouter.push).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "noEntry" });
  });
});
