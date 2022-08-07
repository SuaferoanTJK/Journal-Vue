import authApi from "@/api/authApi";

export const createUser = async ({ commit }, user) => {
  const { name, email, password } = user;
  try {
    const { data } = await authApi.post("accounts:signUp", {
      email,
      password,
      returnSecureToken: true,
    });
    const { idToken, refreshToken } = data;
    await authApi.post("accounts:update", {
      idToken,
      displayName: name,
    });
    delete user.password;
    commit("loginUser", { user, idToken, refreshToken });
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.error.message };
  }
};

export const signInUser = async ({ commit }, user) => {
  const { email, password } = user;
  try {
    const { data } = await authApi.post("accounts:signInWithPassword", {
      email,
      password,
      returnSecureToken: true,
    });
    const { idToken, refreshToken, displayName } = data;

    commit("loginUser", {
      user: { email, name: displayName },
      idToken,
      refreshToken,
    });
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response.data.error.message };
  }
};

export const checkAuth = async ({ commit }) => {
  const idToken = localStorage.getItem("idToken");
  const refreshToken = localStorage.getItem("refreshToken");

  if (!idToken) {
    commit("logout");
    return { ok: false, message: "No token" };
  }
  try {
    const { data } = await authApi.post("accounts:lookup", { idToken });
    const { displayName, email } = data.users[0];
    commit("loginUser", {
      user: {
        name: displayName,
        email,
      },
      idToken,
      refreshToken,
    });
    return { ok: true };
  } catch (error) {
    commit("logout");
    return { ok: false, message: error.response.data.error.message };
  }
};
