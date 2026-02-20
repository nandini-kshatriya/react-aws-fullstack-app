export const login = async (email, password) => {
  await new Promise(res => setTimeout(res, 500));

  if (email && password) {
    localStorage.setItem("user", JSON.stringify({ email }));
    return { email };
  }

  throw new Error("Invalid login");
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
