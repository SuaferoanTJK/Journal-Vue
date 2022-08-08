import { shallowMount } from "@vue/test-utils";
import Entry from "@/modules/daybook/components/Entry.vue";
import { journalState } from "../../../mock-data/test-journal-state";

describe("Entry Unit Testing", () => {
  const mockRouter = {
    push: jest.fn(),
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(Entry, {
      props: {
        entry: journalState.entries[0],
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });
  });

  test("Should match with snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
  test("Should redirect when it is clicked", () => {
    const entryContainer = wrapper.find(".entryContainer");
    entryContainer.trigger("click");
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "entry",
      params: { id: journalState.entries[0].id },
    });
  });
  test("Computed properties test", () => {
    expect(wrapper.vm.date).toBe("Thursday, August 04, 2022");
    expect(wrapper.vm.shortText).toBe("Hi world V2");
  });
});
