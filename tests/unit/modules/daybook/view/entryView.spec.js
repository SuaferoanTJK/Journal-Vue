import { createStore } from "vuex";
import { shallowMount } from "@vue/test-utils";
import Swal from "sweetalert2";
import EntryView from "@/modules/daybook/views/EntryView.vue";
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

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
}));

describe("EntryView Unit Testing", () => {
  const store = createVuexStore(journalState);
  store.dispatch = jest.fn();

  const mockRouter = {
    push: jest.fn(),
  };

  let wrapper;
  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryView, {
      props: {
        id: "-N8ehquIXWnUzhMQqxVe",
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
  });

  test("Should redirect because the ID doesn't exist", () => {
    shallowMount(EntryView, {
      props: {
        id: "ID that doesn't exist",
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "noEntry" });
  });
  test("Should display entry", () => {
    expect(wrapper.html()).toMatchSnapshot();
    expect(mockRouter.push).not.toHaveBeenCalled();
  });
  test("Should delete the entry and exit", async () => {
    Swal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true }));
    await wrapper.find(".deleteBtn").trigger("click");
    expect(Swal.fire).toHaveBeenCalledWith({
      title: "Are you sure?",
      text: "Once deleted, it can't be recovered",
      showDenyButton: true,
      confirmButtonText: "Yes, I'm sure",
    });
  });
});
