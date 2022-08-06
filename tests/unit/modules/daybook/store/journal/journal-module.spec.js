import { createStore } from "vuex";
import journal from "@/modules/daybook/store/journal";
import { journalState } from "./mock-data/test-journal-state";

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

describe("Journal Vuex Unit Testing", () => {
  let store;
  beforeEach(() => {
    store = createVuexStore(journalState);
  });
  // Basics
  test("Initial State should be this one", () => {
    const { isLoading, entries } = store.state.journal;
    expect(isLoading).toBeFalsy();
    expect(entries).toEqual(journalState.entries);
  });

  // Mutations
  test("setEntries mutation", () => {
    const store = createVuexStore({ isLoading: true, entries: [] });
    store.commit("journal/setEntries", journalState.entries);
    expect(store.state.journal.entries.length).toBe(2);
    expect(store.state.journal.isLoading).toBeFalsy();
  });
  test("updateEntry mutation", () => {
    const updateEntry = {
      id: "-N8ehquIXWnUzhMQqxVe",
      date: 1659707778673,
      text: "Update test",
    };
    store.commit("journal/updateEntry", updateEntry);
    const storeEntries = store.state.journal.entries;
    expect(storeEntries.length).toBe(2);
    expect(storeEntries.find((entry) => entry.id === updateEntry.id)).toEqual(
      updateEntry
    );
  });
  test("addEntry and deleteEntry mutations", () => {
    const addEntry = {
      id: "-Bn9ehquTXgnUzhMQqxVe",
      date: 1759707628673,
      text: "Add entry",
    };
    let storeEntries;

    store.commit("journal/addEntry", addEntry);
    storeEntries = store.state.journal.entries;
    expect(storeEntries.length).toBe(3);
    expect(storeEntries.find((entry) => entry.id === addEntry.id)).toEqual(
      addEntry
    );

    store.commit("journal/deleteEntry", addEntry.id);
    storeEntries = store.state.journal.entries;
    expect(storeEntries.length).toBe(2);
  });

  // Getters
  test("getEntriesByTerm getter", () => {
    const getter = "journal/getEntriesByTerm";
    expect(store.getters[getter]("").length).toBe(2);
    expect(store.getters[getter]("Learning").length).toBe(1);
  });
  test("getEntryByID getter", () => {
    const getter = "journal/getEntryByID";
    const [entry1] = journalState.entries;
    expect(store.getters[getter]("-N8ehquIXWnUzhMQqxVe")).toEqual(entry1);
  });

  // Actions
  test("loadEntries action", async () => {
    const store = createVuexStore({ isLoading: true, entries: [] });
    await store.dispatch("journal/loadEntries");
    const storeEntries = store.state.journal.entries;
    expect(storeEntries.length).toBe(3);
  });
});
