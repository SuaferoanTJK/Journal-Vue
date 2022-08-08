import { createStore } from "vuex";
import auth from "@/modules/auth/store";
import journal from "@/modules/daybook/store";
import { journalState } from "../../../mock-data/test-journal-state";
import { authState } from "../../../mock-data/test-auth-state";

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

describe("Auth Vuex Unit Testing", () => {
  // Initial State
  test("Initial state", () => {
    const store = createVuexStore(authState);
    const { status, user, idToken, refreshToken } = store.state.auth;
    expect(status).toBe("authenticating");
    expect(user).toBe(null);
    expect(idToken).toBe(null);
    expect(refreshToken).toBe(null);
  });

  // Mutations
  test("loginUser mutation", () => {
    const store = createVuexStore(authState);
    const payload = {
      user: { name: "Andrés", email: "andres@gmail.com" },
      idToken: "ABC123",
      refreshToken: "XYZ123",
    };
    store.commit("auth/loginUser", payload);
    const { status, user, idToken, refreshToken } = store.state.auth;
    expect(status).toBe("authenticated");
    expect(user).toEqual({ name: "Andrés", email: "andres@gmail.com" });
    expect(idToken).toBe("ABC123");
    expect(refreshToken).toBe("XYZ123");
  });
  test("logout mutation", () => {
    localStorage.setItem("idToken", "ABC123");
    localStorage.setItem("refreshToken", "XYZ123");
    const store = createVuexStore({
      status: "authenticated",
      user: { name: "Andrés", email: "andres@gmail.com" },
      idToken: "ABC123",
      refreshToken: "XYZ123",
    });
    store.commit("auth/logout");
    const { status, user, idToken, refreshToken } = store.state.auth;
    expect(status).toBe("notAuthenticated");
    expect(user).toBe(null);
    expect(idToken).toBe(null);
    expect(refreshToken).toBe(null);
    expect(localStorage.getItem("idToken")).toBe(null);
    expect(localStorage.getItem("refreshToken")).toBe(null);
  });

  // Getters
  test("should return authState and username", () => {
    const store = createVuexStore({
      status: "authenticated",
      user: { name: "Andrés", email: "andres@gmail.com" },
      idToken: "ABC123",
      refreshToken: "XYZ123",
    });
    expect(store.getters["auth/currentState"]).toBe("authenticated");
    expect(store.getters["auth/username"]).toBe("Andrés");
  });

  // Actions
  test("createUser fails as the user already exists ", async () => {
    const store = createVuexStore({
      status: "notAuthenticated",
      user: null,
      idToken: null,
      refreshToken: null,
    });
    const newUser = {
      name: "Test",
      email: "test@test.com",
      password: "123456",
    };
    const res = await store.dispatch("auth/createUser", newUser);
    expect(res).toEqual({ ok: false, message: "EMAIL_EXISTS" });
    const { status, user, idToken, refreshToken } = store.state.auth;
    expect(status).toBe("notAuthenticated");
    expect(user).toBe(null);
    expect(idToken).toBe(null);
    expect(refreshToken).toBe(null);
  });
  test("checkAuth returns positive", async () => {
    const store = createVuexStore({
      status: "notAuthenticated",
      user: null,
      idToken: null,
      refreshToken: null,
    });
    const signedInUser = {
      name: "Test",
      email: "test@test.com",
      password: "123456",
    };

    await store.dispatch("auth/signInUser", signedInUser);
    const { idToken } = store.state.auth;
    store.commit("auth/logout");

    localStorage.setItem("idToken", idToken);
    const res = await store.dispatch("auth/checkAuth");
    expect(res).toEqual({ ok: true });
  });
  test("checkAuth returns negative", async () => {
    const store = createVuexStore(authState);
    localStorage.removeItem("idToken");
    const res = await store.dispatch("auth/checkAuth");
    expect(res).toEqual({ ok: false, message: "No token" });
  });
});
