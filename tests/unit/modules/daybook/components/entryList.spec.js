import { createStore } from "vuex";
import { shallowMount } from "@vue/test-utils";
import EntryList from "@/modules/daybook/components/EntryList.vue";
import journal from "@/modules/daybook/store";
import { journalState } from "../../../mock-data/test-journal-state";

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

describe("EntryList Unit Testing", () => {
  const store = createVuexStore(journalState);
  const mockRouter = {
    push: jest.fn(),
  };

  let wrapper;
  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryList, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
  });

  test("Should call getEntriesByTerm and show 2 entries", () => {
    expect(wrapper.findAll("entry-stub").length).toBe(2);
  });
  test("Should call getEntriesByTerm and filter", async () => {
    const input = wrapper.find("input");
    await input.setValue("Learning");
    expect(wrapper.findAll("entry-stub").length).toBe(1);
  });
  test("newEntry Button must redirect to /new", () => {
    wrapper.find("button").trigger("click");
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "entry",
      params: { id: "new" },
    });
  });
});
