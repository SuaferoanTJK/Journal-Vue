import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";

import Navbar from "@/modules/daybook/components/Navbar.vue";
import auth from "@/modules/auth/store";
import journal from "@/modules/daybook/store";
import { journalState } from "../../../mock-data/test-journal-state";

const createVuexStore = (authInitState, journalInitState = journalState) =>
  createStore({
    modules: {
      auth: {
        ...auth,
        state: { ...authInitState },
      },
      journal: {
        ...journal,
        state: { ...journalInitState },
      },
    },
  });

describe("Navbar Unit Testing", () => {
  const store = createVuexStore({
    status: "authenticated",
    user: { name: "Andrés Felipe", email: "andres@gmail.com" },
    idToken: "ABC123",
    refreshToken: "XYZ123",
  });

  test("should display component", () => {
    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
