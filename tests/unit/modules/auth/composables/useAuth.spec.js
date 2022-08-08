import useAuth from "@/modules/auth/composables/useAuth";

const mockStore = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  getters: { "auth/currentState": "authenticated", "auth/username": "Andrés" },
};

jest.mock("vuex", () => ({
  useStore: () => mockStore,
}));

beforeEach(() => jest.clearAllMocks());

describe("useAuth Unit Testing", () => {
  test("createUser successful", async () => {
    const { createUser } = useAuth();
    const newUser = { name: "Felipe", email: "felipe@gmail.com" };
    mockStore.dispatch.mockReturnValue({ ok: true });
    const res = await createUser(newUser);

    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/createUser", newUser);
    expect(res).toEqual({ ok: true });
  });
  test("createUser failed", async () => {
    const { createUser } = useAuth();
    const newUser = { name: "Felipe", email: "felipe@gmail.com" };
    mockStore.dispatch.mockReturnValue({ ok: false, message: "EMAIL_EXISTS" });
    const res = await createUser(newUser);

    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/createUser", newUser);
    expect(res).toEqual({ ok: false, message: "EMAIL_EXISTS" });
  });
  test("signInUser successful", async () => {
    const { signInUser } = useAuth();
    const signUser = { email: "felipe@gmail.com", password: "123456" };
    mockStore.dispatch.mockReturnValue({ ok: true });
    const res = await signInUser(signUser);

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "auth/signInUser",
      signUser
    );
    expect(res).toEqual({ ok: true });
  });
  test("signInUser failed", async () => {
    const { signInUser } = useAuth();
    const signUser = { email: "felipe@gmail.com", password: "123456" };
    mockStore.dispatch.mockReturnValue({
      ok: false,
      message: "EMAIL/PASSWORD do not exists",
    });
    const res = await signInUser(signUser);

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "auth/signInUser",
      signUser
    );
    expect(res).toEqual({ ok: false, message: "EMAIL/PASSWORD do not exists" });
  });
  test("logout", () => {
    const { logout } = useAuth();
    logout();
    expect(mockStore.commit).toHaveBeenCalledWith("auth/logout");
    expect(mockStore.commit).toHaveBeenCalledWith("journal/clearEntries");
  });
  test("computed properties", () => {
    const { authStatus, username } = useAuth();
    expect(authStatus.value).toBe("authenticated");
    expect(username.value).toBe("Andrés");
  });
});
